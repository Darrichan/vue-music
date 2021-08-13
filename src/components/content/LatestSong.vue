<template>
  <div class="songlist">
    <Title :title="'最新音乐'" />
    <ul class="RecommendSong">
      <li :key="index"
          @click="playSong(item.id)"
          v-for="(item,index) in latestSongList">
        <!-- index索引 -->
        <span style="margin-left:4%">{{index+1}}</span>
        <!-- 歌曲封面 -->
        <img :src="item.picUrl+'?param=100y100'"
             alt=""
             class="img-sm">
        <!-- 歌手名称 -->
        <div style="display:inline-block">
          <div>{{item.name}}</div>
          <div style="margin-top:15px">{{item.song.artists[0].name}}</div>
        </div>
        <!-- 专辑名称 -->
        <div style="display:inline-block"
             class="album">
          <div>《{{item.song.album.name}}》</div>
        </div>
        <!-- 歌曲时长 -->
        <div class="time">
          <div>{{item.song.mMusic.playTime | GetTime()}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
// 导入标题分割
import Title from '../common/Title.vue'


// 导入时间过滤函数
import { filtrationTime } from '../../assets/js/songTime'
// 音乐相关的请求
import { playMisic } from '../../request/music'
export default {
  components: { Title },
  props: ['latestSongList'],
  methods: {
    // 播放音乐
    playSong (id) {
      playMisic(id).then(musicdata => {
        // 通过事件总线把歌曲数据传给跟组件
        this.$bus.$emit('getMusicMessage', { musicdata, id })
        console.log(musicdata)
        let newsData = {
          picUrl: musicdata.picUrl,
          Singer: musicdata.Singer,
          picname: musicdata.picname
        }
        // this.$router.push({name:'SongDetails',query: {id:id,data:newsData}})
      });
    },
  },

  filters: {
    GetTime (val) {
      return filtrationTime(val);
    },
    GetPlayCount (val) {
      return val >= 10000 ? Math.floor(val / 10000) + 'w' : val
    }
  },
}
</script>

<style lang="less">
.songlist{
  width: 80%;
  margin-left: 10%;
}
.RecommendSong {
  display: flex;
  flex-flow: wrap;
  padding: 0;
  justify-content: space-between;
}
.RecommendSong li {
  position: relative;
  float: left;
  width: 49%;
  margin-top: 16px;
  height: 80px;
  background-color: rgb(250, 250, 250);
  border-radius: 3px;
  font-size: 14px;
  box-shadow: 0px 10px 40px 10px rgba(0, 0, 0, 0.1);
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
.RecommendSong li:hover {
  color: rgb(163, 163, 163);
  background-color: rgb(202, 200, 200);
}
.img-sm {
  width: 9%;
  margin: 0 35px;
  border-radius: 3px;
}
</style>
