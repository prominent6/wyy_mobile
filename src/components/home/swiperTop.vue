<template>
  <div id="swipeTop">
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in state.images" :key="image">
        <img :src="image.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
//vue3
import { getBanner } from "@/request/api/home.js";
//生命周期 钩子
import { reactive, onMounted } from "vue";
export default {
  setup() {
    //定义一个响应式的对象
    const state = reactive({
      images: [],
    });
    onMounted(async () => {
      let res = await getBanner();
      state.images = res.data.banners;
      // console.log(res);
    });
    return { state };
  },
};
</script>

<style lang='less'>
#swipeTop {
  margin: 2px;
  .van-swipe {
    width: 100%;
    border-radius: 10px;
    .van-swipe-item {
      img {
        width: 100%;
        height: 3rem;
      }
    }
  }
  .van-swipe__indicator--active {
    background-color: rgb(219, 130, 130);
  }
}
</style>