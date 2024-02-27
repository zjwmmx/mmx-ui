import { ref, onMounted, onUpdated, nextTick } from 'vue'

/**
 * 
 * @param {element} elementRef 绑定dom实例
 * @returns 
 */
export const useElementOffset = (elementRef) => {
  const top = ref(0)

  const updateTop = () => {
    const element = elementRef.value
    if (element) {
      const el = element?.$el ?? element
      const top = el?.getBoundingClientRect?.()?.top
      top.value = top || el?.offsetTop
    }
  }

  onMounted(async() => {
    await nextTick()
    updateTop()
  })

  onUpdated(async() => {
    await nextTick()
    updateTop()
  })

  return { top }
}