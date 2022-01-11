<template>
  <div class="editor" style="height: 400px">
    <div id="container" style="height: 100%"></div>
  </div>
</template>
<script>
import * as monaco from 'monaco-editor'
export default {
  name: 'Editor',
  mounted() {
    monaco.editor.create(document.getElementById('container'), {
      value: "function hello() {\n\talert('Hello world!');\n}",
      language: 'javascript'
    });
  }
}
</script>