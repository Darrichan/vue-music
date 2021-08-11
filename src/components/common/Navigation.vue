<template>
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

        <router-link to="/Songlist">
          <li class="floatLeft"><i class="My-new-iconbiaodan"></i>歌单<div></div>
          </li>
        </router-link>

        <router-link to="/Singer/Singerlist">

          <li class="floatLeft"><i class="My-new-iconyinle1"></i>歌手<div></div>
          </li>
        </router-link>

        <router-link to="/MV/MVList">
          <li class="floatLeft"><i class="My-new-iconzhibo"></i>MV<div></div>
          </li>
        </router-link>

      </ul>
      <!-- 搜索+登录区域 -->
      <div class="SearchAndLogin">
        <el-button class="el-icon-search"
                   type="text"></el-button>
        <span style="padding:0 15px">|</span>
        <span style="cursor: pointer;"><i class="My-new-iconwode1"
             style="margin-right:3px;"></i>登录</span>
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
</template>

<script>
export default {
  name: 'Navigation',
  methods: {
    navgabitonClick (e) {
      let d = document.getElementsByTagName('li');
      for (let i = 0; i < d.length; i++) {
        d[i].style.color = "#2a405d"
      }

      e.target.style.color = "red";
    }
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
margin-left:auto;
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
