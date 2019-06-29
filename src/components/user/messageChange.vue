<template>
  <div style="width: 100%">
  <div class="message-change">
    <div class="div-tittle">个人信息</div>
    <el-row>
      <el-col :span="24">
        <el-card shadow="hover">
          <transition name="el-zoom-in-center">
            <el-row v-show="show1">
              <el-col :span="4">
                <div class="headImg" :style="{'background-image':'url('+'static/img/headImg/'+userData.headImg+')'}"></div>  <!--打包部署路径失效修改了路径 原路径../../../-->
              </el-col>
              <el-col :span="20">
                <el-row>
                  <el-col :span="4">
                    <p class="p-name">
                      <span>{{userData.name}}</span>
                    </p>
                  </el-col>
                  <el-col :span="20">
                    <p style="font-size: 14px;color: #999;line-height: 14px">更新时间:{{new
                      Date(userData.updateTime).Format("yyyy-MM-dd")}}
                      <i class="el-icon-edit edit-i" @click="show1 = !show1">编辑</i>
                    </p>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <ul class="require-message-ul">
                      <li class="require-message-ul-li">{{userData.sex}}</li>
                      <li class="require-message-ul-li">{{userData.age}}岁</li>
                      <li class="require-message-ul-li">{{userData.address}}</li>
                    </ul>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <div>
                      <li class="el-icon-phone">&nbsp&nbsp&nbsp&nbsp{{userData.tel}}</li>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </transition>
          <transition name="el-zoom-in-center">
            <el-row v-show="!show1">
              <el-col :span="24">
                <base-change @changeShow1="changeShow1"></base-change>
              </el-col>
            </el-row>
          </transition>
        </el-card>
        <el-card style="margin-top: 10px">
          <transition name="el-zoom-in-center">
            <el-row v-show="show2">
              <el-col :span="24">
                <el-row>
                  <el-col :span="8" style="float: right">
                   <p style="font-size: 14px;color: #999;line-height: 14px;margin-top: -5px"> <i class="el-icon-edit edit-i" @click="show2 = !show2">编辑</i></p>
                  </el-col>
                  <el-divider content-position="left"><b style="font-size: 18px;line-height: 35px;">意向信息</b></el-divider>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <p>
                      <label class="my-label">个人爱好：</label>
                      <label class="my-topic">{{userDetail.hobby}}</label>
                    </p>
                  </el-col>
                  <el-col :span="8">
                    <p>
                      <label class="my-label">个人特长：</label>
                      <label class="my-topic">{{userDetail.speciality}}</label>
                    </p>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="4">
                    <label class="my-label">期望职业:</label>
                  </el-col>
                  <el-col :span="20">
                  <div class="label-selected">
                    <el-tag
                      v-for="label in userDetail.labelList"
                      :key="label"
                      type="success"
                      style="margin-left: 10px; margin-top:10px; cursor: pointer;"
                      v-show="label != ''">
                      {{label}}
                    </el-tag>
                  </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </transition>
          <transition name="el-zoom-in-center">
            <el-row v-show="!show2">
              <el-col :span="24">
                <job-message-change @changeShow2="changeShow2" style="margin-bottom: 50px"></job-message-change>
              </el-col>
            </el-row>
          </transition>
        </el-card>
        <el-card style="margin-top: 10px">
          <transition name="el-zoom-in-center">
            <el-row v-show="show3">
              <el-col :span="24">
                <el-row>
                  <el-col :span="8" style="float: right">
                    <p style="font-size: 14px;color: #999;line-height: 14px;margin-top: -5px"> <i class="el-icon-edit edit-i" @click="show3 = !show3">编辑</i></p>
                  </el-col>
                  <el-divider content-position="left"><b style="font-size: 18px;line-height: 35px;">个人评价</b></el-divider>
                </el-row>
                <el-row>
                  <el-col :span="24" v-html="userDetail.evaluation">

                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </transition>
          <transition name="el-zoom-in-center">
            <el-row v-show="!show3">
              <el-col :span="24">
                <editor @changeShow3="changeShow3" style="margin-bottom: 50px"></editor>
              </el-col>
            </el-row>
          </transition>
        </el-card>
      </el-col>
    </el-row>
  </div>
    <p></p>
    <p></p>
    <div class="footer"></div>
  </div>
</template>

<script>
  import BaseChange from "./baseChange";
  import constant from "../../constants/constants";
  import JobMessageChange from "./jobMessageChange";
  import Editor from "./Editor";

  export default {
    name: "messageChange",
    components: {Editor, JobMessageChange, BaseChange},
    data() {
      return {
        show1: true,
        show2: true,
        show3: true
      }
    },
    computed: {
      userData() {
        return this.$store.state.userData
      },
      userDetail() {
        return this.$store.state.userDetail
      },
    },
    methods: {
      changeShow1() {
        if (this.$store.state.userData.state === constant.complete_flag) {
          this.show1 = true
        } else {
          this.$message.error("请补全信息");
        }
      },
      changeShow2() {
          this.show2 = true
      },
      changeShow3() {
        this.show3 = true
      }
    },
    created() {
      this.show1 = (this.$store.state.userData.state === constant.complete_flag)
      this.show3 = !(this.$store.state.userDetail.evaluation === '')
    }
  }
</script>

<style scoped>
  .message-change {
    margin: 20px auto;
    width: 50%;
    background-color: white;
  }

  .headImg {
    width: 100px;
    height: 100px;
    background-size: cover;
    display: block;
  }

  .p-name {
    margin-bottom: 24px;
    font-size: 32px;
    line-height: 32px;
    zoom: 1;
    display: block;
    margin-top: 0px;
  }

  .div-tittle {
    font-size: 18px;
    line-height: 35px;
    color: #2788f3;
    border-bottom: 2px solid #2788f3;
    width: 200px;
    height: 35px;
    text-align: center;
  }

  .require-message-ul {
    margin-top: 0px;
    height: 20px;
    float: left;
    margin-left: -65px;
  }

  .require-message-ul-li {
    float: left;
    overflow: hidden;
    white-space: nowrap;
    border-right: 1px solid #eee;
    font-size: 18px;
    color: #666;
    letter-spacing: 0;
    padding: 0 30px;
  }

  .edit-i {
    float: right;
  }

  .edit-i:hover {
    color: #2788f3;
    cursor: pointer;
  }

  .no-message {
    width: 300px;
    height: 100px;
    line-height: 100px;
    font-size: 50px;
    color: #666;
    text-align: center;
    background-color: #c3c3c3;
    margin: 0 auto;
    border: dashed 2px gray;
  }

  .label-selected {
    width: 500px;
    border-radius: 25px;
    margin-top: -10px;
  }
  .my-label{
    margin-left: 30px;
    float: left;
    font-size: 15px;
    color: #666;
  }
  .my-topic{
    margin-left: 40px;
    font-size: 15px;
  }
  .footer{
    width:100%;
    height: 100px;
    background-color:#4B4B4B;
    margin-top: 40px;
  }
</style>
