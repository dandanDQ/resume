<template>
  <div class="preview-template-01">
    <article class="top-col">
      <upload-photo />
      <div class="info-block">
        <div v-if="preview.name" class="name">{{ preview.name }}</div>

        <div v-if="preview?.infos?.length" class="infos-list">
          <div
            v-for="(info, idx) in preview.infos"
            :key="idx"
            class="base-info"
          >
            <div v-if="typeof info === 'object'">
              <div v-for="(val, key) in info" :key="key">
                {{ key }}: {{ val }}
              </div>
            </div>
            <div v-else>{{ info }}</div>
          </div>
        </div>
      </div>

      <contact-card :preview="preview" :title="false" />
    </article>
    <!-- cards of first level. -->
    <article class="bottom-col">
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

    <div v-if="preview?.skills?.length" class="skills-block">
      <div class="title">技能概况</div>
      <div class="skills">
        <span v-for="skill in preview.skills" :key="skill.name" class="skill">
          <div class="level" :style="{ width: skill.level + '%' }"></div>
          <span class="skill-name">{{ skill.name }}</span>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import ContactCard from '@/components/preview-ui/ContactCard.vue';
import UploadPhoto from '@/components/preview-ui/UploadPhoto.vue';

export default {
  name: 'PreviewTemplate03',
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
.preview-template-01 {
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  font-family: 'Helvetica';
  .top-col {
    // background: #5580A0;
    box-sizing: border-box;
    backdrop-filter: blur(10px);
    // border: 1px rgba(112, 161, 255,1.0) solid;
    box-shadow: 1px 1px 3px rgb(112, 161, 255);
    background-color: rgba(112, 161, 255, 0.5);
    border-radius: 5px;
    margin-bottom: 20px;
    display: flex;
    padding: 10px;
    // color: white;
    .title {
      font-size: 16px;
      text-align: center;
      margin: 10px auto 5px auto;
      border-bottom: 1px dashed grey;
    }
    .info-block {
      margin-right: auto;
      .name {
        font-size: 36px;
        line-height: 36px;
        font-family: 'dq-fangtang';
        // text-align: center;
        vertical-align: middle;
        padding: 16px 8px;
        color: #2f3542;

        // background-color: rgba(255, 165, 2, 1);
      }
      .infos-list {
        margin: 10px 5px;
        .base-info {
        }
      }
    }
  }

  .bottom-col {
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
      border: 1px solid rgba(112, 161, 255, 0.6);
      box-shadow: 2px 2px 2px rgba(112, 161, 255, 0.5);

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
              flex: 0 0 100px;
            }
            .sub-desc {
            }
          }
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
      }
    }
  }

  .skills-block {
    align-self: center;
    margin-top: 24px;
    width: 100%;
    padding: 10px;
    // border: 1px solid #5698c3;
    border-radius: 8px;
    border: 1px solid rgba(112, 161, 255, 0.6);
    box-shadow: 2px 2px 2px rgba(112, 161, 255, 0.5);
    box-sizing: border-box;

    .title {
      font-family: 'dq-font';
      font-size: 18px;
      line-height: 24px;
      text-shadow: 0.1em 0.1em 0.05em rgba(153, 153, 153, 0.6);
      vertical-align: middle;
    }
    .skills {
      width: 100%;
      position: relative;
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      justify-items: center;

      .skill {
        width: 85%;
        height: 24px;
        border-radius: 4px;
        position: relative;
        border: #fed330 1px solid;
        box-shadow: 1px 1px 3px #fed330;
        margin: 4px;
        float: left;
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
          background-color: rgba(156, 136, 255, 0.3);
        }
      }
    }
  }
}
</style>
