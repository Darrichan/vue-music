<template>
  <div style="border:1px solid red; width:80%;margin:0 auto;">
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
              <span>{{nickname}}</span>
            </div>
          </div>
        <div class="grid-content UserlRight">
          <!-- 右 -->
          <div class="grid-content-right" >
            <div class="grid-content-right-title" style="border-bottom:6px solid #41b883">
              <span >|</span>
              <strong>我的歌单</strong>
            </div>
            <div class="mycover" >
              <ul class="grid-content-right-ul">
                <li :key="index"
                    v-for="(item,index) in playlist"
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
              class="personalRight">
            <div class="grid-content UserlMain">
              <!-- 中间 -->
                <!-- 第一层-->
                <div class="main01">
                  <div class="main01-top">
                     <strong>听歌排行</strong>
                     <span @click="changeStyle(2),changeflag2()" :class="{addColor:changeSelectStyle == 2}">所有时间</span>
                     <span class="center">|</span>
                     <span @click="changeStyle(0),changeflag1()" :class="{addColor:changeSelectStyle == 0}">最近一周</span>
                  </div>
                </div>

                 <!-- 所有时间 -->
                <!-- 第二层 -->
                 <div class="grid-content">
                    <!-- 最近一周 -->
                    <play-song  v-show="(flag1)" :SongData="recordWeek" >
                    </play-song>

                    <!-- 所有时间 -->
                    <play-song  v-show="(flag2)" :SongData="record">
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
// import playsong from '../components/common/PlaySong.vue'
export default {
  components:{
  },
  data () {
    return {
      UserId: this.$route.params.userdetailid,
      avatarUrl: '',
      nickname: '',
      signature: '',
      backgroundUrl: '',
      playlist: [],
      recordWeek:[]
    }
  },
  mounted () {
    this.getUserDetails();
    this.getUserPlaylist();
  },
  methods: {
    // 歌单数据
    async getUserPlaylist () {
      const result = await this.$http.get("/user/playlist?uid=" + this.UserId);
      // 用户歌单
      this.playlist = result.data.playlist
    },
    // 歌单
    gotolistdetails (id) {
      this.$router.push("/rankingdetails/" + id);
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
      console.log(this.backgroundUrl)
    },
  }

}
</script>

<style lang="less" scoped>
// 左
.personalLeft {
  border: 1px solid red;
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
          padding:0;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          li {
            cursor:pointer;
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
</style>
