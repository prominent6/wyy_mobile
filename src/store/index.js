import { createStore } from "vuex";

import { getMusicLyric } from "@/request/api/item.js";
export default createStore({
  state: {
    //播放列表
    playList: [
      {
        //设置默认值
        al: {
          id: 146203803,
          name: "可",
          pic: 109951167527804380,
          picUrl:
            "https://p1.music.126.net/71lWKKX2Lv2PTFJpy2mVUg==/109951167527804392.jpg",
          pic_str: "109951167527804392",
        },
        id: 1954420092,
        name: "可",
        ar: [
          {
            name: "薛之谦 张靓颖",
          },
        ],
      },
    ],
    playListIndex: 0, //默认下标为0
    isbtnShow: true, //暂停按钮的显示
    detailShow: false, //歌曲详情页的显示
    lyricList: {}, //歌词
    currentTime: 0, //当前播放到的地方
    duration: 0, //歌曲总时长
    commentShow: false, //评论区显示
    resultShow: false, //搜索结果的显示
  },
  getters: {},
  //state的值只能通过mutation改变
  mutations: {
    updateIsbtnShow: function (state, value) {
      state.isbtnShow = value;
    },
    //直接更新
    updatePlayList: function (state, value) {
      state.playList = value;
      // console.log(state.playList);
    },
    //加在末尾
    pushPlayList: function (state, value) {
      state.playList.push(value);
    },
    updatePlayListIndex: function (state, value) {
      state.playListIndex = value;
    },
    updateDetailShow: function (state) {
      state.detailShow = !state.detailShow;
    },
    updateLyricList: function (state, value) {
      state.lyricList = value;
    },
    updateCurrentTime: function (state, value) {
      // console.log(state.currentTime);
      state.currentTime = value;
    },
    updateDuration: function (state, value) {
      state.duration = value;
    },
    updateCommentShow: function (state) {
      state.commentShow = !state.commentShow;
    },
    updateResultShow: function (state) {
      state.resultShow = !state.resultShow;
    },
  },
  actions: {
    getLyric: async function (context, value) {
      let res = await getMusicLyric(value);
      // console.log(res);
      context.commit("updateLyricList", res.data.lrc);
    },
  },
  modules: {},
});
