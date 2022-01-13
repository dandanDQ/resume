<template>
  <div class="editor">
    {{ yaml }}
    <div @click="handleClick" class="ui-button">生成</div>
    <div id="container"></div>
  </div>
</template>
<script>
import * as monaco from 'monaco-editor'
import { toRaw } from 'vue'
import yaml from 'js-yaml';

export default {
  name: 'Editor',
  data() {
    return  {
      editor: null,
      value: '',
      yaml: null
    }
  },
  mounted() {
    this.editor = monaco.editor.create(document.getElementById('container'), {
      value: 
`项目: iLabel

队列:
- 拉黑解脱队列: 1266
- 私信队列: 1344`,
      	language: 'yaml',
        lineNumbers: 'on',
        roundedSelection: false,
        scrollBeyondLastLine: false,
        readOnly: false,
        theme: 'vs-dark',
        formatOnPaste: true,
        automaticLayout: true,
        wordWrap: 'on',
    });
    window.addEventListener('resize', () => {
      console.log('触发resize')
      toRaw(this.editor).layout()
    })
  },
  methods: {
    handleClick() {
      this.value = toRaw(this.editor).getValue()
      this.yaml = yaml.load(this.value)
    },

  }
}
</script>
<style lang="scss">
  .editor {
    border-radius: 4px;
    .btn {
      border: 1px solid rgb(137, 137, 238);
      border-radius: 4px;
      height: 20px;
      width: 40px;
      cursor: pointer;
    }
    #container {
      width: 50vw;
      height: 600px;
    }
  }
</style>