<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="18">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="1"><router-link to="/main" tag="li">首页</router-link></el-menu-item>
            <el-submenu index="2" :disabled="!this.$store.state.loginState">
              <template slot="title">个人信息管理</template>
              <el-menu-item index="2-1"><router-link to="/pwd_change" tag="li">密码修改</router-link></el-menu-item>
              <el-menu-item index="2-2"><router-link to="/message_change" tag="li">信息修改</router-link></el-menu-item>
              <el-submenu index="2-4">
                <template slot="title">求职管理</template>
                <el-menu-item index="2-4-1"><router-link to="/apply_job_visit" tag="li">兼职申请信息</router-link></el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="3"><router-link to="/search_job" tag="li">兼职浏览</router-link></el-menu-item>

            <el-submenu index="4" :disabled="!this.$store.state.loginState">
              <template slot="title" >消息中心</template>
              <el-menu-item index="4-3"><router-link to="/message_chat" tag="li">个人消息</router-link></el-menu-item>
            </el-submenu>

            <el-menu-item index="5" :disabled="!this.$store.state.loginState"><router-link to="/recommend" tag="li">为你推荐</router-link></el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="3">
          <div class="login-block">
            <login></login>
          </div>
        </el-col>
        <el-col :span="3">
          <el-tooltip v-if="this.$store.state.loginState" class="item" effect="dark" :content="user" placement="bottom">
            <el-dropdown trigger="click" @command="handleCommand">
              <div id="headImg" class="el-dropdown-link" :style="{'background-image':'url('+backgroundImg+')'}"></div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-tooltip>
        </el-col>
      </el-row>
    </el-header>
    <p v-show="false">{{currentMessage}}</p>
    <el-main>
      <transition name="transitionRouter">
        <router-view></router-view>
      </transition>
    </el-main>
  </el-container>
</template>

<script>
  import Login from "./login";
  export default {
    name: "index",
    components: {Login},
    data() {
      return {
        activeIndex: '1',
      }
    },
    computed :{
      backgroundImg(){
        return 'static/img/headImg/'+ this.$store.state.userData.headImg       //打包部署路径失效修改了路径 原路径../../../
      },
      getMessageList() {
        return this.$store.state.messageList
      },
      user(){
        return this.$store.state.userData.account
      },
      currentMessage(){
        let messageListTemp = this.getMessageList
        const h = this.$createElement;
        if(this.$store.state.currentMessage!==''){
          this.$notify({
            title: '新消息',
            message: h('i', { style: 'color: teal'},'收到一条新消息'),
            duration: 0
          })
          let temp={
            text:this.$store.state.currentMessage.content,
            flag:'accept'
          }
          let sendAccount = this.$store.state.currentMessage.sendAccount
         if(messageListTemp.hasOwnProperty(sendAccount)){
           messageListTemp[sendAccount].push(temp)
          }
          else {
            this.$set(messageListTemp, this.$store.state.currentMessage.sendAccount,[temp])
          }
          this.$store.commit('changeCurrentMessage','')
          this.$store.commit('changeMessageList',messageListTemp)
        }
        return this.$store.state.currentMessage
      }
    },
    methods: {
      handleSelect(key, keyPath) {

      },
      handleCommand(command) {
        if (command === 'logout') {
          this.$store.commit('logout')
          this.$router.push('/main')
        }
      }
    },
  }
</script>

<style scoped>
  .login-block{
    height: 55px;
    line-height: 55px;
  }

#headImg{
  width: 50px;
  height: 50px;
  margin-top: 5px;
  float: left;
  background-size: cover;
  display: block;
  border-radius: 25px;
}
  .el-menu {
    margin: 0 auto;
    width: 60%;
  }

  .el-header {
    margin: 0;
    padding: 0;
    background-color: #545c64;
    display: inline-block;
  }

  .el-main {
    height: 85%;
    margin: 0;
    padding: 0;
    background-color: #eeeeee;
  }
  .el-container {
    height: 100%;
  }
  .transitionRouter-enter-active,
  .transitionRouter-leave-active {
    transition: all 0.4s;
  }

  .transitionRouter-enter,
  .transitionRouter-leave{
    transform: translate3d(100%, 0, 0);
  }
</style>
