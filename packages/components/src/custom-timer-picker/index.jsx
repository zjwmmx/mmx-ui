import {defineComponent} from 'vue'

const CustomTimerPicker = defineComponent({
  name: 'CustomTimerPicker',
  setup: () => {
    return () => {
      return (
        <div>第一个组件</div>
      )
    }
  }
})

export default CustomTimerPicker