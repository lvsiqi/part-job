<template>
  <div v-if="!this.$store.state.loginState">
    <el-button type="text" @click="toLogin" class="login-button">登陆注册</el-button>
    <el-dialog :visible.sync="dialogFormVisible" width="30%">
      <el-tabs v-model="activeName">
        <el-tab-pane label="登录" name="first">
          <el-form :model="form" :rules="rules" ref="loginForm">
            <el-form-item prop="account">
              <el-tooltip class="item" effect="dark" content="唯一登录名" placement="bottom-start">
                <el-input v-model.trim="form.account" size="large">
                  <template slot="prepend">登录账号</template>
                </el-input>
              </el-tooltip>
            </el-form-item>
            <el-form-item prop="password">
              <el-tooltip class="item" effect="dark" content="登录密码" placement="bottom-start">
                <el-input v-model.trim="form.password" size="large" type="password">
                  <template slot="prepend">登录密码</template>
                </el-input>
              </el-tooltip>
            </el-form-item>
            <el-form-item>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="login('loginForm')">确 定</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="second">
          <Register @changeActive="change"></Register>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
  import constant from "../../constants/constants";
  import Register from "./Register";

  export default {
    name: "login",
    components: {Register},
    data() {
      return {
        form: {
          account: '',
          password: '',
        },
        dialogFormVisible: false,
        activeName: 'first',
        rules:{
          account: [
             { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          password: [
             { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      login(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.axios({
              method: 'post',
              url: constant.api_url + '/user/login',
              data: this.form
            }).then(result => {
              if (result.data.loginState === constant.system_success) {
                this.dialogFormVisible = false
                this.$message.success(result.data.messages.description)
                this.$store.commit('changeUserData',result.data.messages.userData)
                this.$store.commit('changeUserDetail',result.data.messages.userDetail)
                this.$store.commit('changeLoginState',true)
                this.socketApi.initWebSocket(result.data.messages.userData.account)
                this.getMessageList(this.form.account)
              } else {
                this.$message.error(result.data.messages.description);
              }
            }).catch(error => {
              this.$message.error("数据请求错误");
            })
          } else {
            return false
          }
        })
      },
      getMessageList(account){
        this.axios({
          method: 'post',
          url: constant.api_url+'/message/get_message_by_factor',
          data: {
            acceptAccount: account,
            state: 'unread'
          }
        }).then(result => {
          if(result.data.state == constant.system_success){
            this.$store.commit('changeMessageList',result.data.messages)
          }
          else{
            this.$message.error("获取消息列表失败");
          }
        }).catch(error => {
          this.$router.push('/error_404')
        })
      },
      toLogin: function () {
        this.form.account = ''
        this.form.password = ''
        this.dialogFormVisible = true
      },
      change(){
        this.activeName = "first"
      }
    }
  }
</script>

<style scoped>
  .login-button {
    color: #fff;
  }

  .login-button:hover {
    color: #ffd04b;;
  }
</style>
