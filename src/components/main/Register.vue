<template>
  <div>
      <el-form :model="form" :rules="rules" ref="RegisterForm">
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
        <el-form-item prop="confirmPwd">
          <el-tooltip class="item" effect="dark" content="请确认密码" placement="bottom-start">
            <el-input v-model.trim="form.confirmPwd" size="large" type="password">
              <template slot="prepend">确认密码</template>
            </el-input>
          </el-tooltip>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
            <el-button @click="reSet()">取 消</el-button>
        <el-button type="primary" @click="register('RegisterForm')">确 定</el-button>
      </div>
  </div>
</template>

<script>
  import constant from "../../constants/constants";

  export default {
    name: "Register",
    data() {
      const validateAccount = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账户'));
        } else {
          callback();
        }
      };

      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.form.confirmPwd !== '') {
            this.$refs.RegisterForm.validateField('confirmPwd');
          }
          callback();
        }
      };
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致'));
        } else {
          callback();
        }
      };
      return {
        form: {
          headImg: '../../../static/img/headImg/1.jpg',
          account: '',
          password: '',
          confirmPwd: ''
        },
        rules: {
          password: [
            {validator: validatePass, trigger: 'blur'}
          ],
          confirmPwd: [
            {validator: validatePass2, trigger: 'blur'}
          ],
          account: [
            {validator: validateAccount, trigger: 'blur'}
          ]
        }
      }

    },
    methods: {
      register(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.axios({
              method: 'post',
              url: constant.api_url + '/user/register',
              data: this.form
            }).then(result => {
              if (result.data.state === constant.system_success) {
                this.$message.success(result.data.messages);
                this.$emit('changeActive')
                this.reSet()
              } else {
                this.$message.error(result.data.messages);
              }
            }).catch(error => {
              this.$message.error("数据请求错误");
            })
          } else {
            return false
          }
        })
      },
      reSet(){
        this.form.account = ''
        this.form.password = ''
        this.form.confirmPwd = ''

      }
    }
  }
</script>

<style scoped>
  .el-input {

  }
</style>
