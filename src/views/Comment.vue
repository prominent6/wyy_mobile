<template>
  <div class="comment">
    <commentSimi :simiList="state.simiList" />
  </div>
</template>

<script>
import commentSimi from "@/components/item/commentSimi.vue";
import { reactive } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { getMusicSimi } from "@/request/api/item.js";
export default {
  setup() {
    const state = reactive({
      simiList: [], //相似歌曲
    });
    onMounted(async () => {
      let id = JSON.parse(useRoute().query.musicList).id;
      let res = await getMusicSimi(id);
      // console.log(res.data.playlist);
      state.simiList = res.data.songs;
      //   console.log(res.data.songs);
    });
    return { state };
  },
  components: {
    commentSimi,
  },
};
</script>

<style>
</style>