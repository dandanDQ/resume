<template>
  <article class="resume">
    <section class="tool-section">
      <title />
      <tool-bar 
        @change-editor-list="changeEditorList"
        @get-editor-value="saveFlag = !saveFlag"
        @export-preview="exportFlag = !exportFlag"
        @change-preview="previewFlag = !previewFlag"
        :editorList="editorList"
        :current="current"/>
      <editor :current="current" :saveFlag="saveFlag"/>
    </section>
    <section class="preview-section">
      <preview :current="current" :exportFlag="exportFlag" :previewFlag="previewFlag"/>
    </section>
  </article>
</template>
<script>
import Editor from '@/components/Editor.vue'
import Preview from '@/components/Preview.vue'
import Title from '@/components/Title.vue'
import ToolBar from '@/components/ToolBar.vue'

const defaulVal = `name: 填名字

infos: 
  - xxx: xxx
  - xxx: xxx

contact:
  phone: 填电话
  email: 填邮箱
  wechat: 填微信
  github: 填github

skills:
- name: JavaScript
  level: 75
- name: HTML5
  level: 75
- name: CSS3
  level: 80
- name: Vue 2.x
  level: 75
- name: ReactNative
  level: 50
- name: Webpack
  level: 65

CARD-xx经历（识别开头是CARD-的）:
- name: 大标题
  time: 时间时间时间
  desc:
   - 描述1: xxx
   - 描述2: xxx
- name: 大标题
  time: 时间时间时间
  desc:
   - 描述1: xxx
   - 描述2: 描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2述2描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2述2描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2
   - 说明: 只有英文key是固定的

CARD-xx经历2（可以随便添加）:
- name: 大标题
  time: 时间时间时间
  desc:
   - 描述1: xxx
   - 描述2: xxx
- name: 大标题
  time: 时间时间时间
  desc:
   - 描述1: 描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1
   - 描述2: xxx
   - 说明: 只有英文key是固定的

CARD-xx经历3（可以随便添加）:
- name: 大标题
  time: 时间时间时间
  desc:
   - 描述1: 描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1
   - 描述2: xxx
- name: 大标题
  time: 时间时间时间
  desc:
   - 描述1: xxx
   - 描述2: xxx
   - 说明: 只有英文key是固定的`

export default {
  name: 'Resume',
  components: {
    Editor,
    Preview,
    Title,
    ToolBar
  },
  data() {
    return {
      editorList: [{ yaml: '预设1', preview: {}}, { yaml: '预设2', preview: {}} ],
      current: null,
      capacity: 6,
      saveFlag: true,
      exportFlag: true,
      previewFlag: true
    }
  },
  created() { 
    const initVal = JSON.stringify([{ yaml: defaulVal, preview: {}}, { yaml: defaulVal, preview: {}} ])
    const editorString = window.localStorage.getItem('editorList') ?? initVal
    this.editorList = JSON.parse(editorString)
    window.addEventListener('beforeunload', (e) => {
      window.localStorage.setItem('editorList', JSON.stringify(this.editorList))
    })

    this.current = this.editorList[0]
  },
  methods: {
    changeEditorList(editor) {
      switch(editor) {
        case 'next' : {
          if(this.editorList.length <= 1)  break;
          const idx = (this.editorList.indexOf(this.current) + 1) % this.editorList.length
          this.current = this.editorList[idx]
          break;
        }
        case 'add' : {
          if(this.editorList.length >= this.capacity) break;
          this.editorList.push({ yaml: defaulVal, preview: {}})
          this.current = this.editorList[this.editorList.length - 1]
          this.saveFlag = !this.saveFlag // 触发生成预览
          break;
        }
        case 'delete' : {
          if(this.editorList.length <= 1)  break;
          const delIdx = this.editorList.indexOf(this.current)
          this.editorList.splice(delIdx, 1)
          const idx = (delIdx + this.editorList.length) % this.editorList.length
          this.current = this.editorList[idx]
          break;
        }
        default: {
          this.current = editor
        }
      }
    },
  }
}
</script>
<style lang="scss">
article.resume {
  border: 1px solid grey;
  border-radius: 4px;
  box-sizing: border-box;
  display: grid;
  margin: 10px auto;
  padding: 10px;
  grid-template-columns: minmax(300px, calc(95vw - 210mm)) 210mm;
  grid-gap: 10px;
  width: 95vw;
  min-width: calc(300px + 220mm);
}
@media print {
  body {
    width: 210mm;
    min-width: 210mm;
    height: 297mm;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: white;
    -webkit-print-color-adjust:exact;
    -webkit-filter: opacity(1);
  }
  article.resume {
    background-color: white;
    width: 210mm;
    min-width: 210mm;
    height: 297mm;
    border: none;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  .tool-section {
    display: none;
  }
  .preview-section {
    width: 210mm;
    min-width: 210mm;
    height: 297mm;
    box-shadow: none;
  }
}
</style>