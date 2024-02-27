import customTimerPicker from './custom-timer-picker/index.jsx'
import component from './component/index.jsx'
import customComponent from './custom-component/index.jsx'
import TimeSchedule from './time-schedule/index.jsx'

export const components = {
  customTimerPicker,
  component,
  customComponent,
  TimeSchedule
}

const plugin = {
  install(app) {
    Object.values(components).forEach((item) => {
      console.log(item)
      app.component(item.name, item)
    })
  }
}

export default plugin