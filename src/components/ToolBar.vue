<template>
  <div class="tool-bar">
    
    <div 
      class="ui-button" 
      v-for="editor in editorList" 
      :key="editor" 
      :class="{ 'highlight': current === editor }"
      @click="changeEditorList(editor)"> 
      <img src="../assets/paper.svg"/>
    </div>
    <div class="ui-button" @click="changeEditorList('add')">
      <img src="../assets/add.svg"/>
    </div>
    <div class="ui-button" @click="changeEditorList('next')">
      <img src="../assets/icon_next.svg"/>
    </div>
    <div class="ui-button" @click="changeEditorList('delete')">
      <img src="../assets/delete.svg"/>
    </div>
    <div class="ui-button" @click="getEditorValue">
      <img src="../assets/icon_resume.svg"/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ToolBar',
  methods: {
    changeEditorList(editor) {
      this.$emit('change-editor-list', editor)
    },
    getEditorValue() {
      this.$emit('get-editor-value')
    }
  },
  props: {
    editorList: {
      type: Object,
      default() {
        return []
      }
    },
    current: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>
<style scoped lang="scss">
.tool-bar {
  margin-bottom: 10px;
  .highlight {
    border: #ffdd40 1px solid;
  }
}
</style>