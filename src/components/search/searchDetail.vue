<template>
  <div class="searchD" v-show="resultShow">
    <div class="searchTop">
      <svg class="icon" aria-hidden="true" @click="updateResultShow">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <input type="text" v-model="searchKey" />
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sousuoxiao"></use>
      </svg>
    </div>
    <div class="searched">
      <div class="item" v-for="(item, index) in searchList" :key="index">
        <div class="itemListL" @click="updateIndex(item)">
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
  methods: {
    updateIndex: function (item) {
      /* //item要更改，获取的对象的格式不一样
      item.al = item.album;
      item.al.picUrl = item.album.artist.img1v1Url; */
      //解析并传值
      this.$store.commit("pushPlayList", item);
      this.$store.commit(
        "updatePlayListIndex",
        this.$store.state.playList.length - 1
      );
    },
    ...mapMutations(["updateResultShow"]),
  },
  props: ["searchList", "searchKey", "resultShow"],
};
</script>

<style lang='less' scoped>
.searchD {
  .searchTop {
    background-color: #fff;
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    input {
      border: none;
      border-bottom: 1px solid #999;
      width: 80%;
      text-indent: 5px;
      font-size: 22px;
    }
    .icon {
      width: 20px;
      height: 20px;
    }
  }
  .searched {
    margin-top: 18px;
    height: 1rem;
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
            font-size: 20px;
          }
          .author {
            color: #999;
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