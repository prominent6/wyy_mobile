<template>
  <!-- 首页 -->
  <div class="home">
    <!-- 首页导航栏 -->
    <topNav />
    <!-- 轮播图部分 -->
    <swiperTop />
    <!-- 分类功能部分 -->
    <iconList />
    <!-- 推荐歌单部分 -->
    <musicList />
  </div>
</template>

<script>
// @ is an alias to /src
import topNav from "@/components/home/topNav.vue";
import swiperTop from "@/components/home/swiperTop.vue";
import iconList from "@/components/home/iconList.vue";
import musicList from "@/components/home/musicList.vue";
export default {
  name: "Home",
  components: {
    topNav,
    swiperTop,
    iconList,
    musicList,
  },
};
</script>
<style>
</style>
