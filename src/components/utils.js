import { defineAsyncComponent } from 'vue'

// 导出组件列表，并注册异步组件
const files = import.meta.globEager("/src/components/templates/*.vue")
const comList = []
const components = {}
for(const file in files) {
  const comName = file.slice(26, -4)
  comList.push(comName)
  components[comName] = defineAsyncComponent(() => import(file))
}

export { comList, components } 