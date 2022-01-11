<template>
  <article class="resume">
    <section>
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

export default {
  name: 'Resume',
  components: {
    Editor,
    Preview
  },
  data() {
    return {
    }
  }
}
</script>
<style scoped lang="scss">
article.resume {
  height: 96vh;
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