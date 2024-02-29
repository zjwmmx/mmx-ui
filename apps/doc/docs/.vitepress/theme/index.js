import DefaultTheme from 'vitepress/theme'
import Antd from 'ant-design-vue'
import naive from 'naive-ui'
import components from '@mmxzjw/component'
import '@mmxzjw/component/dist/index.css'
import 'vitepress-theme-demoblock/dist/theme/styles/index.css'
import { useComponents } from './useComponent'
import './index.scss'

export default {
  ...DefaultTheme,
  enhanceApp: async (ctx) => {
    const { app } = ctx

    DefaultTheme.enhanceApp(ctx)
    useComponents(app)
    app.use(Antd).use(naive).use(components)
  }
}
