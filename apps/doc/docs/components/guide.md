# 指南首页

## 安装

> 注意，mmxzjw 仅支持 Vue3。是基于 naive-ui 二次开发的组件库。

- **使用组件**

```bash
npm install @mmxzjw/component @mmxzjw/base @mmxzjw/core
```

- **注册**

如果使用 Vue 默认的模板语法，需要注册组件后方可使用，有如下两种方式注册组件：

1. 全局引入

```js
import { createApp } from 'vue'
import App from './App.jsx'
import '@mmxzjw/component/dist/index.css'
import Component from '@mmxzjw/component'

const store = createPinia()
createApp(App).mount('#app')
```

2. 局部引入

```vue
<template>
  <TimeSchedule>Add</TimeSchedule>
</template>
<script setup>
import { TimeSchedule } from '@mmxzjw/component'
</script>
```
