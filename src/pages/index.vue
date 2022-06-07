<template>
  <article class="resume">
    <section class="tool-section">
      <title />
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

          <div class="ui-button" @click="saveHtml">
            saveHtml
          </div>
          <div class="ui-button" @click="editMode = !editMode">
            edit
          </div>
          <!-- <div class="ui-button" @click="changeEditorList('next')">
            <img src="../assets/icon_next.svg" />
          </div> -->
          <div class="ui-button" @click="changeEditorList('delete')">
            <img src="../assets/delete.svg" />
          </div>
          <div class="ui-button save" @click="loadData">
            <img src="../assets/生成.svg" />
          </div>
          <div class="ui-button export" @click="onExport">
            <img src="../assets/pdf_export.svg" />
          </div>
          <div class="ui-button change-preview" @click="onChangePreview">
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
      <editor :current="current" :saveFlag="saveFlag"/>
    </section>
    <section class="preview-section" id="resume-preview" >
      <component :is="comName" :preview="preview" :firstLevels="firstLevels" :editMode="editMode" ref="comp"></component>
    </section>
  </article>
</template>
<script>
import Editor from '@/components/Editor.vue'
import Title from '@/components/Title.vue'
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas"; 
import { comList, components}  from '@/components/utils.js'
import defaultVal from '@/components/config.js'

export default {
  name: 'Resume',
  computed: {
    preview() {
      return this.current.preview ?? {}
    },
  },
  components: {
    Editor,
    Title,
    ...components,
  },
  data() {
    return {
      editorList: [{ yaml: '预设1', preview: {}}, { yaml: '预设2', preview: {}} ],
      current: null,
      capacity: 6,
      saveFlag: true,
      exportFlag: true,
      previewFlag: true,
      firstLevels: {},
      comList: comList,
      comIdx: 0,
      comName: 'PreviewTemplate01',
      editMode: true,
    }
  },
  created() { 
    const initVal = JSON.stringify([{ yaml: defaultVal, preview: {}}, { yaml: defaultVal, preview: {}} ])
    const editorString = window.localStorage.getItem('editorList') ?? initVal
    this.editorList = JSON.parse(editorString)
    this.current = this.editorList[0]
    this.comName = window.localStorage.getItem('comName') ?? 'PreviewTemplate01'
    this.loadData()
  },
  mounted() {
    window.addEventListener('beforeunload', (e) => {
      window.localStorage.setItem('editorList', JSON.stringify(this.editorList))
      window.localStorage.setItem('comName', this.comName)
      this.saveHtml()
    })
    window.addEventListener('keydown', this.loadData)
  },
  methods: {
    changeEditorList(editor) {
      switch(editor) {
        case 'next' : {
          if(this.editorList.length <= 1)  break;
          const idx = (this.editorList.indexOf(this.current) + 1) % this.editorList.length
          this.current = this.editorList[idx]
          break;
        }
        case 'add' : {
          if(this.editorList.length >= this.capacity) break;
          this.editorList.push({ yaml: defaulVal, preview: {}})
          this.current = this.editorList[this.editorList.length - 1]
          this.saveFlag = !this.saveFlag // 触发生成预览
          break;
        }
        case 'delete' : {
          if(this.editorList.length <= 1)  break;
          const delIdx = this.editorList.indexOf(this.current)
          this.editorList.splice(delIdx, 1)
          const idx = (delIdx + this.editorList.length) % this.editorList.length
          this.current = this.editorList[idx]
          break;
        }
        default: {
          this.current = editor
        }
      }
    },
    loadData() {
      this.saveFlag = !this.saveFlag
      this.$nextTick(() => {
        this.firstLevels = {}
        for(const key in this.preview) {
          if(key.indexOf('CARD-') > -1) {
            this.firstLevels[key.slice(5)] = this.preview[key]
          }
        }
      })
    },
    onExport() {
      const el = document.querySelector('#resume-preview')
      html2canvas(el).then((canvas) => {
        const  pageData = canvas.toDataURL("image/jpeg", 1.0);
        const pdf = new jsPDF();
        pdf.addImage(pageData, "JPEG", 0, 0, 210, 297);
        pdf.save("a4.pdf");
      })
    },
    onChangePreview() {
      this.comIdx = (this.comIdx + 1) % this.comList.length
      this.comName = this.comList[this.comIdx]
    },
    saveHtml() {
      this.$refs.comp.saveHtml?.()
    }
  }
}
</script>
<style lang="scss">
@font-face {
  font-family: 'font1';
  src: url(../assets/re-font.TTF);
}
@font-face {
  font-family: 'dq-font';
  src: url(../assets/ShangShou.ttf) format('truetype')
}
@font-face {
  font-family: 'dq-fangtang';
  src: url(../assets/xiaowanzi.ttf) format('truetype')
}
@font-face {
  font-family: 'dq-guofengran';
  src: url(../assets/guofengran.ttf) format('truetype')
}
article.resume {
  border: 1px solid grey;
  border-radius: 4px;
  box-sizing: border-box;
  display: grid;
  margin: 10px auto;
  padding: 10px;
  grid-template-columns: minmax(300px, calc(95vw - 210mm)) 210mm;
  grid-gap: 10px;
  width: 95vw;
  min-width: calc(300px + 220mm);
  .preview-section {
    width: 210mm;
    min-width: 210mm;
    height: 297mm;
    box-shadow: none;
    background-color: white;
    color: #555;
    border-radius: 4px;
    font-size: 14px;
    // padding: 30px;
    box-sizing: border-box;
    box-shadow: 0px 0px 1px 1px black;
    line-height: 26px;
    font-family: 'dq-guofengran';
    font-weight: 400;
  }

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
}
@media print {
  body {
    width: 210mm;
    min-width: 210mm;
    height: 297mm;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: white;
    -webkit-print-color-adjust:exact;
    -webkit-filter: opacity(1);
  }
  article.resume {
    background-color: white;
    width: 210mm;
    min-width: 210mm;
    height: 297mm;
    border: none;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  .tool-section {
    display: none;
  }
  .preview-section {
    width: 210mm;
    min-width: 210mm;
    height: 297mm;
    box-shadow: none;
    background-color: white;
  }
}
</style>