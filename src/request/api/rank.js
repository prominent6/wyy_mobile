import service from "..";
//获取所有榜单内容摘要
export function getRankAbout() {
  return service({
    method: "GET",
    url: "/toplist/detail",
  });
}
