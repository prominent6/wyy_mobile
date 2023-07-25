<template>
  <div class="itemMusic">
    <img :src="playlist.coverImgUrl" alt="" class="bgimg" />
    <div class="itemMusicTop">
      <div class="itemTopL">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <span>歌单</span>
      </div>
      <div class="itemTopR">
        <svg class="icon sousuo" aria-hidden="true">
          <use xlink:href="#icon-sousuoxiao"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-liebiao-dian"></use>
        </svg>
      </div>
    </div>
    <div class="itemMusicCenter">
      <div class="iMpic">
        <img :src="playlist.coverImgUrl" alt="" />
        <span class="playCount">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-24gl-play"></use>
          </svg>
          <span>{{ changeCount(playlist.playCount) }}</span>
        </span>
      </div>
      <div class="content">
        <div class="title">
          <div class="title-c">{{ playlist.name }}</div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-anniu_jiantouzhankai_o"></use>
          </svg>
        </div>
        <div class="logMore">登录查看更多...</div>
      </div>
    </div>
    <div class="itemDetail">
      <div class="iconItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shoucang"></use>
        </svg>
        <span>{{ playlist.subscribedCount }}</span>
      </div>
      <div class="iconItem special">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-pinglun"></use>
        </svg>
        <span>{{ playlist.commentCount }}</span>
      </div>
      <div class="iconItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zhuanfaxing"></use>
        </svg>
        <span>{{ playlist.trackCount }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup(props) {
    // console.log(props); //不会打印，直接传了
    function changeCount(num) {
      if (num >= 100000000) {
        //保留一位小数
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万";
      }
    }
    return { changeCount };
  },
  props: ["playlist"],
};
</script>

<style lang='less' scoped>
.itemMusic {
  height: 4.2rem;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .bgimg {
    width: 100%;
    height: 4rem;
    position: absolute;
    z-index: -1;
    //背景虚化
    filter: blur(30px);
  }
  .itemMusicTop {
    padding: 0 10px;
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .itemTopL,
    .itemTopR {
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        padding-left: 15px;
        font-size: 20px;
        color: #fff;
      }
      .icon {
        width: 22px;
        height: 22px;
        fill: #fff;
      }
      .sousuo {
        margin-right: 25px;
      }
    }
  }
  .itemMusicCenter {
    padding: 0 20px;
    width: 100%;
    height: 2.8rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .iMpic {
      position: relative;
      width: 30%;
      img {
        width: 100%;
        overflow: hidden;
        border-radius: 15px;
      }
      .playCount {
        position: absolute;
        top: 5px;
        right: 5px;
        padding: 2px 5px;
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: 15px;
        color: white;
        font-size: 10px;
        line-height: 1px;
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
    }

    .content {
      margin-top: 5px;
      margin-left: 15px;
      width: 70%;
      .title {
        display: flex;
        justify-content: space-between;
        color: #fff;
        font-size: 18px;
        .title-c {
          width: 92%;
        }
        .icon {
          width: 8%;
          fill: #fff;
        }
      }
      .logMore {
        height: 60%;
        line-height: 1rem;
        color: black;
        text-align: center;
      }
    }
  }
  .itemDetail {
    width: 270px;
    height: 35px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 25px;
    background-color: #fff;
    .iconItem {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      span {
        padding: 4px;
      }
    }
    .special {
      padding: 0 15px;
      border: 1px solid #999;
      border-top: none;
      border-bottom: none;
    }
  }
}
</style>