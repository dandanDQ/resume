<template>
  <div class="tool-bar">
    <div
      v-for="editor in editorList"
      :key="editor"
      class="ui-button"
      :class="{ highlight: current === editor }"
      @click="changeEditorList(editor)"
    >
      <img src="../assets/paper.svg" />
    </div>
    <div class="ui-button" @click="changeEditorList('add')">
      <img src="../assets/add.svg" />
    </div>
    <!-- <div class="ui-button" @click="changeEditorList('next')">
      <img src="../assets/icon_next.svg" />
    </div> -->
    <div class="ui-button" @click="changeEditorList('delete')">
      <img src="../assets/delete.svg" />
    </div>
    <div class="ui-button save" @click="getEditorValue">
      <img src="../assets/生成.svg" />
    </div>
    <div class="ui-button export" @click="exportPreview">
      <img src="../assets/pdf_export.svg" />
    </div>
    <div class="ui-button change-preview" @click="changePreview">
      <img src="../assets/页面样式.svg" />
    </div>

    <div class="ui-button change-color" @click="changeColor">
      <img src="../assets/调色2.svg" />
      <input id="change-color" type="color" style="display: none" />
    </div>
    <div class="ui-button" ><a href="https://github.com/dandanDQ/resume" target="_blank" style="line-height: 10px">
      <img src="../assets/github2.svg" />
    </a></div>
    
    
  </div>
</template>
<script>
export default {
  name: 'ToolBar',
  props: {
    editorList: {
      type: Array,
      default() {
        return [];
      },
    },
    current: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  emits: [
    'change-editor-list',
    'get-editor-value',
    'export-preview',
    'change-preview',
  ],
  mounted() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.getEditorValue();
      }
    });
    document.querySelector('#change-color').addEventListener('change', (e) => {
      console.log(e?.target?.value, '新的颜色值');
    });
  },
  methods: {
    changeEditorList(editor) {
      this.$emit('change-editor-list', editor);
    },
    getEditorValue() {
      this.$emit('get-editor-value');
    },
    exportPreview() {
      this.$emit('export-preview');
    },
    changePreview() {
      this.$emit('change-preview');
    },
    changeColor() {
      document.querySelector('#change-color').click();
    },
  },
};
</script>
<style scoped lang="scss">
.tool-bar {
  .highlight {
    border: #ffdd40 1px solid;
  }
  div {
    margin-bottom: 10px;
  }
  .change-preview {
    position: relative;
    &::before {
      content: '切换简历样式';
      position: absolute;
      top: -20px;
      display: none;
      font-size: 14px;
      color: rgb(202, 202, 202);
    }
    &:hover::before {
      display: block;
    }
  }
  .change-color {
    position: relative;
    &::before {
      content: '切换简历颜色【开发中】';
      position: absolute;
      top: -20px;
      display: none;
      font-size: 14px;
      color: rgb(202, 202, 202);
    }
    &:hover::before {
      display: block;
    }
  }
  .save {
    position: relative;
    &::before {
      content: '生成简历预览，快捷键enter';
      position: absolute;
      top: -20px;
      display: none;
      font-size: 14px;
      color: rgb(202, 202, 202);
    }
    &:hover::before {
      display: block;
    }
  }
  .export {
    position: relative;
    &::before {
      content: '导出pdf';
      position: absolute;
      top: -20px;
      display: none;
      font-size: 14px;
      color: rgb(202, 202, 202);
    }
    &:hover::before {
      display: block;
    }
  }
}
</style>
