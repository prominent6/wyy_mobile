# 相关
1. flex布局+vue-cli脚手架搭建项目+Router+Vuex+Less
2. plugins中封装了插件的引用和注册
3. request中index.js通过创建axios实例来对axios进行封装
# 首页HomeView.vue  "/" 
## 首页导航栏 <topNav />

1. 静态页面布局
2. 路由跳转 @click="$router.push('**./search**')
## 轮播图部分 <swiperTop />

1. 获取首页轮播图getBanner()："/banner?type=2"
-   接收：images: []，使用： image.pic
2. vant组件——Swipe-懒加载
## 分类功能部分 <iconList />

1. 静态页面布局
2. 路由跳转 @click="$router.push('**./rank**')
## 推荐歌单部分 <musicList />

1. 获取推荐歌单getMusicList()："/personalized?limit=6"
- 接收：musicList: []
- 使用：item.picUrl、item.playCount、item.name
2. vant组件——Swipe-自定义滑块大小
3. 带参数的路由跳转：<router-link :to="{ path: '**/itemMusic**', query: { id: item.id } }"></router-link>
- 传递参数为选择歌单的id
# 歌单详情页ItemMusic.vue "/itemMusic"
## 详情页歌单介绍部分 <itemMusicTop />

1. 获取歌单详情页介绍数据getMusicItemList()：`/playlist/detail?id=${data}`
- 接收：playlist: {}，
- 使用： playlist.coverImgUrl、playlist.playCount、playlist.name、playlist.subscribedCount、playlist.commentCount、playlist.trackCount
2. 路由跳转：@click="$router.go(-1)  <!-- 返回上一页 -->
## 详情页歌单歌曲 <itemMusicList />

1. 获取歌单歌曲数据getItemList()：`/playlist/track/all?id=${data}&limit=20&offset=0`
- 接收：itemList: []，
- 使用： itemList.length、item.name、item1.name、item.mv
2. 方法：
- playMusic —— updatePlayList、updatePlayListIndex 点击歌单里的歌曲将该歌单所有歌曲加入到播放列表 （可以切歌）
# 底部播放区域 全局组件 <footerMusic / >

1. 公共数据的使用：
- playList[playListIndex].al.picUrl、playList[playListIndex].name、isbtnShow、detailShow 
- updateIsbtnShow、updateDetailShow、updateCurrentTime、updateDuration
2. 方法：
- play //按钮播放与暂停音乐 、
- addDuration //更新歌曲总时长
- updateTime //更新现在的时间
3. 监听变化自动播放 playListIndex playList
4. vant组件——Popup弹出层 —— detailShow ——>**歌曲详情页**
- 传值：:**musicList**="playList[playListIndex]" :play="play" :isbtnShow="isbtnShow"   //需要相关联 :addDuration="addDuration"
# 歌曲详情页<musicDetail />

1. Vue3Marquee跑马灯
2. musicList.al.picUrl、musicList.name、item.name、item.lrc
3. css3实现磁盘和磁针的动画效果 ，如
- transform: rotate(0deg)
- transition: all 2s
- animation: rotate_ar 10s linear infinite
- animation-play-state: running
- 这些动画效果通过v-show、:class="{ needle_active: !isbtnShow } 来实现播放或者停止
4. 磁盘与歌词间的切换 @click="isLyricShow = true/false"
5. 带参数的路由跳转：<router-link :to="{ path: '**/comment/simi**', query: { musicList: JSON.stringify(playList[playListIndex]) }"></router-link>  //关于传参为对象的情况
6. vant组件——Popup弹出层 ——  commentShow ——>**评论区页**
- 传参：:musicList="playList[playListIndex]"
7. 正则表达式获取歌词
8. 使用动态的class以及计算属性实现对歌词样式的突出显示

:class="{active: currentTime * 1000 >= item.time && currentTime * 1000 < item.aft,}"

9. 实现进度条：v-model="currentTime"双向绑定 vuex以及定时器
10. goPlay方法切换上一首下一首
11. 使用watch监听和ref实现歌词滚动效果 —— scrollTop与offsetTop间隔固定
# 相似歌曲页 <commentSimi />
获取数据展示数据
# 评论区页 <commentTop / >
获取数据展示数据

# 搜索页面 Search.vue "/search"
## 搜索框以及历史搜索以及热搜<searchTop />

1. 搜索框的值v-model="searchKey"双向绑定
2. 使用localStorage进行历史记录的保存，使用ES6的Set对数据进行去重，并对搜索历史长度进行限制，删除旧的。
3. 删除全部历史
4. 获得数据和展示数据：热搜榜
## 搜索结果 <searchDetail />

1. 没有熟悉组件间的传参跳转（当时组件拆多了，就不知道怎么搞），就用的弹出框，结果全局组件就被遮罩层搞没了，点击不了。后面用的v-show+只分为两个页面来实现。
2. 搜索出来的结果进行点击可以获取相关数据并自动播放 
# 排行榜页面 Rank.vue "/rank"
获取展示数据
