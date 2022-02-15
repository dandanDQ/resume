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
        if(key.indexOf('FL-') > -1) {
          this.firstLevels[key.slice(3)] = preview[key]
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
  }
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
  .content {
    height: 100%;
    display: grid;
    grid-template-columns: 32% 66%;
    padding: 20px;
    box-sizing: border-box;
    grid-gap: 2%;
    .left-col {
      // background: #5580A0;
      box-sizing: border-box;
      backdrop-filter: blur(10px);
      // border: 1px rgba(112, 161, 255,1.0) solid;
      box-shadow: 1px 1px 3px rgb(112, 161, 255);
      background-color: rgba(112, 161, 255, 0.5);
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      // color: white;
      .title {
        font-size: 16px;
        text-align: center;
        margin: 10px auto 5px auto;
        border-bottom: 1px dashed grey;
      }
      .name {
        font-size: 44px;
        line-height: 30px;
        font-family: 'dq-fangtang';
        text-align: center;
        vertical-align: middle;
        padding: 16px 8px;
        color: #2f3542;
        background-color: rgba(255, 165, 2, 1.0);
      }
      .infos-list {
        margin: 10px 5px;
        .base-info {
          
        }
      }
      .contact-list {
        margin: 10px 5px;
        font-size: 12px;
        color: #555;

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
      .photo {
        display: flex;
        justify-content: center;
        margin: 10px;
        .photo-content {
          width: 26mm;
          height: 32mm;
          border: dashed 1px grey;
          border-radius: 4px;
          cursor: pointer;
        }
        #upload-input {
          display: none;
        }
      }

      .skills-block {
        align-self: center;
        margin-top:24px;
        width: 240px;
        .skills {
          width: 240px;
          position:relative;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          justify-items: center;

          .skill {
            width:85%;
            height: 24px;
            border-radius:4px;
            position:relative;
            border:#fed330 1px solid;
            box-shadow: 1px 1px 3px #fed330;
            margin:4px;
            float:left;
            font-weight: 400;
            .skill-name {
              text-align:center;
              position:absolute;
              top:50%;
              transform:translateY(-50%);
              width:100%;
              font-size: 12px;
              color: rgba(19, 15, 64,1.0);
              font-weight: 500;
            }
            .level {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              height: 100%;
              background-color: rgba(156, 136, 255,0.3);
            }
          }
          
        }
      }
    }

    .right-col {
      flex: 1;
      // background-color: #cc8a4d;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .first-level {
        padding: 10px;
        // border: 1px solid #5698c3;
        border-radius: 8px;
        border:1px solid rgba(112, 161, 255, 0.6);
        box-shadow: 2px 2px 2px rgba(112, 161, 255, 0.5);

        .first-title {
          font-family: 'dq-font';
          font-size: 18px;
          line-height: 24px;
          text-shadow: 0.1em 0.1em 0.05em rgba(153,153,153,0.6);
          vertical-align: middle;
        }

        .second-level {
          margin-bottom: 6px;
          .descs {
            .desc {
              display: flex;
              white-space: pre-wrap;
              .key-desc {
                flex: 0 0 70px;
              }
              .sub-desc {
              }
            }
          }
          .second-title {
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            font-weight: bold;

            .time {
              color: #868686;
            }
          }
        }
      }
    }
  }
}
</style>