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
    <div class="ui-button" @click="changeEditorList('next')">
      <img src="../assets/icon_next.svg" />
    </div>
    <div class="ui-button" @click="changeEditorList('delete')">
      <img src="../assets/delete.svg" />
    </div>
    <div class="ui-button" @click="getEditorValue">
      <img src="../assets/save.svg" />
    </div>
    <div class="ui-button" @click="exportPreview">
      <img src="../assets/pdf_export.svg" />
    </div>
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
  emits: ['change-editor-list', 'get-editor-value', 'export-preview'],
  mounted() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.getEditorValue();
      }
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
}
</style>
