<template>
  <div class="preview">
    <div class="content">
      {{ current }}
    </div>
    <div class="btn">列表</div>
  </div>
</template>
<script>
export default {
  name: 'Preview',
  data() {
    return {

    }
  },
  props: {
    current: {
      type: Object,
      default() {
        return {}
      }
    }
  },
}
</script>
<style>
.preview {
}
</style>