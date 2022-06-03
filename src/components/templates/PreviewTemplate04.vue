<template>
  <div class="preview-template-01">
    <div v-if="editMode" class="add" @click="addItem">+</div>
    <grid-layout
      v-model:layout.async="layout"
      :col-num="12"
      :row-height="20"
      :is-draggable="true"
      :is-resizable="true"
      :is-mirrored="false"
      :vertical-compact="false"
      :margin="[15, 15]"
      :use-css-transforms="true"
    >
      <grid-item
        v-for="item in layout"
        :key="item.i"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
      >
        <div class="box">
          <div v-if="editMode" class="remove" @click="removeItem(item.i)">
            -
            {{ `text-${item.i}` }}
          </div>
          <div class="text">
            <TextEditor
              :ref="`text-${item.i}`"
              :pre-list="item.list"
              :edit-mode="editMode"
            />
          </div>
        </div>
      </grid-item>
    </grid-layout>
  </div>
</template>
<script>
import VueGridLayout from 'vue3-grid-layout';
import TextEditor from '@/components/preview-ui/TextEditor.vue';

export default {
  name: 'PreviewTemplate03',
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    TextEditor,
  },
  props: {
    preview: {
      type: Object,
      default() {
        return {};
      },
    },
    firstLevels: {
      type: Object,
      default() {
        return {};
      },
    },
    editMode: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      layout: [],
    };
  },
  created() {
    this.layout = JSON.parse(
      window.localStorage.getItem('resume-layout') || [],
    );
  },
  methods: {
    addItem() {
      // 取当前最大的y坐标值
      let nextY = 0;
      let i = 0;
      this.layout.forEach((item) => {
        nextY = Math.max(item.y + item.h, nextY);
        i = item.i + 1;
      });

      this.layout.push({
        x: 0,
        y: nextY, // puts it at the bottom
        w: 12,
        h: 4,
        i,
        list: [],
      });
      // Increment the counter to ensure key is always unique.
    },
    removeItem(val) {
      const index = this.layout.map((item) => item.i).indexOf(val);
      this.layout.splice(index, 1);
    },
    saveHtml() {
      // 将 list 保存到 layout 中
      this.layout.forEach((item) => {
        console.log(`text-${item.i}`);
        this.$refs[`text-${item.i}`].getList();
      });
      // 保存 layout 和对应的 list
      window.localStorage.setItem('resume-layout', JSON.stringify(this.layout));
    },
  },
};
</script>
<style scoped lang="scss">
.preview-template-01 {
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  font-family: 'Helvetica';
}
</style>
<style scoped lang="scss">
.box {
  height: 100%;
  width: 100%;
  position: relative;
  .text {
    height: 100%;
    width: 100%;
  }

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
  cursor: pointer;
  z-index: 1;
  border: rgb(90, 203, 248) 1px solid;
  color: rgb(90, 203, 248);
  border-radius: 50%;
}
</style>
