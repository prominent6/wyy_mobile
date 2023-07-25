import service from "..";
//获取歌单详情页介绍数据
export function getMusicItemList(data) {
  return service({
    method: "GET",
    url: `/playlist/detail?id=${data}`,
  });
}
//获取歌单歌曲数据
export function getItemList(data) {
  return service({
    method: "GET",
    url: `/playlist/track/all?id=${data}&limit=20&offset=0`,
  });
}

//获取歌单的歌词  /lyric?id=33894312
export function getMusicLyric(data) {
  return service({
    method: "GET",
    url: `/lyric?id=${data}`,
  });
}

//获取歌曲的评论
export function getMusicComment(data) {
  return service({
    method: "GET",
    url: `/comment/hot?id=${data}&type=0`,
  });
}

//获取歌曲的相似音乐
export function getMusicSimi(data) {
  return service({
    method: "GET",
    url: `/simi/song?id=${data}`,
  });
}

//获取音乐url
export function getMusicUrl(data) {
  return service({
    method: "GET",
    url: `/song/url?id=${data}`,
  });
}
