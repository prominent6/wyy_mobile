<template>
  <div class="commentTop">
    <div class="commentBar">
      <svg class="icon" aria-hidden="true" @click="updateCommentShow">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <div>精彩评论</div>
    </div>
    <div class="commentC">
      <div class="commentItem" v-for="item in commentList">
        <div class="ciTop">
          <div class="ciL">
            <img :src="item.user.avatarUrl" alt="" />
            <div class="names">
              <p class="authorN">{{ item.user.nickname }}</p>
              <span class="time">{{ item.timeStr }}</span>
            </div>
          </div>
          <div class="ciR">
            <span class="num">{{ item.likedCount }}</span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-dianzan"></use>
            </svg>
          </div>
        </div>
        <div class="ciBt">{{ item.content }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMusicComment } from "@/request/api/item.js";

import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      commentList: [],
    };
  },
  computed: {
    ...mapState(["playListIndex", "playList", "commentShow"]),
  },
  mounted() {
    // console.log(this.musicList);
    this.getComment();
  },
  methods: {
    ...mapMutations(["updateCommentShow"]),
    getComment: async function () {
      // 获取歌单中歌曲的评论
      let comments = await getMusicComment(this.musicList.id);
      this.commentList = comments.data.hotComments;
      // console.log(comments.data.hotComments);
    },
  },
  props: ["musicList"],
};
</script>

<style lang='less' scoped>
.commentTop {
  padding: 0.2rem;
  .commentBar {
    display: flex;
    align-items: center;
    font-size: 0.4rem;
  }
  .commentC {
    overflow: scroll;
    .commentItem {
      margin-top: 0.3rem;

      .ciTop {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .ciL {
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          img {
            width: 0.8rem;
            height: 0.8rem;
            border-radius: 50%;
          }
          .names {
            margin-left: 0.2rem;
            color: #999;
            .authorN {
              font-size: 0.3rem;
            }
            .time {
              font-size: 0.24rem;
            }
          }
        }
        .ciR {
          display: flex;
          align-items: center;

          color: #999;
          .icon {
            fill: #999;
          }
        }
      }
      .ciBt {
        border-bottom: 1px solid #ccc;
        margin-left: 1rem;
        padding: 0.2rem 0;
      }
    }
  }
}
</style>