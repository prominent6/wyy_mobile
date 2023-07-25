<template>
  <div class="musicList">
    <div class="musicTop">
      <div class="title">推荐歌单</div>
      <div class="more">更多</div>
    </div>
    <div class="musicContent">
      <van-swipe
        :loop="false"
        :width="135"
        class="my-swipe"
        :show-indicators="false"
      >
        <!-- vue3 -->
        <van-swipe-item v-for="item in state.musicList" :key="item">
          <!-- 会解析成a标签 -->
          <!-- 路由跳转 -->
          <router-link :to="{ path: '/itemMusic', query: { id: item.id } }">
            <div class="recommand-pic">
              <img :src="item.picUrl" alt="" />
            </div>
            <span class="playCount">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-24gl-play"></use>
              </svg>
              <span>{{ changeCount(item.playCount) }}</span>
            </span>
            <span class="name">{{ item.name }}</span>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { getMusicList } from "@/request/api/home.js";
//vue3
import { reactive, onMounted } from "vue";
export default {
  setup() {
    const state = reactive({
      musicList: [],
    });
    //播放量格式
    function changeCount(num) {
      if (num >= 100000000) {
        //保留一位小数
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万";
      }
    }
    onMounted(async () => {
      let res = await getMusicList();
      // console.log(res);
      state.musicList = res.data.result;
    });
    return { state, changeCount };
  },
};
</script>

<style lang='less' scoped>
.musicList {
  border-top: 1px solid #fff;
  padding: 0 5px;
  width: 100%;
  height: 5rem;
  .musicTop {
    padding: 5px;

    width: 100%;
    height: 2.6em;
    display: flex;
    justify-content: space-between;

    .title {
      font-size: 0.4rem;
      font-weight: bold;
    }

    .more {
      position: relative;
      width: 20%;
      border: 1px solid #ccc;
      padding-left: 17px;
      height: 0.6rem;
      line-height: 0.6rem;
      border-radius: 0.4rem;
    }

    .more::after {
      content: "";
      position: absolute;
      top: 12px;
      right: 10px;
      width: 7px;
      height: 7px;
      border-top: 2px solid black;
      border-right: 2px solid black;
      transform: rotate(45deg);
    }
  }
  .musicContent {
    width: 100%;
    height: 4rem;

    .my-swipe {
      height: 100%;
      .van-swipe-item {
        padding: 0 5px;
        .recommand-pic {
          position: relative;
          width: 100%;
          border-radius: 10px;
          overflow: hidden;
          img {
            width: 100%;
          }
        }
        .playCount {
          position: absolute;
          top: 5px;
          right: 10px;
          padding: 2px 5px;
          background-color: rgba(255, 255, 255, 0.3);
          border-radius: 15px;
          color: white;
          font-size: 10px;
          line-height: 1px;
          font-weight: bold;
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          .icon {
            width: 12px;
            height: 12px;
            fill: white;
          }
          span {
            padding: 0 2px;
          }
        }
        .name {
          font-size: 14px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>