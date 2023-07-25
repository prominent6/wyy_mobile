<template>
  <div class="search">
    <!-- 搜索框以及历史搜索以及热门搜索 -->
    <div class="choose1" v-show="!resultShow">
      <div class="searchY">
        <div class="searchTop">
          <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
            <use xlink:href="#icon-zuojiantou"></use>
          </svg>
          <input
            type="text"
            placeholder="王靖雯"
            v-model="searchKey"
            @keydown.enter="
              enterKey();
              updateResultShow();
            "
          />
          <svg
            class="icon"
            aria-hidden="true"
            @click="
              enterKey();
              updateResultShow();
            "
          >
            <use xlink:href="#icon-sousuoxiao"></use>
          </svg>
        </div>
        <div class="search-history">
          <div class="bar">
            <div>历史</div>
            <svg class="icon" aria-hidden="true" @click="delHistory">
              <use xlink:href="#icon-lajitong"></use>
            </svg>
          </div>
          <div class="content">
            <!-- 点击历史记录也可以搜索 -->
            <span
              v-for="item in keyWordList"
              :key="item"
              @click="
                searchHistory(item);
                updateResultShow();
              "
              >{{ item }}</span
            >
          </div>
        </div>
        <div class="searchH">
          <div class="hotTop">
            <div class="title">热搜榜</div>
            <div class="hotP">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bofangqi-bofang"></use>
              </svg>
              <span>播放</span>
            </div>
          </div>
          <div class="hotMusics">
            <div class="item" v-for="(item, index) in hotList" :key="index">
              <div class="itemListL">
                <span class="lifeSpan">{{ index + 1 }}</span>
                <div class="names">
                  <p class="musicTitle">{{ item.searchWord }}</p>
                  <span class="content">{{ item.content }} </span>
                </div>
              </div>
              <div class="itemListR">
                {{ item.score }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 搜索框以及搜索结果 -->
    <div class="choose2" v-show="resultShow">
      <div class="searchDetail">
        <searchDetail
          :searchList="searchList"
          :searchKey="searchKey"
          :resultShow="resultShow"
        />
      </div>
    </div>
    <!-- 弹出框显示查找结果 -->
    <!-- <van-popup
      v-model:show="sdShow"
      position="top"
      :style="{ height: '90%', width: '100%' }"
    >
      <searchDetail :searchList="searchList" :searchKey="searchKey" />
    </van-popup> -->
  </div>
</template>

<script>
import { getSearchMusic } from "@/request/api/search.js";
import { mapMutations, mapState } from "vuex";
import searchDetail from "@/components/search/searchDetail.vue";

export default {
  data() {
    return {
      keyWordList: [], //历史搜索
      searchKey: "", //获得正在输入
      searchList: [], //搜索列表,接收搜索到的歌曲
    };
  },
  computed: {
    ...mapState(["resultShow"]),
  },
  mounted() {
    this.keyWordList = JSON.parse(localStorage.getItem("keyWordList")) || []; //空值处理
  },
  methods: {
    enterKey: async function () {
      if (this.searchKey != "") {
        this.keyWordList.unshift(this.searchKey);
      }
      //去重
      this.keyWordList = [...new Set(this.keyWordList)];
      //限制长度
      if (this.keyWordList.length > 10) {
        this.keyWordList.pop();
      }
      //本地存储
      localStorage.setItem("keyWordList", JSON.stringify(this.keyWordList));
      //获取搜索信息
      let res = await getSearchMusic(this.searchKey);
      this.searchList = res.data.result.songs;
      // console.log(this.searchList);
    },
    delHistory: function () {
      localStorage.removeItem("keyWordList");
      this.keyWordList = [];
    },
    // 点击历史记录也可以搜索
    searchHistory: async function (item) {
      let res = await getSearchMusic(item);
      console.log(res);
      this.searchList = res.data.result.songs;
      this.searchKey = item;
    },
    ...mapMutations(["updateResultShow"]),
  },
  props: ["hotList"],
  components: {
    searchDetail,
  },
};
</script>

<style lang='less' scoped>
.searchY {
  .searchTop {
    background-color: #fff;
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    input {
      border: none;
      border-bottom: 1px solid #999;
      width: 80%;
      text-indent: 5px;
      font-size: 22px;
    }
    .icon {
      width: 20px;
      height: 20px;
    }
  }
  .search-history {
    margin-top: 10px;
    width: 100%;
    .bar {
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
      .icon {
        width: 28px;
        height: 28px;
      }
    }
    .content {
      span {
        display: inline-block;
        padding: 0.1rem 0.2rem;
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 0.4rem;
        margin: 5px;
      }
    }
  }
  .searchH {
    padding: 0 0.3rem;
    border-radius: 0.2rem;
    margin: 0.3rem 0.2rem;
    width: 95%;
    height: 8rem;
    background-color: #fff;
    overflow: scroll;
    .hotTop {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 12%;
      border-bottom: 1px solid #ccc;
      .title {
        font-weight: 600;
      }
      .hotP {
        display: flex;
        align-items: center;
        border: 1px solid #ccc;
        border-radius: 0.3rem;
        padding: 0 0.1rem;
        font-size: 0.25rem;
        color: #999;
        .icon {
          width: 0.3rem;
        }
      }
    }
    .hotMusics {
      height: 1rem;
      .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 15px 0;
        padding: 0.1rem 0;
        .itemListL {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .lifeSpan {
            width: 0.5rem;
            color: #999;
            font-size: 20px;
          }
          .names {
            margin-left: 0.1rem;

            .musicTitle {
              font-size: 15px;
            }
            .content {
              font-size: 5px;
              color: #999;
            }
          }
        }
        .itemListR {
          font-size: 15px;
          color: #ccc;
        }
      }
    }
  }
}
</style>