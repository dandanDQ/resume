<template>
  <div class="text-editor">
    <!-- 内容编辑器
    构想：要有大标题区，小标题区，文本怎么对齐呢？ -->
    <div contenteditable="true" class="title">大标题</div>
    <div v-if="editMode" class="add" @click="addItem">+</div>
    <div v-for="item in list" :key="item.id" class="item">
      <div v-if="editMode" class="remove" @click="removeItem(item)">-</div>
      <div class="second-title">
        <div class="name" contenteditable="true">{{ item.title }}</div>
        <div class="time" contenteditable="true">{{ item.time }}</div>
      </div>
      <div class="desc" contenteditable="true">{{ item.desc }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TextEditor',
  props: {
    editMode: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      list: [],
    };
  },
  methods: {
    addItem() {
      if (!this.list.length) {
        this.list.push({
          id: 1,
          title: '标题',
          time: '2022/06/03-2022/06/05',
          desc: '描述',
        });
        return;
      }
      // 中间某项可能被移除了
      const id = this.list[this.list.length - 1].id + 1;
      this.list.push({
        id,
        title: '标题',
        time: '2022/06/03-2022/06/05',
        desc: '描述',
      });
    },
    removeItem(item) {
      const idx = this.list.indexOf(item);

      this.list.splice(idx, 1);
    },
    saveText() {
      // 保存 list
    },
  },
};
</script>
<style lang="scss" scoped>
.text-editor {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  background: #ecf5ff;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid rgba(112, 161, 255, 0.6);
  box-shadow: 2px 2px 2px rgba(112, 161, 255, 0.5);

  .title {
    font-family: 'dq-font';
    font-size: 18px;
    line-height: 24px;
    text-shadow: 0.1em 0.1em 0.05em rgba(153, 153, 153, 0.6);
    vertical-align: middle;
  }
  .second-title {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    font-weight: 600;

    .time {
      color: #868686;
    }
  }

  .item {
    position: relative;
    letter-spacing: 1;
    text-align: justify;
    white-space: pre-wrap;
    .remove {
      position: absolute;
      right: 5px;
      top: 5px;
      width: 16px;
      height: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      border: rgb(255, 0, 0) 1px solid;
      color: rgb(255, 0, 0);
      border-radius: 50%;
    }
  }

  .add {
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: rgb(90, 203, 248) 1px solid;
    color: rgb(90, 203, 248);
    border-radius: 50%;
    cursor: pointer;
    z-index: 1;
  }
}
</style>
