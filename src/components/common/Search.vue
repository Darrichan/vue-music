<template>
  <div>
    <el-drawer :visible.sync="drawer"
               :direction="'ttb'"
               :before-close="handleClose"
               style="width:80%;margin:auto;"
               :size="'200px'"
               :withHeader="false">
      <el-form style="width:80%;margin:50px auto;vertical-align:middle;"
               @keyup.enter.native="searchDialog">
        <div style="height:40px;text-align:center;">
          <img src="../../assets/img/homeLogo.png"
               style="height:40px">
        </div>
        <el-input placeholder="请输入要搜索的歌手/歌单，并按下回车查询哦！"
                  style="display:inline"
                  type="text"
                  v-model="searchVal"></el-input>
      </el-form>

    </el-drawer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchVal: '',
      drawer: false,
      searchRes: []
    }
  },
  mounted () {
    this.$bus.$on('oepnSearch', val => {
      this.drawer = val;
    })
  },
  methods: {
    async GotoSearchDetails (keyword) {
      const result = await this.$http.get("/cloudsearch?keywords=" + keyword);
      if (result.status !== 200) {
        return this.$message.error("获取搜索歌曲失败！");
      }
      //  将歌曲数据传给父组件
        this.searchRes =await result.data.result.songs;
    },
    searchDialog () {
      this.$router.push('/')
      if (this.searchVal == '') {
        this.$message.error('请输入合适的搜索参数哦！')
      } else {
        this.$message.success('查询中，请等待')
        this.drawer = !this.drawer;
        this.GotoSearchDetails(this.searchVal)
        setTimeout(() => {
          this.$store.commit('setSearchData', this.searchRes);
        }, 1000)
      }
      this.searchVal = '';
    },
    handleClose () {
      this.$bus.$emit('closeDrawer', false)
      this.drawer = !this.drawer
    }
  }
}
</script>

<style>
.el-drawer__body {
  display: block;
  align-items: center;
  justify-content: center;
}
</style>
