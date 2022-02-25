<template>
  <div class="preview" id="resume-preview">
    <component :is="comName" :preview="current.preview" :firstLevels="firstLevels"></component>
  </div>
</template> 
<script>
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas"; 
import { comList, components}  from '@/components/utils.js'

export default {
  name: 'Preview',
  data() {
    return {
      firstLevels: {},
      comList: comList,
      comIdx: 0,
      comName: 'PreviewTemplate01'
    }
  },
  components,
  watch: {
    'current.preview': {
      immediate: true,
      handler(newVal) {
        this.loadData(newVal)
      }
    },
    exportFlag: {
      handler() {
        this.onExport()
      }
    },
    previewFlag: {
      handler() {
        this.onChangePreview()
      }
    },
  },
  computed: {
    preview() {
      return this.current.preview ?? {}
    },
  },
  props: {
    current: {
      type: Object,
      default() {
        return {}
      }
    },
    exportFlag: {
      type: Boolean,
      default: true
    },
    previewFlag: {
      type: Boolean,
      default: true
    },
  },
  methods: {
    loadData(preview) {
      this.firstLevels = {}
      for(const key in preview) {
        if(key.indexOf('CARD-') > -1) {
          this.firstLevels[key.slice(5)] = preview[key]
        }
      }
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
    }
  },
  created() { 
    this.comName = window.localStorage.getItem('comName') ?? 'PreviewTemplate01'
    window.addEventListener('beforeunload', (e) => {
      window.localStorage.setItem('comName', this.comName)
    })
  },
}
</script>
<style lang="scss" scoped>
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
.preview {
  width: 210mm;
  height: 297mm;
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
</style>