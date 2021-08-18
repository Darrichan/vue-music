<template>
  <div style="width:80%;margin:0 auto;">
    <!-- 个人中心 -->
    <el-row :gutter="10"
            class="el-row01">
      <!-- 左侧部分 -->
      <el-col :xs="4"
              :sm="6"
              :md="8"
              :lg="9"
              :xl="10"
              class="personalLeft">
        <div class="grid-content">

          <!-- 左下 -> 个人信息 -->
          <div>
            <!-- 第一层 -->
            <div class="left01">
              <img class="headPic"
                   :src="avatarUrl"
                   alt="">
              <div style="width:100%;">
                <span style="display:block;padding-right:50%;">{{nickname}}</span>
                <div style="width:90%">
                  <span style="display:block;width:350px;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;">{{this.signature}}</span>

                </div>
              </div>
            </div>
          </div>
          <div class="grid-content UserlRight">
            <!-- 右 -->
            <div class="grid-content-right">
              <div class="grid-content-right-title"
                   style="border-bottom:6px solid #41b883">
                <span>|</span>
                <strong>我的歌单</strong>
              </div>
              <div class="mycover">
                <ul class="grid-content-right-ul">
                  <li :key="index"
                      v-for="(item,index) in playlist.slice(1,playlist.length)"
                      @click="gotolistdetails(item.id)">
                    <img :src="item.coverImgUrl"
                         alt="">
                    <div class="grid-content-right-li-title">{{item.name}}</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </el-col>

      <el-col :xs="4"
              :sm="6"
              :md="8"
              :lg="9"
              :xl="4"
              class="personalCenter"
              style="width:50%;padding:0;">
        <div class="grid-content UserlMain"
             style="width:100%;padding:0; margin-top:80px">
          <!-- 中间 -->
          <!-- 第一层-->
          <div class="main01"
               style="width:100%;padding:0;">
            <div class="main01-top"
                 style="width:100%;padding:0;display:flex;justify-content:space-between;border-bottom:5px solid #41b883;margin-bottom:0;">

              <strong style="display:block;"> <span style="display: inline-block;width: 5px;height: 100%;margin-right: 5px;color: #41b883;font-size: 14px;font-weight: 600;background: #41b883;">|</span>听歌排行</strong>
              <div>
                <span @click="changeStyle(2),changeflag2()"
                      :class="{addColor:changeSelectStyle == 2}"
                      style="cursor:pointer">所有时间</span>
                <span class="center"
                      style="margin-left:10px"></span>
                <span @click="changeStyle(0),changeflag1()"
                      :class="{addColor:changeSelectStyle == 0}"
                      style="cursor:pointer">最近一周</span>
              </div>

            </div>
          </div>
          <!-- 所有时间 -->
          <!-- 第二层 -->
          <div class="grid-content">
            <!-- 最近一周 -->
            <play-song v-show="(flag1)"
                       :SongData="recordWeek.slice(0,10)">
            </play-song>

            <!-- 所有时间 -->
            <play-song v-show="(flag2)"
                       :SongData="record">
            </play-song>
          </div>
        </div>
      </el-col>
      <el-col :xs="1"
              :sm="3"
              :md="4"
              :lg="3"
              :xl="3">
        <div class="grid-content adapt"></div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
import playSong from '../components/common/PlaySong.vue'
export default {
  components: {
    playSong
  },

  data () {
    return {
      UserId: this.$route.params.userdetailid,
      avatarUrl: '',
      nickname: '',
      signature: '',
      backgroundUrl: '',
      playlist: [],
      recordWeek: [],
      record: [],
      changeSelectStyle: -1,
      flag1: true,
      flag2: false,
    }
  },
  mounted () {
    this.getUserDetails();
    this.getUserPlaylist();
    this.getUserRecord();
    this.getUserRecordWeek();
  },
  methods: {
    // 获取用户播放记录(所有时间)
    async getUserRecord () {
      const result = await this.$http.get("/user/record?uid=" + this.UserId + "&type=0");
      // 用户播放记录
      this.record = result.data.allData
    },


    // 获取用户播放记录(最近一周)
    async getUserRecordWeek () {
      const result = await this.$http.get("/user/record?uid=" + this.UserId + "&type=1");
      // 用户播放记录
      this.recordWeek = result.data.weekData
    },
    // 改变样式的函数
    changeflag2 () {
      this.flag2 = true;
      this.flag1 = false;
    },
    changeflag1 () {
      this.flag2 = false;
      this.flag1 = true;
    },

    changeStyle (index) {
      this.changeSelectStyle = index;
    },
    // 歌单数据
    async getUserPlaylist () {
      const result = await this.$http.get("/user/playlist?uid=" + this.UserId);
      // 用户歌单
      this.playlist = result.data.playlist
    },
    // 歌单
    gotolistdetails (id) {
      this.$router.push("/rankingdetails/" + id);
      // this.$message.error('暂未开发歌单功能哦！')
    },
    // 获取用户详情
    async getUserDetails () {
      const result = await this.$http.get("/user/detail?uid=" + this.UserId);
      // 昵称
      this.nickname = result.data.profile.nickname
      // 用户头像
      this.avatarUrl = result.data.profile.avatarUrl
      // 个性签名
      this.signature = result.data.profile.signature
      // 背景图片
      this.backgroundUrl = result.data.profile.backgroundUrl
    },
  }

}
</script>

<style lang="less" scoped>
// 左
.personalLeft {
  margin-right: 5%;
  width: 30;
  padding: 0 !important;
  .dot {
    display: inline-block;
    width: 6px;
    height: 6px;
    background: #41b883;
    border-radius: 50%;
    margin-right: 10px;
    margin-bottom: 5px;
  }
  .grid-content-cover {
    width: 100%;
    img {
      width: 100%;
    }
  }
  // 头像
  .headPic {
    width: 50px;
  }
  .left01 {
    width: 100%;
    /*flex 布局*/
    display: flex;
    /*实现垂直居中*/
    align-items: center;
    padding: 5px 15px;
    span {
      margin-left: 5%;
    }
  }
  .left02 {
    box-sizing: border-box;
    padding: 0 15px;
  }
  .left03 {
    /*flex 布局*/
    display: flex;
    /*实现垂直居中*/
    align-items: center;
    /*实现水平居中*/
    justify-content: center;
    .left03-son {
      display: inline-block;
      padding: 30px;
    }
  }

  .left04 {
    /*flex 布局*/
    display: flex;
    /*实现垂直居中*/
    align-items: center;
    /*实现水平居中*/
    justify-content: center;
    padding-bottom: 15px;
    button {
      margin: 0 10px;
    }
  }
}
// 中间
.personalCneter {
  padding: 15px !important;
  .main01 {
    overflow: hidden;
    .main01-top {
      margin-bottom: 15px;
      .center {
        margin: 0 15px;
      }
      span {
        float: right;
      }
    }
    button {
      float: right;
    }
  }
  .main02 {
    ul {
      li {
        img {
          width: 50px;
        }
        span {
          display: inline-block;
        }
        .spanNum {
          width: 6%;
        }
        .spanSinger {
          width: 30%;
        }
        .spanAlbum {
          width: 30%;
        }
        .spanTime {
          width: 6%;
        }
      }
    }
  }
}

// 右
.grid-content-right {
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  margin-top: 10px;
  .grid-content-right-title {
    margin-bottom: 15px;
    span {
      display: inline-block;
      width: 5px;
      height: 100%;
      margin-right: 5px;
      color: #41b883;
      font-size: 14px;
      font-weight: 600;
      background: #41b883;
    }
  }
  .mycover {
    width: 100%;
    .grid-content-right-ul {
      width: 100%;
      padding: 0;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li {
        cursor: pointer;
        width: 40%;
        // margin-right: 20px;
        // margin-left: 8px;
        margin-bottom: 30px;
        border-radius: 5px;
        .grid-content-right-li-title {
          margin-top: 6px;
          font-size: 14px;
          font-weight: 600;
        }
        img {
          width: 100%;
          border-radius: 5px;
        }
      }
    }
  }
}
// 点击改变的样式
.addColor {
  color: rgb(240, 6, 6);
}
</style>
