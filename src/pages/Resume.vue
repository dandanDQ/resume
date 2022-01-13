<template>
  <article class="resume">
    <section>
      <title />
      <tool-bar 
        @change-editor-list="changeEditorList"
        @get-editor-value="getEditorValue"
        :editorList="editorList"
        :current="current"/>
      <editor :current="current" :saveFlag="saveFlag"/>
    </section>
    <section>
      <preview :current="current"/>
    </section>
  </article>
</template>
<script>
import Editor from '../components/Editor.vue'
import Preview from '../components/Preview.vue'
import Title from '../components/Title.vue'
import ToolBar from '../components/ToolBar.vue'
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
      saveFlag: true
    }
  },
  created() { 
    const initVal = JSON.stringify([{ yaml: '预设1', preview: {}}, { yaml: '预设2', preview: {}} ])
    const editorString = window.localStorage.getItem('editorList') ?? initVal
    this.editorList = JSON.parse(editorString)
    window.addEventListener('beforeunload', (e) => {
      window.localStorage.setItem('editorList', JSON.stringify(this.editorList))
    })

    this.current = this.editorList[0]
  },
  mounted() {
  
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
          this.editorList.push({ yaml: '', preview: {}})
          this.current = this.editorList[this.editorList.length - 1]
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
    getEditorValue() {
      this.saveFlag = !this.saveFlag
    }
  }
}
</script>
<style scoped lang="scss">

article.resume {
  border: 1px solid grey;
  border-radius: 4px;
  box-sizing: border-box;
  display: grid;
  margin: 0;
  padding: 0;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
}
</style>