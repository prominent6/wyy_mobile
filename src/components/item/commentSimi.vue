<template>
  <div class="commentSimi">
    <div class="bar">
      <div class="barL">
        <svg class="icon" aria-hidden="true" @click="$router.push('/')">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <span>喜欢这首歌的人也听</span>
      </div>
      <div class="barR">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang1"></use>
        </svg>
        <span class="bofang"
          >一键收听
          <span></span>
        </span>
      </div>
    </div>
    <div class="simiContent">
      <div class="simiItem" v-for="item in simiList">
        <div class="simiL">
          <img :src="item.album.picUrl" alt="" />
          <div class="names">
            <p class="Stitle">{{ item.name }}</p>
            <span class="Sauthor" v-for="item1 in item.artists">{{
              item1.name
            }}</span>
          </div>
        </div>
        <div class="simiR">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-bofang1"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["simiList"],
};
</script>

<style lang='less' scoped>
.commentSimi {
  padding: 0.3rem;
  .bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .barL {
      display: flex;
      align-items: center;
      .icon {
        margin-right: 0.1rem;
      }
    }
    .barR {
      display: flex;
      align-items: center;
      .icon {
        margin-right: 0.1rem;
      }
    }
  }
  .simiContent {
    .simiItem {
      margin: 0.3rem 0.1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .simiL {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        img {
          width: 1rem;
          height: 1rem;
          border-radius: 0.1rem;
        }
        .names {
          margin-left: 0.2rem;
          .Stitle {
            font-size: 0.37rem;
            color: rgba(255, 255, 255, 0.8);
          }
          .Sauthor {
            font-size: 0.24rem;
            color: #999;
          }
        }
      }
      .simiR {
        .icon {
          fill: #999;
        }
      }
    }
  }
}
</style>