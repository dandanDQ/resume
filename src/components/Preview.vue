<template>
  <div class="preview" id="resume-preview">
    <!-- <div class="test" style="color: red">{{ preview }}</div> -->
    <div class="content">
      <article class="left-col">
        <div class="photo">
          <div @click="uploadPhoto" class="photo-content">
            <img src="" alt="" id="upload-img">
          </div>
          <input type="file" id="upload-input" accept="image/*" @change="loadImg">
        </div>
        <div class="name" v-if="name">{{name}}</div>

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

        <div class="skills-block" v-if="skills.length">              
          <div class="skills">
              <span class="skill" v-for="skill in skills" :key="skill.name" :style="{'--percentage': skill.level+'%'}" >
                  <span class="skill-name">{{skill.name}}</span>
              </span>
          </div>
        </div>
      </article>
      <!-- cards of first level. -->
      <article class="right-col">
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
    },
    skills() {
      return this.current?.preview?.skills ?? []
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
      const upload = document.querySelector('#upload-input')
      upload.click()
    },
    loadImg() {
      const imgFile = document.querySelector('#upload-input')?.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(imgFile)
      reader.onload = function() {
        const img = document.querySelector('#upload-img')
        img.setAttribute("src", reader.result)
        img.style.width = '26mm'
        img.style.height = '32mm'
        img.style['object-fit'] = 'cover'
      }
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
  src: url(../assets/fangtang.ttf) format('truetype')
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
  line-height: 22px;
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
      .name {
        font-size: 40px;
        line-height: 30px;
        font-family: 'dq-fangtang';
        text-align: center;
        vertical-align: middle;
        padding: 16px 8px;
        color: #2f3542;
        background-color: rgba(255, 165, 2, 1.0);
      }
      .contact-list {
        margin: 10px 5px;
        font-size: 12px;
        .contact-item {
          display: flex;
          .logo {
            flex: 0 0 20px;
            margin-right: 6px;
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
        margin-top:20px;
        width: 240px;
        .skills {
          width: 240px;
          position:relative;
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          justify-items: center;

          .skill {
            width:85%;
            height: 20px;
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
              font-size: 14px;
              color: rgba(19, 15, 64,1.0);
              font-weight: 500;
            }
          }
          .skill::before{
            content:'';
            background-color: rgba(156, 136, 255,0.3);
            clip-path: polygon(0 0,var(--percentage) 0, var(--percentage) 100%,0 100%);
            display: block;
            width: 80px;
            height: 20px;
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