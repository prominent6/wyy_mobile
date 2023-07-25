<template>
  <div class="topNav">
    <svg class="icon list" aria-hidden="true">
      <use xlink:href="#icon-31liebiao"></use>
    </svg>
    <a class="search" @click="$router.push('./search')">
      <div class="search-icon"></div>
      <svg class="icon sou" aria-hidden="true">
        <use xlink:href="#icon-sousuoxiao"></use>
      </svg>
    </a>
    <div class="search-login">登录</div>
  </div>
</template>

<script>
</script>

<style lang='less' scoped>
.topNav {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 0.88rem;
  padding: 0 0.2rem;
  background-color: brown;
  .list {
    height: 0.88rem;
  }
  .search {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    width: 80%;
    height: 0.6rem;
    background-color: #fff;
    border-radius: 0.3rem;
    margin-top: 0.14rem;

    .search-icon {
      width: 0.55rem;
      height: 0.4rem;
      background: url(./images/wyy-icon.jpg) no-repeat;
      background-size: 0.4rem 0.4rem;
      padding: 12px;
      border-right: 1px solid black;
    }
    .sou {
      width: 20px;
      height: 20px;
      color: #ccc;
    }
  }
  a:active {
    border: 1px solid black;
  }
  .search-login {
    height: 0.88rem;
    width: 0.8rem;
    line-height: 0.88rem;
    color: #fff;
    text-align: center;
  }
}
</style>