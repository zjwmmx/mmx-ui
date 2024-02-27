# 指导2

- 标注

<div>11</div>

<!-- 链接跳转 -->
[跳转链接](../index)

::: code-group

```js [config.js]
/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  // ...aaaa
}

export default config
```

```ts [config.ts]
import type { UserConfig } from 'vitepress'

const config: UserConfig = {
  // ...ssss
}

export default config
```

:::

{{ 1 + 1 }}


---
hello: world
---

<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

## Markdown Content

The count is: {{ count }}

<button :class="$style.button" @click="count++">Increment</button>

<style module>
.button {
  color: red;
  font-weight: bold;
}
</style>


![An image](/image-inside-public.png)
<CustomTimerPicker />