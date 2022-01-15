<template>
  <div class="preview" id="resume-preview">
    <!-- <div class="test" style="color: red">{{ preview }}</div> -->
    <div class="ui-button" @click="onExport">导出</div>
    <div class="content">
      <article class="first-levels">
        <section class="first-level" v-for="(firstLevel, firstTitle) in firstLevels" :key="firstTitle">
          <div class="first-title">
            <div>{{firstTitle}}</div>
          </div>

          <div v-for="item in firstLevel" :key="item?.['名称']" class="second-level">
            <div class="second-title">
              <div class="name">{{ item?.['名称'] }}</div>
              <div class="time">{{ item?.['时间'] }}</div>
            </div>
            <div v-if="item?.['描述']">
              <div v-for="(desc, idx) in item?.['描述']" :key="idx" class="descs">
                <div v-for="(subdesc, key) in desc" :key="key" class="desc">
                  <div class="key-desc">{{ key }}</div>
                  <div class="sub-desc"> 
                    {{subdesc}}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>
      </article>

    </div>
    <div class="btn"></div>
  </div>
</template>
<script>
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";


export default {
  name: 'Preview',
  data() {
    return {
      firstLevel: []
    }
  },
  watch: {
    'current.preview': {
      immediate: true,
      handler(newVal) {
        console.log(newVal)
        this.loadData(newVal)
      }
    }
  },
  computed: {
    preview() {
      return this.current.preview ?? {}
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
  methods: {
    loadData(preview) {
      this.firstLevels = {}
      for(const key in preview) {
        console.log(key, preview[key])
        if(key.indexOf('经历') > -1) {
          this.firstLevels[key] = preview[key]
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
    }
  }
}
</script>
<style lang="scss" scoped>
.preview {
  width: 210mm;
  height: 297mm;
  border: 2px grey solid;
  background-color: white;
  color: #555;
  border-radius: 4px;
  font-size: 14px;
  padding: 30px;
  box-sizing: border-box;
  box-shadow: 0px 0px 1px 1px black;
  font-family:"微软雅黑";
  line-height: 24px;
  .content {
    .first-level {
      padding: 10px;
      // border: 1px solid #5698c3;
      border-radius: 8px;
      box-shadow: 0px 0px 3px 0px #5698c3;
      margin: 20px 0;
      .first-title {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 6px;
        border-bottom: 1px dashed #5698c3;
      }

      .second-level {
        margin-bottom: 6px;
        .descs {
          .desc {
            display: flex;
            .key-desc {
              flex: 0 0 120px;
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
</style>