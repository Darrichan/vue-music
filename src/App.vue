<template>
  <div id="app">
    <Navigation />
    <keep-alive exclude="search,SongDetails,rankingdetails,MVdetails,SingerDetails,user">
      <router-view v-if="isRouterShow" />
    </keep-alive>

    <Footer />
    <div class="Aplayer">
      <div class="kailong"></div>
      <vueplayer :music="audio[0]"
                 :showLrc="true"
                 :autoplay="true"
                 id="play" />
    </div>

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
  provide () {
    return {
      reload: this.reload,//把刷新方法传给子组件
    }
  },
  data () {
    return {
      screenWidth: document.body.clientWidth, // 屏幕宽度
      isRouterShow: true,
      show2: true,
      audio: [
        {
          src: "http://m801.music.126.net/20210811194733/4a19c1532c1fc25eb3ebca7c3b7a41d3/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/10238788214/250c/6df7/1ab8/e9f5b962dafb39ce2f03d2222c80ba14.mp3",
          pic: "https://p1.music.126.net/KS0TddHKX8c3atG3CkmdUw==/109951166264542938.jpg",
          title: "你值得更好的",
          artist: "张杰",
          lrc: "[00:00.000] 作词 : 小寒\n[00:01.000] 作曲 : 黄韵仁\n[00:02.35]OP：Funkie Monkies Publishing Pte Ltd (Warner Chappell Music, Hong Kong Limited Taiwan Branch)\n[00:03.54]SP：Warner Chappell Music Publishing Agency (Beijing) Ltd.\n[00:05.22]\n[00:18.84]眼里塞满了谅解  神情畏怯\n[00:26.99]说他的心在淌血  语气哽咽\n[00:33.50]对不起得妥协  忍痛向你道别\n[00:43.40]而你却无从了解  这种体贴\n[00:51.92]但他的心坚如铁  很难跨越\n[00:58.46]应该恨的感觉  他硬向你索取感谢\n[01:06.81]如何完结  一切\n[01:14.74]什么  他没爱你的资格\n[01:19.08]什么  不愿你委屈配合\n[01:23.15]规则  是你无权选择\n[01:26.58]什么  你值得更好的\n[01:31.33]怎么  他不为你变值得\n[01:35.49]奈何  他倒也是智者\n[01:40.17]真的  你值得更快乐\n[01:47.50]\n[01:54.37]仁慈它不会纾解  痛和幻灭\n[02:02.16]让你还指望重写  爱与喜悦\n[02:08.57]幻想还能衔接  每个他还爱你细节\n[02:16.95]如何坚决  断裂\n[02:25.03]什么  他没爱你的资格\n[02:29.29]什么  不愿你委屈配合\n[02:33.37]规则  是你无权选择\n[02:36.93]什么  你值得更好的\n[02:41.72]怎么  他不为你变值得\n[02:45.87]奈何  他倒也是智者\n[02:50.48]真的  你值得更快乐  快乐\n[03:05.92]\n[03:10.72]既然他允许走到这\n[03:14.39]善良就是互不牵扯\n[03:18.46]那出于不舍  非爱不可\n[03:22.71]只是空壳\n[03:26.03]什么  他没爱你的资格\n[03:30.21]什么  不愿你委屈配合\n[03:34.32]规则  是你也能选择\n[03:37.76]怎么都值得更好的\n[03:42.50]怎么  他不为你变值得\n[03:46.92]为何  不先爱自己呢\n[03:51.39]真的  你值得更快乐  快乐\n[04:10.06]\n[04:11.366] 制作 Producer：黄韵仁 Eric Ng/张杰 Jason Zhang\n[04:12.726] 编曲/吉他/键盘/贝斯/和声编写 Arranger/Guitars/Keyboards/Bass/\n[04:14.086] Backup Vocals Arrangement：黄韵仁 Eric Ng（Funkie Monkies Productions）\n[04:15.446] 鼓 Drums：Adam Shah\n[04:16.806] 和声 Backing Vocals：黄韵仁 Eric Ng\n[04:18.166] 录音师@录音室 Recording Engineer@Recording Studio \n[04:19.526] 鼓 Drums：吴周烁 Joshua Goh@The Songwriter Music College 亚洲音乐学院\n[04:20.886] 人声 Vocals：利伟明 Lee Wai Ming@雅旺录音室 Avon Recording Studios\n[04:22.246] 其它乐器 All Other Instruments：黄韵仁 Eric Ng@齐天音乐录音室 Funkie Monkies Recording Studio \n[04:23.606] 混音师 Mixing Engineer：沈文钏 Darren Sim@齐天音乐录音室 Funkie Monkies Recording Studio \n"
        }]
    }
  },
  watch: {
    screenWidth () {
      // 1206
      if (this.screenWidth < 1206) {
        alert('请使用宽度大于1206px的pc端访问本网站！！');
      }
    }
  },
  mounted () {
    window.onresize = () => {
      return (() => {
        this.screenWidth = document.body.clientWidth
      })()
    }
  },
  components: {
    Navigation, Footer, vueplayer,
  },
  methods: {
    reload () {
      this.isRouterShow = false
      this.$nextTick(() => {
        this.isRouterShow = true
        // Vue.nextTick()  在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
      })

    },
  },
  created () {
    // 接收音乐数据
    this.$bus.$on('getMusicMessage', (val) => {
      console.log(val);
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
    })
  },
}
</script>

<style>
.Aplayer {
  transition-duration: 1s;

  display: block;
  width: 100%;
  position: fixed !important;
  bottom: -95px;
}
.Aplayer:hover {
  transition-duration: 0.5s;
  bottom: -5px;
}
.kailong {
  width: 0;
  height: 0;
  margin: 0 auto;
  border-right: 15px solid transparent;
  border-left: 15px solid transparent;
  border-bottom: 15px solid #41b883;
  cursor: pointer;
}
</style>
