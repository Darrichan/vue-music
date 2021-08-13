<template>
  <div>
    <!-- 轮播图组件 -->
    <Carousel :banner="bannerList"
              style="width:80%;margin:0 auto;" />
    <song-list style="width:80%;margin:0 auto;" :SongListData="SongListData" />

    <!-- 最近新歌 -->
    <latest-song :latestSongList="latestSongList" />
  </div>
</template>

<script>
// 轮播图组件导入
import Carousel from '../components/content/Carousel .vue'
// 最近歌曲导入
import latestSong from '../components/content/LatestSong.vue'
// 推荐歌单导入
import songList from '../components/content/SongList.vue'
// home页面的请求
import { getBanner, getLatestSong, GetRecommendPlaylist } from '../request/home'
export default {
  components: {
    Carousel,
    latestSong, songList
  },
  data () {
    return {
      bannerList: [],
      latestSongList: [],
      SongListData: []
    }
  },
  methods: {
    getBanner () {
      getBanner().then(res => {
        this.bannerList = res.banners;
      })
    },
    getLatestSong () {
      getLatestSong().then(res => {
        this.latestSongList = res.result;
      })
    },
    GetRecommendPlaylist () {
      GetRecommendPlaylist(30).then(res => {
        this.SongListData = res.result;
      })
    }
  },
  // 生命周期函数加载轮播图
  mounted () {
    this.getBanner()
    this.getLatestSong()
    this.GetRecommendPlaylist()
  }
}
</script>
<style lang="less" scoped>
// 显示或隐藏
.hide {
  display: none;
}
.showIcon {
  display: inline-block;
  color: red;
}
.recommendTit {
  margin-top: 0;
}
.recommendBox {
  display: flex;
}
.RecommendSong li {
  position: relative;
  float: left;
  width: 47%;
  margin: 16px;
  height: 80px;
  background-color: rgb(250, 250, 250);
  border-radius: 3px;
  font-size: 14px;
  box-shadow: 0px 10px 40px 10px rgba(0, 0, 0, 0.1);
  // 鼠标小手
  cursor: pointer;
  /*flex 布局*/
  display: flex;
  /*实现垂直居中*/
  align-items: center;
  .album {
    position: absolute;
    right: 115px;
    font-size: 13px;
  }
  .time {
    position: absolute;
    right: 25px;
  }
}

.bj {
  width: 100%;
  margin: 0 0 35px 0 !important;
  margin-bottom: 10px;
  box-shadow: 0px 9px 48px 5px rgba(0, 0, 0, 0.1);
}
.extrusion {
  height: 10px;
}

// 控制歌单图片
.img-row {
  width: 75%;
  border-radius: 5px;
  box-shadow: 6px 6px 3px -1px rgba(37, 37, 37, 0.3);
}
.img-row-2 {
  height: 100%;
  margin-right: 10px;
}
.img-sm {
  width: 9%;
  margin: 0 35px;
  border-radius: 3px;
}
// 控制歌单图片下面的文字
.bg-purple div {
  font-size: 14px;
  width: 75%;
  // 强制两行
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; //以此类推，3行4行直接该数字就好啦
}

// 隐藏元素但依然占位
.visibilityBox {
  visibility: hidden;
}

.bg-purple[data-v-957c9522] {
  background: rgba(0, 0, 0, 0);
}
</style>
