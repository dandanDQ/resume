<template>
  <div class="editor">
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
  props: {
    current: {
      type: Object,
      default() {
        return {}
      }
    },
    saveFlag: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    current: {
      handler(newVal, oldVal) {
        // auto save data before change
        if(oldVal) {
          // save data to old object
          this.getValue(oldVal)
        }
        if(newVal) {
          // load object to the editorList
          this.setValue(newVal)
        }
      }
    },
    saveFlag: {
      handler() {
        this.getValue(this.current)
      }
    }
  },
  mounted() {
    this.editor = monaco.editor.create(document.getElementById('container'), {
      value: this.current.yaml,
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
      toRaw(this.editor).layout()
    })
  },
  methods: {
    getValue(obj) {
      if(obj) {
        // not a empty object
        try {
          obj.yaml = toRaw(this.editor).getValue()
          obj.preview = yaml.load(obj.yaml) ?? {}
        } catch(err) {
          console.log(err)
          obj.preview = {}
        }
        
      }
    },
    setValue(obj) {
      toRaw(this.editor).setValue(obj.yaml)
    }
  }
}
</script>
<style lang="scss">
  .editor {
    border-radius: 4px;
    height: 1000px;
    .btn {
      border: 1px solid rgb(137, 137, 238);
      border-radius: 4px;
      height: 20px;
      width: 40px;
      cursor: pointer;
    }
    #container {
      width: 100%;
      height: 100%;
    }
  }
</style>