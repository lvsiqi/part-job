<template>
  <div class="box">
  <div class="pwdUpdate">
    <el-row>
      <el-col :span="24">
        <strong class="tittle">密码修改</strong>
      </el-col>
    </el-row>
    <el-row class="formDiv">
      <el-col :span="24">
    <el-form ref="updateForm" :model="updateForm" :rules="rules" label-width="80px">

      <el-form-item label="账号:" prop="account">
        <el-tooltip class="item" effect="dark" content="账号" placement="right">
          <el-input v-model.trim="updateForm.account" size="large" :disabled="true">
          </el-input>
        </el-tooltip>
      </el-form-item>

      <el-form-item label="原密码:" prop="initPwd">
        <el-tooltip class="item" effect="dark" content="请输入原密码" placement="right" >
          <el-input v-model.trim="updateForm.initPwd" size="large" show-password>
          </el-input>
        </el-tooltip>
      </el-form-item>


      <el-form-item label="新密码:" prop="password">
        <el-tooltip class="item" effect="dark" content="请输入新密码" placement="right">
          <el-input v-model.trim="updateForm.password" size="large" show-password>
          </el-input>
        </el-tooltip>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitUpdate('updateForm')">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
      </el-col>
    </el-row>
  </div>
  </div>
</template>

<script>
  import constant from "../../constants/constants";
  import {jsonChange} from "../../until"
  export default {
    name: "pwdChange",
    data() {
      return {
        updateForm: {
          account: this.$store.state.userData.account,
          password: '',
          initPwd: '',
        },
        rules: {
          initPwd: [
            {
              required: true,
              message: '原密码不能为空',
              trigger: 'blur'
            },
          ],
          password: [
            {
              required: true,
              message: '新密码不能为空',
              trigger: 'blur'
            },
          ]
        },
      }
    },
    methods: {
      submitUpdate(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.updateForm.initPwd !== this.$store.state.userData.password){
              this.$message.error('密码错误');
              return false
            }
            this.axios({
              method: 'post',
              url: constant.api_url + '/user/update',
              data: this.updateForm
            }).then(result => {
              if (result.data.state === constant.system_success) {
                this.$message.success('更新成功请重新登录');
                this.$store.commit('changeUserData',result.data.messages)
                this.$store.commit('changeLoginState',false)
                this.resetForm()
                this.$router.push('/')
              } else {
                this.$message.error(result.data.messages);
              }
            }).catch(error => {
              this.$message.error("网络异常");
            })
          } else {
            return false;
          }
        })
      },
      resetForm: function () {
        this.updateForm.password = ''
        this.updateForm.initPwd = ''
      }
    }
  }
</script>

<style scoped>
  .pwdUpdate{
    width: 500px;
    position: relative;
    top: 40px;
    margin: 0 auto;
  }
  .el-input{
    width: 300px;
  }
  .tittle{
    position: relative;
    top: 10px;
    left: 170px;
  }
  .formDiv{
    margin-top: 20px;
  }
  .box{
    background-image: url("../../../static/img/this.jpg");
    height: 100%;
    background-size: cover;

  }

</style>
