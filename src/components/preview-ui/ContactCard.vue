<template>
  <!-- 联系方式 -->
  <div v-if="preview.contact" class="contact-list">
    <div v-if="title" class="title">联系方式</div>
    <div v-if="preview.contact.wechat" class="contact-item">
      <img src="../../assets/wechat.svg" alt="" class="logo" />
      <div>{{ preview.contact.wechat }}</div>
    </div>
    <div v-if="preview.contact.phone" class="contact-item">
      <img src="../../assets/phone.svg" alt="" class="logo" />
      <div>{{ preview.contact.phone }}</div>
    </div>
    <div v-if="preview.contact.email" class="contact-item">
      <img src="../../assets/email.svg" alt="" class="logo" />
      <div>{{ preview.contact.email }}</div>
    </div>
    <div v-if="preview.contact.github" class="contact-item">
      <img src="../../assets/github.svg" alt="" class="logo" />
      <a :href="preview.contact.github" target="_blank">
        {{ preview.contact.github }}
      </a>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ContactCard',
  props: {
    preview: {
      type: Object,
      default() {
        return {};
      },
    },
    title: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.contact-list {
  margin: 10px 5px;
  font-size: 12px;
  color: #555;
  .title {
    font-size: 16px;
    text-align: center;
    margin: 10px auto 5px auto;
    border-bottom: 1px dashed grey;
  }
  .contact-item {
    display: flex;
    .logo {
      flex: 0 0 20px;
      margin-right: 6px;
    }
    a {
      text-decoration: none;
      color: #555;
    }
  }
}
</style>
