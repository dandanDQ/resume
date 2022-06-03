<template>
  <div class="preview-template-01">
    <div class="add" @click="addItem"></div>
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
          <div class="remove" @click="removeItem(item.i)"></div>
          <div class="text">
            <TextEditor :list="item.list"/>
          </div>
        </div>
      </grid-item>
    </grid-layout>
  </div>
</template>
<script>
import VueGridLayout from 'vue3-grid-layout';
import TextEditor from '@/components/preview-ui/TextEditor.vue'
export default {
  name: 'PreviewTemplate03',
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    TextEditor
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
  },
  data() {
    return {
      colNum: 12,
      index: 20,
      layout: [
        { x: 0, y: 0, w: 12, h: 4, i: '0', list: [] },
        { x: 0, y: 4, w: 12, h: 2, i: '1', list: []},
        { x: 0, y: 6, w: 12, h: 3, i: '2', list: [] },
        { x: 0, y: 9, w: 12, h: 3, i: '3', list: [] },
      ],
    };
  },
  methods: {
    addItem() {
      // Add a new item. It must have a unique key!
      const sumY = this.layout.reduce((accu, item) => accu + item.h, this.layout[0]?.y ?? 0);
      console.log(sumY);
      this.layout.push({
        x: 0,
        y: sumY, // puts it at the bottom
        w: 12,
        h: 4,
        i: this.index,
        list: []
      });
      // Increment the counter to ensure key is always unique.
      this.index += 1;
    },
    removeItem(val) {
      const index = this.layout.map((item) => item.i).indexOf(val);
      this.layout.splice(index, 1);
    },
    saveHtml() {
      // 保存 layout 和对应的 list
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

    &:hover {
      border: rgb(255, 0, 0) 1px solid;
      color: rgb(255, 0, 0);
      border-radius: 50%;
    }
    &:hover::before {
      content: 'x'
    }
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
  
  &:hover {
  border: rgb(90, 203, 248) 1px solid;
  color: rgb(90, 203, 248);
  border-radius: 50%;
  }
  &:hover::before {
    content: '+';
  }
}
</style>
