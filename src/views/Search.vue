<template>
  <div class="search">
    <searchTop :hotList="state.hotList" />
  </div>
</template>

<script>
import { getHotMusic } from "@/request/api/search.js";
import { onMounted, reactive } from "vue";
import searchTop from "@/components/search/searchTop.vue";
export default {
  setup() {
    const state = reactive({
      hotList: [],
    });
    onMounted(async () => {
      let res = await getHotMusic();
      state.hotList = res.data.data;
      // console.log(state.hotList);
    });
    return { state };
  },
  components: {
    searchTop,
  },
};
</script>

<style lang='less' scoped>
</style>