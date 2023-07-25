<template>
  <div class="itemMusicList">
    <div class="bar">
      <div class="barL">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-arrow-"></use>
        </svg>
        <span class="bofang"
          >播放全部
          <span>( {{ itemList.length }} )</span>
        </span>
      </div>
      <div class="barR">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiazai"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shoucangxiao"></use>
        </svg>
      </div>
    </div>
    <div class="itemList">
      <div class="item" v-for="(item, index) in itemList" :key="index">
        <div class="itemListL" @click="playMusic(index)">
          <span class="lifeSpan">{{ index + 1 }}</span>
          <div class="names">
            <p class="musicTitle">{{ item.name }}</p>
            <span
              class="author"
              v-for="(item1, index) in item.ar"
              :key="index"
              >{{ item1.name }}</span
            >
          </div>
        </div>
        <div class="itemListR">
          <!-- 判断是否有mv -->
          <svg class="icon" v-if="item.mv != 0" aria-hidden="true">
            <use xlink:href="#icon-bofangMV"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-liebiao-dian"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  setup(props) {},
  props: ["itemList"],
  methods: {
    //点击歌曲播放音乐
    playMusic: function (index) {
      this.updatePlayList(this.itemList);
      this.updatePlayListIndex(index);
    },
    ...mapMutations(["updatePlayList", "updatePlayListIndex"]),
  },
};
</script>

<style lang='less' scoped>
.itemMusicList {
  margin-top: 30px;
  padding: 0 12px;
  .bar {
    display: flex;
    justify-content: space-between;
    // align-items: center;

    .barL,
    .barR {
      display: flex;
      align-items: center;
      span,
      .icon {
        margin: 0 5px;
      }

      .bofang {
        color: black;
        font-size: 20px;
        font-weight: 400;
      }
      span {
        color: #999;
        font-size: 16px;
      }
    }
  }
  .itemList {
    margin-top: 18px;
    height: 5.5rem;
    overflow: scroll;
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 15px 0;
      .itemListL {
        display: flex;
        justify-content: space-evenly;
        align-items: center;

        .lifeSpan {
          width: 33px;
          color: #999;
          font-size: 20px;
          text-align: center;
        }
        .names {
          margin-left: 9px;
          .musicTitle {
            font-size: 0.3rem;
          }
          .author {
            color: #999;
            font-size: 0.2rem;
          }
        }
      }
      .itemListR {
        .icon {
          margin: 0 9px;
        }
      }
    }
  }
}
</style>