import DefaultTheme from "vitepress/theme";
import Antd, { ConfigProvider } from 'ant-design-vue'
import components from "@app/component";
import "@app/component/dist/index.css";
// import './index.scss'
console.log(components)

export default {
  ...DefaultTheme,
  // Layout: () => {
  //   return (
  //     <ConfigProvider locale={zh} dropdownMatchSelectWidth={300}>
  //       <DefaultTheme.Layout></DefaultTheme.Layout>
  //     </ConfigProvider>
  //   )
  // },
  enhanceApp: async ({ app, router, siteData, isServer }) => {
    // app is the Vue 3 app instance from `createApp()`. router is VitePress'
    // custom router. `siteData`` is a `ref`` of current site-level metadata.
    // import("@app/component").then((module) => {
    //   console.log(module)
    //     app.use(module);
    // });
    // app.component('MyGlobalComponent', components)
    app.use(Antd).use(components)
  },
};