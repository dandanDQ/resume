<template>
  <div class="content">
    <article class="left-col">
      <upload-photo />
      <div v-if="preview.name" class="name">{{ preview.name }}</div>

      <div v-if="preview?.infos?.length" class="infos-list">
        <div class="title">基本信息</div>
        <div v-for="(info, idx) in preview.infos" :key="idx" class="base-info">
          <div v-if="typeof info === 'object'">
            <div v-for="(val, key) in info" :key="key">
              {{ key }}: {{ val }}
            </div>
          </div>
          <div v-else>{{ info }}</div>
        </div>
      </div>

      <contact-card :preview="preview" />

      <div v-if="preview?.skills?.length" class="skills-block">
        <div class="title">技能概要</div>
        <div class="skills">
          <div v-for="skill in preview.skills" :key="skill.name">
            <div class="skill">
              <div class="level" :style="{ width: skill.level + '%' }"></div>
              <span class="skill-name">{{ skill.name }}</span>
            </div>
            <div class="skill-desc">{{ skill.desc }}</div>
          </div>
        </div>
      </div>
      <div class="extra-block">
        {{ preview?.extra }}
      </div>
    </article>
    <!-- cards of first level. -->
    <article class="right-col">
      <section
        v-for="(firstLevel, firstTitle) in firstLevels"
        :key="firstTitle"
        class="first-level"
      >
        <div class="first-title">
          <div>{{ firstTitle }}</div>
        </div>
        <div
          v-for="item in firstLevel"
          :key="item?.['名称']"
          class="second-level"
        >
          <div class="second-title">
            <div class="name">{{ item?.['name'] }}</div>
            <div class="time">{{ item?.['time'] }}</div>
          </div>
          <div v-if="item?.['desc']">
            <div v-for="(desc, idx) in item?.['desc']" :key="idx" class="descs">
              <div v-for="(subdesc, key) in desc" :key="key" class="desc">
                <div class="key-desc">{{ key }}</div>
                <div class="sub-desc">
                  <div v-if="typeof subdesc === 'object'">
                    <div v-for="sub in subdesc" :key="sub">{{ sub }}</div>
                  </div>
                  <div v-else>
                    {{ subdesc }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  </div>
</template>
<script>
import ContactCard from '@/components/preview-ui/ContactCard.vue';
import UploadPhoto from '@/components/preview-ui/UploadPhoto.vue';

export default {
  name: 'PreviewTemplate02',
  components: {
    ContactCard,
    UploadPhoto,
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
};
</script>
<style scoped lang="scss">
$mainColor: #9adcff;
$skillColor: #e8f9fd;
$nameBgColor: #e8f9fd;
$borderColor: #0aa1dd;
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
    box-shadow: 0px 0px 3px $mainColor;
    background-color: $mainColor;
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
      background-color: $nameBgColor;
    }
    .infos-list {
      margin: 10px 5px;
      .base-info {
      }
    }

    .skills-block {
      align-self: center;
      margin-top: 24px;
      width: 240px;
      .skills {
        // width: 240px;
        // position: relative;
        // display: grid;
        // grid-template-columns: repeat(2, 1fr);
        // justify-items: center;
        padding: 5px;

        .skill {
          width: 80%;
          height: 20px;
          border-radius: 4px;
          position: relative;
          border: $skillColor 1px solid;
          box-shadow: 1px 1px 3px $skillColor;
          margin: 4px;
          font-weight: 400;
          .skill-name {
            text-align: center;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 100%;
            font-size: 12px;
            color: rgba(19, 15, 64, 1);
            font-weight: 500;
          }
          .level {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            height: 100%;
            background-color: $skillColor;
          }
        }
        .skill-desc {
          margin-bottom: 6px;
        }
      }
    }
    .extra-block {
      text-align: justify;
      margin: 10px;
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
      border: 1px solid $borderColor;
      // box-shadow: 0px 0px 2px $borderColor;

      .first-title {
        font-family: 'dq-font';
        font-size: 18px;
        line-height: 24px;
        text-shadow: 0.1em 0.1em 0.05em rgba(153, 153, 153, 0.6);
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
</style>
