import { defineConfig } from 'vitepress'
import VueJsx from '@vitejs/plugin-vue-jsx'
import { demoblockPlugin, demoblockVitePlugin } from 'vitepress-theme-demoblock'
import { nav } from './config/nav'
import { sidebar } from './config/sidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'JW-UI组件库',
  titleTemplate: ':title - 自定义组件',
  description: '基于vue3开发的ui组件库',
  cleanUrls: true, // 访问路径,去掉.html扩展名
  // 国际化
  locales: {
    root: {
      label: 'English',
      lang: 'en'
    },
    fr: {
      label: '中文',
      lang: 'zh'
    }
  },
  head: [['link', { rel: 'icon', href: '/favicon.png' }]],

  themeConfig: {
    logo: '../../favicon.ico',
    // https://vitepress.dev/reference/default-theme-config
    nav,
    sidebar,
    socialLinks: [{ icon: 'github', link: 'https://github.com/zjwmmx/mmx-ui' }]
  },
  markdown: {
    config: (md) => {
      md.use(demoblockPlugin)
    }
  },
  vite: {
    plugins: [VueJsx(), demoblockVitePlugin()]
  }
})
