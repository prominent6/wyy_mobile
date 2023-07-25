<template>
  <!-- 全局组件 -->
  <div class="footerMusic">
    <div class="footerL" @click="updateDetailShow">
      <img :src="playList[playListIndex].al.picUrl" alt="" />
      <div>
        <p>{{ playList[playListIndex].name }}</p>
        <span>横滑切换上下首哦</span>
      </div>
    </div>
    <div class="footerR">
      <svg class="icon" aria-hidden="true" @click="play" v-if="isbtnShow">
        <use xlink:href="#icon-bofang"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="play" v-else>
        <use xlink:href="#icon-bofangzhong"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zu"></use>
      </svg>
    </div>
    <!-- <audio
      ref="audio"
      :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"
    ></audio> -->
    <audio ref="audio" :src="musicUrl"></audio>
    <van-popup
      v-model:show="detailShow"
      position="bottom"
      :style="{ height: '100%', width: '100%' }"
    >
      <musicDetail
        :musicList="playList[playListIndex]"
        :play="play"
        :isbtnShow="isbtnShow"
        :addDuration="addDuration"
      />
    </van-popup>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import musicDetail from "@/components/item/musicDetail.vue";
import { getMusicUrl } from "@/request/api/item.js";
export default {
  data() {
    return {
      //定时器
      interVal: 0,
      musicUrl: "",
    };
  },
  computed: {
    //属性
    ...mapState(["playList", "playListIndex", "isbtnShow", "detailShow"]),
  },
  mounted() {
    this.getUrl();
    // console.log(this.$refs);
    this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
    // this.updateTime();
  },
  updated() {
    this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
    this.addDuration();
  },
  methods: {
    getUrl: async function () {
      let res = await getMusicUrl(this.playList[this.playListIndex].id);
      this.musicUrl = res.data.data[0].url;
      // console.log(res.data.data[0].url);
    },
    play: function () {
      if (this.$refs.audio.paused) {
        this.$refs.audio.play();
        this.updateIsbtnShow(false);
        this.updateTime(); //播放调用函数
      } else {
        this.$refs.audio.pause();
        this.updateIsbtnShow(true);
        clearInterval(this.interVal); //暂停就清除定时器
      }
    },
    addDuration: function () {
      this.updateDuration(this.$refs.audio.duration);
    },
    updateTime: function () {
      this.interVal = setInterval(() => {
        this.updateCurrentTime(this.$refs.audio.currentTime);
      }, 1000);
    },
    //方法
    ...mapMutations([
      "updateIsbtnShow",
      "updateDetailShow",
      "updateCurrentTime",
      "updateDuration",
    ]),
  },
  watch: {
    playListIndex: function () {
      //监听
      //如果序号发生改变,自动播放
      this.getUrl();
      this.$refs.audio.autoplay = true;
      if (this.$refs.audio.paused) {
        this.updateIsbtnShow(false);
      }
    },
    playList: function () {
      if (this.isbtnShow) {
        this.$refs.audio.autoplay = true;
        this.updateIsbtnShow(false);
      }
    },
  },
  components: {
    musicDetail,
  },
};
</script>

<style lang='less' scoped>
.footerMusic {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 1.2rem;
  padding: 0 0.3rem;
  padding-right: 0.5rem;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #999;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  .footerL {
    // width: 70%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
    div {
      margin-left: 0.15rem;
      span {
        font-size: 0.24rem;
      }
    }
  }
  .footerR {
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
}
</style>