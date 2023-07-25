<template>
  <div class="rank">
    <rankTop :rankList="state.rankList" />
  </div>
</template>

<script>
import { getRankAbout } from "@/request/api/rank.js";
import rankTop from "@/components/rank/rankTop.vue";
import { reactive, onMounted } from "vue";
export default {
  setup() {
    const state = reactive({
      rankList: [],
    });
    onMounted(async () => {
      let res = await getRankAbout();
      //   console.log(res);
      state.rankList = res.data.list;
      console.log(res.data.list);
    });
    return { state };
  },
  components: {
    rankTop,
  },
};
</script>

<style>
</style>