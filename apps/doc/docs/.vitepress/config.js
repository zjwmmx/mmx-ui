import VueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vitepress'
import { demoblockPlugin, demoblockVitePlugin } from 'vitepress-theme-demoblock'
import { nav } from './config/nav'
import { sidebar } from './config/sidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'zjwmmx个人博客',
  titleTemplate: ':title - 文档库',
  description: '基于vitepress开发的文档库',
  cleanUrls: true, // 访问路径,去掉.html扩展名
  head: [['link', { rel: 'icon', href: '/favicon.png' }]],

  themeConfig: {
    nav,
    sidebar,
    activeHeaderLinks: true,
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
