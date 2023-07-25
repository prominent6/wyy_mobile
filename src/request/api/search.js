import service from "..";
//搜索
export function getSearchMusic(data) {
  return service({
    method: "GET",
    url: `/cloudsearch?keywords=${data}`,
  });
}
//获取热门搜索列表
export function getHotMusic() {
  return service({
    method: "GET",
    url: "/search/hot/detail",
  });
}
