<template>
  <div class="box">
  <div id="personalUpdate">
    <el-form ref="updateForm" :model="updateForm" :rules=rules label-width="80px">
      <el-row type="flex" justify="center">
        <el-col :span="17">
          <el-form-item label="头像:">
            <el-select v-model="updateForm.headImg" placeholder="请选择头像">
              <el-option
                v-for="avatar in avatars"
                :key="avatar.Id"
                :label="avatar.src"
                :value="avatar.src"
              >
                <img class="avatar" :src="'static/img/headImg/'+avatar.src" style="height:36px">   <!--//打包部署路径失效修改了路径 原路径../../../-->
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="17">
          <el-form-item label="账号:">
            <el-input :value="updateForm.account" size="large" :disabled='true'>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" justify="center">
        <el-col :span="17">
          <el-form-item label="姓名:" prop="name">
            <el-input v-model.trim="updateForm.name" size="large">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" justify="center">
        <el-col :span="17">
          <el-form-item label="性别:" prop="sex">
            <el-radio-group v-model="updateForm.sex">
              <el-radio-button label="男"></el-radio-button>
              <el-radio-button label="女"></el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" justify="center">
        <el-col :span="17">
          <el-form-item label="年龄:" prop="age">
            <el-input v-model.trim.number="updateForm.age" size="large">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" justify="center">
        <el-col :span="17">
          <el-form-item label="电话:" prop="tel">
            <el-input v-model.trim="updateForm.tel" size="large">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" justify="center">
        <el-col :span="17">
          <el-form-item label="地址:" prop="address">
            <el-input type="textarea" v-model.trim="updateForm.address" size="large">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <el-row type="flex" justify="center">
          <el-col :span="17">
            <el-button type="primary" @click="submitUpdate('updateForm')" round>保存并更新</el-button>
            <el-button type="info" @click="cancle" round>取消</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
  </div>
</template>

<script>
  import constant from "../../constants/constants";
  import {jsonChange} from "../../until"

  export default {
    name: "baseChange",
    data() {
      return {
        updateForm: {
          headImg: this.$store.state.userData.headImg,
          account: this.$store.state.userData.account,
          name: this.$store.state.userData.name,
          sex: this.$store.state.userData.sex,
          age: this.$store.state.userData.age != null ? Number(this.$store.state.userData.age) :18,
          tel: this.$store.state.userData.tel,
          address: this.$store.state.userData.address,
          state: constant.complete_flag
        },
        rules: {
          name: [
            {
              required: true,
              message: '姓名不能为空',
              trigger: 'blur'
            },
          ],
          sex: [
            {
              required: true,
              message: '性别不能为空',
              trigger: 'blur'
            },
          ],
          age: [
            {
              required: true,
              message: '年龄不能为空',
              trigger: 'blur'
            },
            {
              type: 'number',
              message: '年龄必须为数字值',
              trigger: 'blur'
            }

          ],
          tel: [
            {
              required: true,
              message: '电话不能为空',
              trigger: 'blur'
            },
          ],
          address: [
            {
              required: true,
              message: '地址不能为空',
              trigger: 'blur'
            },
          ]
        },
        avatars: [
          {
            src: '1.jpg',
            Id: '0',
          },
          {
            src: '2.jpg',
            Id: '1',
          },
          {
            src: '3.jpg',
            Id: '2',
          },
          {
            src: '4.jpg',
            Id: '3',
          },
          {
            src: '5.jpg',
            Id: '4',
          },
          {
            src: '6.jpg',
            Id: '5',
          },
        ],
      }
    },
    computed: {},
    methods: {
      submitUpdate(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axios({
              method: 'post',
              url: constant.api_url + '/user/update',
              data: jsonChange(this.$store.state.userData, this.updateForm)
            }).then(result => {
              if (result.data.state === constant.system_success) {
                this.$store.commit('changeUserData',result.data.messages)
                this.$message.success("更新成功");
                this.$emit('changeShow1')
              } else {
                this.$message.error(result.data.messages);
              }
            }).catch(error => {
              this.$message.error('网络异常');
            })
          } else {
            return false;
          }
        })
      },
      cancle: function () {
        this.$emit('changeShow1')
      }
    }
  }
</script>

<style scoped>
  #personalUpdate {
    width: 600px;
    margin: 0 auto;
  }
</style>
