import { defineAsyncComponent } from 'vue'

// 导出组件列表，并注册异步组件
const files = import.meta.glob("/src/components/templates/*.vue")
const comList = []
const components = {}

Object.keys(files).map((file) => {
  const comName = file.slice(26, -4)
  comList.push(comName)
  components[comName] = defineAsyncComponent({
    loader: files[file]
  })
})

export { comList, components } 