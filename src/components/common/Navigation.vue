<template>
  <div>
    <el-row :gutter="10"
            class="bj el-row01"
            style="margin-bottom: 20px;margin-right:auto;">
      <el-col :xs="1"
              :sm="3"
              :md="4"
              :lg="3"
              :xl="3">
        <div class="grid-content bg-purple"></div>
      </el-col>

      <div class="grid-content homenav">
        <!-- logo -->
        <div class="logo"
             style="float:left">
          <img src="../../assets/img/homeLogo.png"
               alt="">
        </div>
        <ul class="navigation"
            @click="navgabitonClick"
            id="colorChange">
          <router-link to="/">
            <li class="floatLeft"><i class="My-new-iconfaxian1"></i>发现音乐<div></div>
            </li>
          </router-link>

          <router-link to="/ranking">
            <li class="floatLeft"><i class="My-new-iconpaihangbang"></i>排行榜<div></div>
            </li>
          </router-link>

          <router-link to="/Singer/Singerlist">
            <li class="floatLeft"><i class="My-new-iconyinle1"></i>歌手<div></div>
            </li>
          </router-link>


        </ul>
        <!-- 搜索+登录区域 -->
        <div class="SearchAndLogin">
          <el-button class="el-icon-search"
                     type="text"
                     @click="searchBtn"></el-button>
          <span style="padding:0 15px"></span>
          <span style="cursor: pointer;"
                @click="loginClick"
                v-if="!isLogin"><i class="My-new-iconwode1"
               style="margin-right:3px;"></i>登录</span>

          <!-- 登录成功后的区域 -->
          <img :src="avatarUrls"
               alt=""
               class="SearchAndLoginImg"
               v-if="isLogin">
          <el-col :span="12"
                  class="pull-down"
                  v-if="isLogin">
            <el-dropdown trigger="click"
                         @command="handleCommand">
              <span class="el-dropdown-link">
                {{nickname}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-plus"
                                  command="u">个人主页</el-dropdown-item>
                <el-dropdown-item icon="el-icon-circle-check"
                                  command="e">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>

        </div>
      </div>

      <el-col :xs="1"
              :sm="3"
              :md="4"
              :lg="3"
              :xl="3">
        <div class="grid-content adapt"></div>
      </el-col>
    </el-row>
    <login />
    <Search :drawer="drawer" />
  </div>

</template>

<script>
import Search from './Search.vue'
import Login from '../common/Login.vue'
export default {
  name: 'Navigation',
  components: {
    Login, Search
  },
  data () {
    return {
      UserId: '',
      userToken: '',
      cookie: '',
      isLogin: false,
      // 用户头像
      avatarUrls: '',
      // 用户昵称
      nickname: '',
      // 搜索框
      drawer: false
    }
  },
  watch: {
    UserId: function () {
      this.getUserDetails();
      this.judgeLogin();
    }
  },
  methods: {
    searchBtn () {
      this.$bus.$emit('oepnSearch', true)
    },
    // 获取用户详情
    async getUserDetails () {

      const result = await this.$http.get("/user/detail?uid=" + this.UserId);
      if (result.status !== 200) {
        return this.$message.error("获取用户信息失败！");
      }
      if (result.data.code !== 400) {
        // 保存头像地址
        this.avatarUrls = result.data.profile.avatarUrl;
      } else return

    },
    judgeLogin () {
      if (this.UserId != null) {
        this.isLogin = true
      }
      return this.isLogin;
    },
    navgabitonClick (e) {
      let d = document.getElementsByTagName('li');
      for (let i = 0; i < d.length; i++) {
        d[i].style.color = "#2a405d"
      }
      e.target.style.color = "#40b480";
    },
    loginClick () {
      this.$bus.$emit('openLogin', { dialogFormVisible: true })
    },

    Search () {
      this.$bus.$emit('openSearch', true)
    },
    // 点击改变样式
    changefontdiv (index) {
      this.fontlist = index
    },

    // 刷新后防止头像数据丢失
    showMsg (val) {
      this.UserId = val;
      // UserId更新后又会触发监听器watch: 函数
    },

    // 下拉选线处理函数
    handleCommand (command) {
      // 退出
      if (command == 'e') {
        this.isLogin = false
        //清空所有的sessionStorage数据
        window.sessionStorage.clear();
        //    跳转到登录页
        this.$router.push("/");
        this.$message.success('退出登录成功~')
        // 再次强制刷新
        location.reload();
      }
      // 个人主页
      if (command == 'u') {
        //    跳转到登录页
        this.$router.push("/user/" + this.UserId);
      }

    },
  },

  mounted () {
    this.$bus.$on('closeDrawer', val => {
      this.drawer = val
    })
    this.showMsg(window.sessionStorage.getItem("USERID"));
    this.getUserDetails();
    this.judgeLogin();
    this.$bus.$on('getUserData', (userdata) => {
      console.log(userdata);
      this.UserId = userdata.id
      this.userToken = userdata.token
      console.log();
      this.cookie = userdata.cookie
    })
  }
}
</script>

<style lang="less" scoped>
.bj {
  box-shadow: 0px 36px 54px -15px rgba(0, 0, 0, 0.1);
}
// 导航栏 start
.homenav {
  width: 80%;
  padding: 13px 0;
  /*flex 布局*/
  display: flex;
  margin: 0 auto;
  /*实现垂直居中*/
  align-items: center;
  flex-flow: wrap;
  position: relative;
}
.navigation li {
  padding: 0 20px;
  font-size: 14px;
  position: relative;
  color: black;
  i {
    margin-right: 2px;
  }
}
.fontdiv {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateY(80%);
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: red;
}
.fontcolor {
  color: rgb(255, 0, 0);
}

.logo img {
  width: 220px;
}
.floatLeft {
  float: left;
  // 鼠标小手
  cursor: pointer;
}
.SearchAndLogin {
  position: absolute;
  font-size: 14px;
  right: 105px;
  // 居中
  top: 50%;
  transform: translate(0, -50%);
  .SearchAndLoginImg {
    border-radius: 50%;
    width: 35px;
    transform: translateY(5px);
  }
}

// 登录后的下拉
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-dropdown-link {
  margin-left: 8px;
}
.pull-down {
  position: absolute;
  left: 94px;
  top: 17px;
  width: 75px !important;
}
</style>
