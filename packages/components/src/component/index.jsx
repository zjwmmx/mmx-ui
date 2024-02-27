import {defineComponent} from 'vue'
import './styles.scss'

import {hallo} from './hooks'

const MyComponent = defineComponent({
  name: 'MyComponent',
  setup: () => {
    hallo()
    return () => {
      return (
        <div class='wrap'>自定义组件2</div>
      )
    }
  }
})

export default MyComponent