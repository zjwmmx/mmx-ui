/**
 * 时间段组件
 */
import './style.scss'
import { computed, defineComponent, ref, watch } from 'vue'
import { isEmpty } from 'lodash-es'
import { Button, Col, Row } from 'ant-design-vue'
import dayjs from 'dayjs'

const SELECT_STATUS = {
  selected: '1',
  unselected: '0',
}

const FORMAT_MAP = {
  HHmm: 'HH:mm',
  HH: 'HH'
}

const daysOfWeek = [
  '星期一',
  '星期二',
  '星期三',
  '星期四',
  '星期五',
  '星期六',
  '星期日',
]

const TimeSchedule = defineComponent({
  name: 'TimeSchedule',
  props: {
    type: {
      type: Number,
      default: 48,
    },
    value: {
      type: Array,
      default: () => [],
    },
    format: {
      type: String,
    },
    disabled: {
      type: Boolean,
    },
  },
  emits: ['change', 'update:value'],
  setup: (props, ctx) => {
    const data = ref(initData())

    const selecting = ref(false)
    const selected = ref(false)
    const points = ref([])

    const rate = computed(() => 24 / +props.type)
    const hoursOfDay = computed(() => generateHoursArray())

    function initData() {
      return Array.from({ length: 7 }, () =>
        SELECT_STATUS.unselected.repeat(+props.type),
      )
    }

    function getCurrentStatus(dayIndex, hourIndex) {
      return data.value[dayIndex].charAt(hourIndex) === SELECT_STATUS.selected
    }

    function generateHoursArray() {
      const startHour = dayjs().startOf('day')
      const hours = []

      for (let i = 0; i < +props.type; i++) {
        const hour = startHour.add(i * rate.value, 'hour')
        hours.push(hour.format(props.format))
      }

      return hours
    }

    function handleMousedown(pointY, pointX) {
      if (props.disabled) {
        return        
      }
      points.value = [pointY, pointX]
      selecting.value = true
      selected.value = getCurrentStatus(pointY, pointX)

      updateData(pointY, pointX)
      document.addEventListener('mouseup', handleMouseUp)
    }

    function handleMouseover(pointY, pointX) {
      if (selecting.value) {
        updateData(pointY, pointX)
      }
    }

    function updateData(pointY, pointX) {
      const [curPointY, curPointX] = points.value

      const dayMinIndex = Math.min(curPointY, pointY)
      const dayMaxIndex = Math.max(curPointY, pointY)
      const hourMinIndex = Math.min(curPointX, pointX)
      const hourMaxIndex = Math.max(curPointX, pointX)

      for (let i = dayMinIndex; i <= dayMaxIndex; i++) {
        const rowData = data.value[i].split('')
        const text = selected.value
          ? SELECT_STATUS.unselected
          : SELECT_STATUS.selected

        for (let j = hourMinIndex; j <= hourMaxIndex; j++) {
          rowData[j] = text
        }

        data.value[i] = rowData.join('')
      }
    }

    function handleMouseUp() {
      const result = format()

      points.value = null
      selecting.value = false
      
      ctx.emit('update:value', result)
      ctx.emit('change', result)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    // 格式化format 为单位的时间段数组 [['11:00-12:00', ...]]
    function formatHHMM() {
      const result = []
      const format = props.format

      for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
        const rowData = data.value[dayIndex]

        if (isEmpty(result[dayIndex])) {
          result[dayIndex] = []
        }

        hoursOfDay.value.forEach((hour, hourIndex) => {
          const status = rowData.charAt(hourIndex) === SELECT_STATUS.selected
          if (status) {
            const startHour = hour
            const endHour = hoursOfDay.value[hourIndex + 1] || '24:00'
            const formattedStart = dayjs(startHour, format).format(format)
            const formattedEnd = dayjs(endHour, format).format(format)

            result[dayIndex].push(`${formattedStart}-${formattedEnd}`)
          }
        })
      }
      return result
    }

    // 将format的数据转换为默认格式
    function formatData(value) {
      const result = Array.from({ length: 7 }, () =>
        '0'.repeat(hoursOfDay.value.length),
      )

      for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
        const dayData = value[dayIndex] || []

        for (const timeRange of dayData) {
          const [start, end] = timeRange.split('-')
          const startHourIndex = hoursOfDay.value.findIndex((hour) => hour === start)

          if (startHourIndex !== -1) {
            result[dayIndex] =
              result[dayIndex].substring(0, startHourIndex) +
              '1' +
              result[dayIndex].substring(startHourIndex + 1)
          }
        }
      }

      return result
    }

    function format() {
      if (props.format) {
        return formatHHMM()
      }
      // 默认格式
      return data.value
    }

    function clear() {
      data.value = initData()
    }

    watch(() => props.format, (newVal) => {
      data.value = formatData(props.value)
    })

    watch(
      () => props.value,
      (newVal) => {
        if (isEmpty(newVal)) {
          data.value = initData()
          return
        }
        if (!props.format) {
          data.value = newVal
          return
        }
        data.value = formatData(newVal)
      },
      {
        immediate: true,
      },
    )

    return () => {
      return (
        <div class="sf-time-schedule">
          <Row justify="end" class="sf-time-schedule-header">
            <Col>
              <div class="select-color">
                <div></div>
                已选
              </div>
            </Col>
            <Col>
              <div class="unselect-color">
                <div></div>
                可选
              </div>
            </Col>
          </Row>
          <table>
            <thead>
              <tr>
                <th rowspan="8" class="head-title">
                  星期/时间
                </th>
                <th colspan={+props.type / 2}>00:00 - 12:00</th>
                <th colspan={+props.type / 2}>
                  12:00 - 24:00
                  <Button type="link" onClick={clear}>
                    清空
                  </Button>
                </th>
              </tr>
              <tr class="head-hours">
                {hoursOfDay.value.map((hour, index) => {
                  const num = +props.type > 24 ? props.type / 24 : 1
                  if (index % num === 0) {
                    return <th colspan={num}>{index * rate.value}</th>
                  }
                })}
              </tr>
            </thead>
            <tbody>
              {daysOfWeek.map((day, dayIndex) => (
                <tr>
                  <th>{day}</th>
                  {hoursOfDay.value.map((hour, hourIndex) => {
                    return (
                      <td
                        class={{
                          selected: getCurrentStatus(dayIndex, hourIndex),
                          disabled: props.disabled
                        }}
                        style={{ width: `calc(100% / ${+props.type})` }}
                        onMousedown={() => handleMousedown(dayIndex, hourIndex)}
                        onMouseover={() => handleMouseover(dayIndex, hourIndex)}
                      ></td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }
  },
})

export default TimeSchedule
