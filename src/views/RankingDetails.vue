<template>
  <div class="SingerDetails"
       v-cloak
       style="width:80%;margin:0 auto;">

    <!-- mian -->
    <el-row :gutter="10"
            class="mian">

      <!-- 左侧 -->
      <el-col :xs="4"
              :sm="6"
              :md="8"
              :lg="14"
              :xl="14"
              class="rankLeftBox">
        <div class="grid-content rankLeft">
          <div class="main-left">
            <div class="top">
              <!-- 图片 -->
              <img class="floatLeft"
                   :src="rankingPic+'?param=100y100'"
                   alt="">
              <!-- 歌单描述 -->
              <div class="top-description floatLeft"
                   style="width:50%; ">
                <div class="title">{{rankingname}}</div>
                <div style="auto;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 5;overflow: hidden;">
                  <p>
                    {{rankingdescription}}
                  </p>
                </div>

              </div>
            </div>

            <!-- 播放音乐 -->
            <play-song :SearchSongData="Songcontent.slice(0,10)"
                       style="margin-top:10%"></play-song>

          </div>
        </div>
      </el-col>
      <!-- 右侧 -->
      <el-col :xs="4"
              :sm="6"
              :md="8"
              :lg="9">
        <div class="grid-content rankRight">
          <div class="main-right">
            <div class="top">
              <div class="top-title">
                <span>|</span>
                <strong>喜欢这个歌单的人</strong>
              </div>
              <ul class="loveThat">
                <li :key="index"
                    v-for="(item,index) in getSongCollectorpic">
                  <img class="loveThatPic"
                       :src="item.avatarUrl+'?param=40y40'"
                       alt="">
                </li>
              </ul>

            </div>
            <div class="bottom"
                 style="margin-top:5%;">
              <!-- 相关推荐 -->
              <div class="bottomAabout">
                <div class="bottomAaboutTitle">
                  <span>|</span>
                  <strong>相关推荐</strong>
                </div>
                <ul class="bottomAaboutList">
                  <li :key="index"
                      v-for="(item,index) in playlists"
                      @click="gotolikeness(item.id)"
                      style="cursor:pointer;" class="mouseHover">
                    <img :src="item.coverImgUrl+'?param=100y100'"
                         alt="">
                    <div class="dec">
                      <strong>{{item.name}}</strong>
                      <div>{{item.creator.nickname}}</div>
                    </div>
                  </li>

                </ul>
              </div>
            </div>
          </div>
        </div>
      </el-col>

    </el-row>

  </div>
</template>

<script>
import PlaySong from '../components/common/PlaySong.vue'
import { GetCommonTime } from '../assets/js/songTime'
export default {
  inject: ['reload'],
  components: {
    PlaySong
  },
  filters: {
    updateTime (val) {
      return GetCommonTime(val)
    }
  },
  name: 'rankingdetails',

  data () {
    return {

      // 接受动态路由传来的参数
      rankingId: this.$route.params.id,

      // 榜单名称
      rankingname: '',
      // 榜单描述
      rankingdescription: '',
      // 榜单图片
      rankingPic: '',
      // 榜单发布者头像
      rankingavatarUrl: '',
      // 昵称
      nickname: '',
      // 更新时间
      updateTime: '',

      // 收藏这个歌单的人
      getSongCollectorpic: [],

      // 歌单详细内容
      Songcontent: [],

      // 相关歌单推荐
      playlists: [],

    };
  },


  methods: {

    // 获取歌单描述
    async getSongDetails () {
      const result = await this.$http.get("/playlist/detail?id=" + this.rankingId);
      if (result.status !== 200) {
        return this.$message.error("获取失败！");
      }
      this.rankingname = result.data.playlist.name
      this.rankingdescription = result.data.playlist.description
      this.rankingPic = result.data.playlist.coverImgUrl
      this.rankingavatarUrl = result.data.playlist.creator.avatarUrl
      this.nickname = result.data.playlist.creator.nickname
      this.updateTime = result.data.playlist.updateTime
    },

    // 获取歌单收藏者
    async getSongCollector () {
      const result = await this.$http.get("/playlist/subscribers?id=" + this.rankingId + "&limit=27");
      if (result.status !== 200) {
        return this.$message.error("获取失败！");
      }
      this.getSongCollectorpic = result.data.subscribers;
    },

    // 获取歌单内容
    async getSongcontent () {
      const result = await this.$http.get("/playlist/detail?id=" + this.rankingId);
      if (result.status !== 200) {
        return this.$message.error("获取失败！");
      }
      this.Songcontent = result.data.playlist.tracks;
    },

    // 播放歌曲
    playMisic (id) {
      playMisic(id).then(musicdata => {
        this.$bus.$emit('getMusicMessage', musicdata)
        this.$router.push({ name: 'SongDetails', query: { id: id, data: musicdata } })
      });
    },

    // 获取相关歌单  likeness
    async getSongLikeness () {
      const result = await this.$http.get("/related/playlist?id=" + this.rankingId);
      this.playlists = result.data.playlists
    },

    // 点击相关推荐
    gotolikeness (id) {
      this.$router.push("/rankingdetails/" + id);
      // 重新渲染当前组件
      this.reload()
    }


  },
  // 生命周期函数  页面刷新完成时调用
  mounted () {
    this.getSongDetails();
    this.getSongcontent();
    this.getSongLikeness();
    this.getSongCollector();
  },
};
</script>
<style lang="less" scoped>
[v-cloak] {
  display: none !important;
}

// 导航栏
.homenav {
  padding: 8px 0;
  /*flex 布局*/
  display: flex;
  /*实现垂直居中*/
  align-items: center;
  position: relative;
  margin-bottom: 10px;
}
.mouseHover:hover{
  color:#41b883
}
.navigation li {
  padding: 0 20px;
  font-size: 14px;
}

.logo img {
  width: 220px;
}
.floatLeft {
  float: left;
  // 鼠标小手
  cursor: pointer;
  .reddot {
    width: 5px;
    height: 5px;
    background: red;
    border-radius: 50%;
    margin: 5px auto;
  }
}

.SearchAndLogin {
  position: absolute;
  font-size: 14px;
  right: 39px;
  // 居中
  top: 50%;
  transform: translate(0, -50%);
}

.grid-content .main-right,
.grid-content .main-left {
  width: 100%;
  box-shadow: 3px 25px 35px 3px rgba(233, 232, 232, 0.5);
  margin-top: 5px;
}
.main-left {
  border-radius: 10px;
}

// 左上
.main-left .top {
  width: 100%;
  padding: 20px;
  img {
    margin-right: 25px;
    border-radius: 10px;
    box-shadow: 6px 6px 3px -1px rgba(37, 37, 37, 0.3);
  }
  .top-description {
    font-size: 14px;
    .title {
      font-size: 25px;
      font-weight: 600;
    }
    //  里面有小图片和相关描述
    .smbox {
      /*flex 布局*/
      display: flex;
      /*实现垂直居中*/
      align-items: center;
      span {
        margin: 0 10px;
      }
      img {
        width: 30px;
        border-radius: 50%;
        margin: 10px;
      }
    }
  }
}

// 右上
.main-right .top {
  padding: 10px;
  width: 100%;
  border-radius: 10px;
  //  长宽定死
  box-sizing: border-box;
  .top-title {
    span {
      color: red;
      font-weight: 600;
      margin-right: 10px;
    }
    margin-bottom: 5px;
  }
  .loveThat {
    display: flex;
    flex-wrap: wrap;
    li {
      margin: 4px;
      .loveThatPic {
        width: 40px;
        border-radius: 5px;
      }
    }
  }
}
// 右下 -> 相关推荐
.main-right .bottom {
  margin-top: 15px;
  width: 100%;
  border-radius: 10px;
  padding: 10px;
  //  长宽定死
  box-sizing: border-box;
  .bottomAaboutTitle {
    span {
      color: red;
      font-weight: 600;
      margin-right: 10px;
    }
    margin-bottom: 5px;
  }
  .bottomAaboutList {
    li {
      margin: 15px 0;
      /*flex 布局*/
      display: flex;
      /*实现垂直居中*/
      align-items: center;
    }
    padding: 0 8px;
    img {
      width: 70px;
      border-radius: 5px;
      margin-right: 15px;
    }
    .dec {
      display: inline-block;
      div {
        color: rgb(126, 126, 126);
        margin-top: 15px;
      }
    }
  }
}

// 按钮样式
.el-button.is-round {
  border-radius: 20px;
  padding: 6px 9px;
}

.el-button--danger {
  color: #fff;
  background-color: rgb(250, 40, 0);
  border-color: #f56c6c;
}
</style>
