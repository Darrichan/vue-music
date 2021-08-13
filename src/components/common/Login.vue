<template>
  <el-dialog :visible.sync="dialogFormVisible"
             width="400px"
             @close="loginFormClose">
    <div style="height:30px;text-align:center;">
      <img src="../../assets/img/homeLogo.png"
           style="height:30px">
    </div>
    <el-form ref="loginFormRef"
             :model="loginForm"
             :rules="rules">
      <el-form-item label="手机号："
                    prop="phone">
        <el-input placeholder="请输入手机号"
                  v-model="loginForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码："
                    :required="true">
        <el-input type="password"
                  placeholder="输入密码"
                  prop="password"
                  v-model="loginForm.password"></el-input>

      </el-form-item>
    </el-form>
    <div slot="footer"
         class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button style="background-color:#41b883;color:black"
                 @click="loginFormEnter"
                 @keyup.enter.native="loginFormEnter">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  mounted () {
    this.$bus.$on('openLogin', (val) => {
      this.dialogFormVisible = val.dialogFormVisible;
    })
  },
  methods: {
    loginFormClose () {
      this.loginForm = {
        phone: '',
        password: ''
      }
    },
    loginFormEnter () {
      this.dialogFormVisible = false;
      this.$refs.loginFormRef.validate(async (valid) => {
        //    表单预验证，通过则valid返回true
        if (!valid) return;
        console.log('表单验证成功！');
        const result = await this.$http.post("/login/cellphone?phone=" + this.loginForm.phone + "&password=" + this.loginForm.password);
        if (result.data.code == 502) {
          return this.$message.error("密码错误，请重新输入！");
        }
        if (result.data.code == 200) {
          this.$message.success("登录成功！");
          // 保存用户id
          this.id = result.data.account.id;
          // 获取后端返回的token
          var token = result.data.token;

          //存放userToken
          this.$store.commit("setUserToken", token)

          //存放userid
          this.$store.commit("setUserId", this.id)

          // 保存 cookie (大部分需要登录的接口都要用到)
          var cookie = result.data.cookie
          this.$store.commit("setCookie", cookie)
        } else return this.$message.error("登录失败");

        let userdata = {
          token,
          cookie,
          id: this.id
        }
        this.$bus.$emit("getUserData", userdata)
        this.$bus.$emit('getUserid', this.id);
      })
    },
  },
  data () {
    return {
      dialogFormVisible: false,
      loginForm: {
        phone: '',
        password: ''
      },
      rules: {
        phone: [
          { required: true, message: "请输入登录手机号", trigger: "blur" },
          { min: 11, max: 11, message: "请输入11位手机号", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "密码长度在 6 到 12 个字符",
            trigger: "blur",
          },
        ],
      },
    }
  }
}
</script>

<style>
</style>
