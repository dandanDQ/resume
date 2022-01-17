<template>
  <div class="preview" id="resume-preview">
    <!-- <div class="test" style="color: red">{{ preview }}</div> -->
    <div class="content">
      <div class="base-info">
        <div class="photo">
          <div @click="uploadPhoto" class="photo-content"></div>
          <input type="file" id="photo-upload">
        </div>
        <div class="name" v-if="name"> {{name}}</div>

        <div class="contact-list">
          <div v-if="contact.wechat" class="contact-item">
            <img src="../assets/wechat.svg" alt="" class="logo"> 
            <div>{{contact.wechat}}</div>
          </div>
          <div v-if="contact.phone" class="contact-item">
            <img src="../assets/phone.svg" alt="" class="logo"> 
            <div>{{contact.phone}}</div>
          </div>
          <div v-if="contact.email" class="contact-item">
            <img src="../assets/email.svg" alt="" class="logo"> 
            <div>{{contact.email}}</div>
          </div>
          <div v-if="contact.github" class="contact-item">
            <img src="../assets/github.svg" alt="" class="logo"> 
            <div>{{contact.github}}</div>
          </div>
        </div>
      </div>
      <!-- cards of first level. -->
      <article class="first-levels">
        <section class="first-level" v-for="(firstLevel, firstTitle) in firstLevels" :key="firstTitle">
          <div class="first-title">
            <div>{{firstTitle}}</div>
          </div>
          <div v-for="item in firstLevel" :key="item?.['名称']" class="second-level">
            <div class="second-title">
              <div class="name">{{ item?.['name'] }}</div>
              <div class="time">{{ item?.['time'] }}</div>
            </div>
            <div v-if="item?.['desc']">
              <div v-for="(desc, idx) in item?.['desc']" :key="idx" class="descs">
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
      firstLevels: []
    }
  },
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
    }
  },
  computed: {
    preview() {
      return this.current.preview ?? {}
    },
    name() {
      return this.current?.preview?.name ?? ''
    },
    contact() {
      return this.current?.preview?.contact ?? []
    }
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
    }
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
    uploadPhoto() {
      const upload = document.querySelector('#photo-upload')
      console.log('upload EL', upload)
      upload.click()
    }
  }
}
</script>
<style lang="scss" scoped>
@font-face {
  font-family: 'font1';
  src: url(../assets/re-font.TTF);
}
.preview {
  width: 210mm;
  height: 297mm;
  background-color: white;
  color: rgb(255, 255, 255);
  border-radius: 4px;
  font-size: 14px;
  // padding: 30px;
  box-sizing: border-box;
  box-shadow: 0px 0px 1px 1px black;
  font-family:"微软雅黑";
  line-height: 24px;
  .content {
    display: flex;
    flex-direction: column;
    height: 100%;
    .base-info {
      display: flex;
      justify-content: space-between;
      background: #5580A0;
      backdrop-filter: blur(10px);
      padding: 30px;
      // color: white;
      .name {
        font-size: 40px;
        font-family: 'font1';
        line-height: 40px;
      }
      .contact-list {
        .contact-item {
          display: flex;
          .logo {
            flex: 0 0 20px;
            margin-right: 6px;
          }
        }
      }
      .photo {
        .photo-content {
          width: 26mm;
          height: 32mm;
          border: solid 1px grey;
          border-radius: 4px;
        }
        #photo-upload {
          display: none;
        }
      }

    }

    .first-levels {
      flex: 1;
      background-color: #cc8a4d;
      height: 100%;
      padding: 30px;
      .first-level {
        padding: 10px;
        // border: 1px solid #5698c3;
        border-radius: 8px;
        box-shadow: 0px 0px 3px 0px black;
        margin: 20px 0;

        .first-title {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 6px;
          border-bottom: 1px dashed #cc8a4d;
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
}
</style>