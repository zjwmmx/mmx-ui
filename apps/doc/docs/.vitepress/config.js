import { defineConfig } from 'vitepress'
import VueJsx from '@vitejs/plugin-vue-jsx'

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
      label: 'French',
      lang: 'fr', // optional, will be added  as `lang` attribute on `html` tag
      link: '/fr/guide' // default /fr/ -- shows on navbar translations menu, can be external

      // other locale specific properties...
    }
  },

  themeConfig: {
    head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '文档', link: '/' },
      { text: '组件', link: '/markdown-examples' },
      {
        text: '语言',
        items: [
          { text: 'en', link: '/markdown-examples' },
          { text: '中文', link: '/markdown-examples' }
        ]
      },
      { text: '指导', link: '/components/' }
    ],

    sidebar: {
      'markdown-examples': [
        {
          text: 'Examples',
          items: [
            { text: 'Markdown Examples', link: '/markdown-examples' },
            { text: 'Runtime API Examples', link: '/api-examples' }
          ]
        }
      ],
      components: [
        {
          text: '指导',
          items: [
            { text: '时间段选择器', link: '/components/time-schedule' },
            { text: '指导2', link: '/components/guide-two' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
  vite: {
    plugins: [VueJsx()]
    // resolve: {
    //   alias: {
    //     styles: path.resolve(__dirname, '../../../../styles'),
    //   },
    // },
    // css: {
    //   preprocessorOptions: {
    //     scss: {
    //       additionalData: `
    //       @use "sass:math";
    //       @import "styles/include/index.scss";`,
    //     },
    //   },
    // },
  }
})
