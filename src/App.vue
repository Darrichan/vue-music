<template>
  <div id="app">
    <Navigation />
    <router-view />
    <vueplayer :music="audio[0]"
               :showLrc="true"
               :autoplay="false"
               id="play"
               class="Aplayer" />
    <Footer />
  </div>
</template>

<script>
// 导航栏组件导入
import Navigation from './components/common/Navigation.vue'
// 播放器组件导入
import vueplayer from 'vue-aplayer'
// Footer组件导入
import Footer from './components/common/Footer.vue'
export default {
  data () {
    return {
      audio: [{}]
    }
  },
  components: {
    Navigation, Footer, vueplayer
  },
  created () {
    // 接收音乐数据
    this.$bus.$on('getMusicMessage', (val) => {
      //  获取得到的音乐数据
      var data = {
        src: val.musicdata.playUrl,
        title: val.musicdata.picname,
        artist: val.musicdata.Singer,
        pic: val.musicdata.picUrl,
        lrc: val.musicdata.lyric,
      }
      // 保存音乐数据对象 和 当前播放歌曲Id
      this.musicdata = data;
      this.SongId = val.id

      // 把接收到的音乐数据添加到audio[0]中  令播放组件获取数据后进入待播放
      this.$set(this.audio, 0, data);
      console.log(this.audio[0])
    })
  },
}
</script>

<style>
.Aplayer {
  display: block;
  width: 100%;
  position: fixed !important;
  bottom: 0;
}
</style>
