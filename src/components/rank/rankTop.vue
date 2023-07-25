<template>
  <div class="rankTop">
    <div class="rankBar">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <span>排行榜</span>
    </div>
    <div class="rankList">
      <div
        class="rankItemB"
        v-for="(item, index) in rankList"
        :key="index"
        v-show="item.tracks.length != 0"
      >
        <div class="contentL">
          <img :src="item.coverImgUrl" alt="" />
        </div>
        <div class="contentR">
          <div class="songs" v-for="(item1, index) in item.tracks" :key="index">
            <span class="lifeSpan">{{ index + 1 }}</span>
            <div class="names">
              <p class="musicTitle">{{ item1.first }}</p>
              <span class="author">{{ item1.second }}</span>
            </div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-yixianshi-"></use>
            </svg>
          </div>
        </div>
      </div>
      <div class="zhongjian">精选榜</div>
      <div
        class="rankItemJX"
        v-for="(item, index) in rankList"
        :key="index"
        v-show="!item.tracks.length"
      >
        <img :src="item.coverImgUrl" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {},
  props: ["rankList"],
};
</script>

<style lang='less' scoped>
.rankTop {
  padding: 0.2rem;
  .rankBar {
    display: flex;
    align-items: center;
  }
  .rankList {
    width: 100%;
    height: 11rem;
    margin-bottom: 0.6rem;
    overflow: scroll;
    .rankItemB {
      border-radius: 0.2rem;
      background-color: #fff;
      width: 95%;
      padding: 0.1rem;
      margin: 0.2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .contentL {
        img {
          width: 2.4rem;
          height: 2.4rem;
          border-radius: 0.1rem;
        }
      }
      .contentR {
        width: 60%;
        .songs {
          display: flex;
          align-content: center;
          .lifeSpan {
            width: 0.66rem;
            height: 0.66rem;
            line-height: 0.66rem;
            color: #999;
            text-align: center;
          }
          .names {
            width: 80%;
            .musicTitle {
              font-size: 0.25rem;
            }
            .author {
              font-size: 0.2rem;
              color: #999;
            }
          }
          .icon {
            fill: #999;
            // line-height: 0.46rem;
            margin: 0.07rem 0;
          }
        }
      }
    }
    .zhongjian {
      font-size: 0.44rem;
    }
    .rankItemJX {
      margin-top: 0.2rem;
      img {
        float: left;
        width: 2.2rem;
        height: 2.2rem;
        margin: 0.05rem;
        border-radius: 0.1rem;
      }
    }
  }
}
</style>