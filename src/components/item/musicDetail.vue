<template>
  <!-- 歌曲详情页 -->
  <div class="musicDetail">
    <img :src="musicList.al.picUrl" alt="" class="bgimg" />
    <div class="detailTop">
      <svg class="icon" aria-hidden="true" @click="updateDetailShow">
        <use xlink:href="#icon-xiajiantou"></use>
      </svg>
      <div class="names">
        <Vue3Marquee>{{ musicList.name }}</Vue3Marquee>
        <span v-for="item in musicList.ar" :key="item" class="authorN">
          {{ item.name }}
        </span>
      </div>
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zhuanfaxing"></use>
      </svg>
    </div>
    <div class="detailContent" v-show="!isLyricShow">
      <img
        src="@/assets/needle-ab.png"
        alt=""
        class="needle"
        :class="{ needle_active: !isbtnShow }"
      />
      <img src="@/assets/disc-plus.png" alt="" class="cd" />
      <img
        :src="musicList.al.picUrl"
        alt=""
        class="ar"
        @click="isLyricShow = true"
        :class="{ ar_active: !isbtnShow, ar_paused: isbtnShow }"
      />
    </div>
    <div
      class="musciLyrics"
      ref="musicLyric"
      v-show="isLyricShow"
      @click="isLyricShow = false"
    >
      <p
        v-for="item in lyric"
        :key="item"
        :class="{
          active:
            currentTime * 1000 >= item.time && currentTime * 1000 < item.aft,
        }"
      >
        {{ item.lrc }}
      </p>
    </div>
    <div class="detailFooter">
      <div class="footerTop">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-aixin"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiazai"></use>
        </svg>

        <svg class="icon" aria-hidden="true" @click="updateCommentShow">
          <use xlink:href="#icon-pinglun"></use>
        </svg>
        <router-link
          :to="{
            path: '/comment/simi',
            query: { musicList: JSON.stringify(playList[playListIndex]) },
          }"
        >
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xihuan"></use>
          </svg>
        </router-link>
      </div>
      <div class="footerC">
        <input
          type="range"
          class="range"
          min="0"
          :max="duration"
          v-model="currentTime"
          step="0.05"
        />
      </div>
      <div class="footer">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xunhuan"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
          <use xlink:href="#icon-shangyishoushangyige"></use>
        </svg>
        <svg
          class="icon bofang"
          aria-hidden="true"
          @click="play"
          v-if="isbtnShow"
        >
          <use xlink:href="#icon-bofang1"></use>
        </svg>
        <svg class="icon bofang" aria-hidden="true" @click="play" v-else>
          <use xlink:href="#icon-bofangzhong"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="goPlay(1)">
          <use xlink:href="#icon-xiayigexiayishou"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-24gl-playlist"></use>
        </svg>
      </div>
    </div>
    <van-popup
      v-model:show="commentShow"
      position="bottom"
      :style="{ height: '100%', width: '100%' }"
    >
      <commentTop :musicList="playList[playListIndex]" />
    </van-popup>
  </div>
</template>

<script>
import { Vue3Marquee } from "vue3-marquee";
import "vue3-marquee/dist/style.css";
import { mapMutations, mapState } from "vuex";
import commentTop from "@/components/item/commentTop.vue";

export default {
  data() {
    return {
      isLyricShow: false,
    };
  },
  computed: {
    ...mapState([
      "lyricList",
      "currentTime",
      "playListIndex",
      "playList",
      "duration",
      "commentShow",
    ]),
    //正则表达式获取歌词
    lyric: function () {
      let arr;
      if (this.lyricList.lyric) {
        //以换行符进行分割
        arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
          let min = item.slice(item.indexOf("[") + 1, item.indexOf(":"));
          let sec = item.slice(item.indexOf(":") + 1, item.indexOf("."));
          let mill = item.slice(item.indexOf(".") + 1, item.indexOf("]"));
          let lrc = item.slice(item.indexOf("]") + 1, item.length);
          let time =
            parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          //   console.log(min, sec, mill, lrc);
          return { min, sec, mill, lrc, time };
        });
        arr.forEach((item, i) => {
          if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
            item.aft = 100000;
          } else {
            item.aft = arr[i + 1].time; //添加属性记录下一句的时间
          }
        });
      }
      //   console.log(arr);
      return arr;
    },
  },
  mounted() {
    // console.log(this.musicList);
    this.addDuration();
  },
  props: ["musicList", "play", "isbtnShow", "addDuration"],
  methods: {
    ...mapMutations([
      "updateDetailShow",
      "updatePlayListIndex",
      "updateCommentShow",
    ]),
    //切换歌曲
    goPlay: function (num) {
      let index = this.playListIndex + num;
      if (index < 0) {
        index = this.playList - 1;
      } else if (index == this.playList.length) {
        index = 0;
      }
      this.updatePlayListIndex(index);
    },
  },
  watch: {
    currentTime: function (newValue) {
      let p = document.querySelector("p.active");
      // console.log(p.offsetTop);
      if (p && p.offsetTop > 300) {
        //第一次输出的p为null
        this.$refs.musicLyric.scrollTop = p.offsetTop - 300;
      }
      //到达最后的处理
      if (newValue === this.duration) {
        if (this.playListIndex === this.playList.length - 1) {
          this.updatePlayListIndex(0);
          this.play();
        } else {
          this.updatePlayListIndex(this.playListIndex + 1);
        }
      }
    },
  },
  components: {
    Vue3Marquee,
    commentTop,
  },
};
</script>

<style lang='less' scoped>
.musicDetail {
  .bgimg {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    filter: blur(80px);
  }
  .detailTop {
    margin-top: 10px;
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      width: 25px;
      height: 25px;
    }
    .names {
      width: 60%;
      text-align: center;
      font-size: 21px;
      .authorN {
        font-size: 15px;
      }
    }
  }
  .detailContent {
    position: relative;
    width: 100%;
    height: 9rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 100%;
      height: 100%;
    }
    .needle {
      width: 2rem;
      height: 3rem;
      position: absolute;
      left: 46%;
      transform-origin: 0 0; //原点
      transform: rotate(-15deg); //旋转
      transition: all 2s;
    }
    .needle_active {
      width: 2rem;
      height: 3rem;
      position: absolute;
      left: 46%;
      transform-origin: 0 0; //原点
      transform: rotate(0deg); //旋转
      transition: all 2s;
    }
    .cd {
      width: 5rem;
      height: 5rem;
      position: absolute;
      bottom: 2.3rem;
      z-index: -1;
    }
    .ar {
      width: 3.2rem;
      height: 3.2rem;
      border-radius: 50%;
      position: absolute;
      bottom: 3.14rem;
      animation: rotate_ar 10s linear infinite; //匀速和无限循环
    }
    .ar_active {
      animation-play-state: running;
    }
    .ar_paused {
      animation-play-state: paused;
    }
    @keyframes rotate_ar {
      0% {
        transform: rotateZ(0deg);
      }
      100% {
        transform: rotateZ(360deg);
      }
    }
  }
  .musciLyrics {
    width: 100%;
    height: 8.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 0.25rem;
    overflow: scroll;
    p {
      color: #ccc;
      margin-bottom: 0.3rem;
      font-size: 0.3rem;
    }
    .active {
      color: white;
      font-size: 25px;
    }
  }
  .detailFooter {
    width: 100%;
    height: 2rem;
    position: absolute;
    bottom: 0.2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .footerTop,
    .footer {
      width: 100%;
      height: 1rem;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      .icon {
        width: 28px;
        height: 28px;
        fill: #999;
      }
      .bofang {
        width: 50px;
        height: 50px;
      }
    }
    .footerC {
      width: 100%;
      padding: 0.15rem;
      .range {
        width: 100%;
        height: 0.06rem;
      }
    }
  }
}
</style>