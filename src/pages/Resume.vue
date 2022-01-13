<template>
  <article class="resume">
    <section>
      <Title />
      <div v-for="editor in editorList" :key="editor.idx"></div>
      <Editor />
    </section>
    <section>
      <Preview />
    </section>
  </article>
</template>
<script>
import Editor from '../components/Editor.vue'
import Preview from '../components/Preview.vue'
import Title from '../components/Title.vue'
export default {
  name: 'Resume',
  components: {
    Editor,
    Preview,
    Title
  },
  data() {
    return {
      editorList: [{idx: 0, resume: ''}]
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