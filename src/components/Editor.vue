<template>
  <div class="editor">
    <div id="container" style="height: 100%"></div>
  </div>
</template>
<script>
import * as monaco from 'monaco-editor'
export default {
  name: 'Editor',
  mounted() {
    monaco.editor.create(document.getElementById('container'), {
      value: 
      `姓名: 沈丹琼
城市: 苏州`,
      	language: 'yaml',
        lineNumbers: 'on',
        roundedSelection: false,
        scrollBeyondLastLine: false,
        readOnly: false,
        theme: 'vs-dark'
    });
  }
}
</script>
<style lang="scss">
  .editor {
    height: 96vh;
    border-radius: 4px;
  }
</style>