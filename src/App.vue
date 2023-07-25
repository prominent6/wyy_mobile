<template>
  <div>
    <router-view />
    <footerMusic />
  </div>
</template>
<script>
// 全局组件
import footerMusic from "@/components/item/footerMusic.vue";
export default {
  components: {
    footerMusic,
  },
};
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.icon {
  width: 0.4rem;
  height: 0.4rem;
}
body {
  background-color: #ccc;
}
a {
  color: black;
}
</style>
 