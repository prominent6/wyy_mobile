<template>
  <!-- 推荐歌单 -->
  <div class="item">
    <!-- 歌单介绍部分 -->
    <itemMusicTop :playlist="state.playlist" />
    <!-- 歌单歌曲部分 -->
    <itemMusicList :itemList="state.itemList" />
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { onMounted, reactive } from "vue";
import { getMusicItemList, getItemList } from "@/request/api/item.js";
import itemMusicTop from "@/components/item/itemMusicTop.vue";
import itemMusicList from "@/components/item/itemMusicList.vue";

export default {
  // 获取参数
  setup() {
    const state = reactive({
      playlist: {}, //歌单的介绍数据
      itemList: [], //歌单的歌曲
    });
    onMounted(async () => {
      //id是query的属性
      let id = useRoute().query.id;
      //获取歌单介绍数据
      let res = await getMusicItemList(id);
      // console.log(res.data.playlist);
      state.playlist = res.data.playlist;
      //获取歌单的歌曲
      let result = await getItemList(id);
      // console.log(result);
      state.itemList = result.data.songs;
    });
    return { state };
  },
  components: {
    itemMusicTop,
    itemMusicList,
  },
};
</script>

<style>
</style>