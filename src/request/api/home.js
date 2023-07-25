import service from "..";
//获取首页轮播图的数据
export function getBanner() {
  return service({
    method: "GET",
    url: "/banner?type=2",
  });
}
//获取推荐歌单
export function getMusicList() {
  return service({
    method: "GET",
    url: "/personalized?limit=6",
  });
}
