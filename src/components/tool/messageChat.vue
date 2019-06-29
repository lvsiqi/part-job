<template>
  <div>
    <el-row>
      <el-col :span="8">
        <div class="account-list">
          <el-menu
            @select="handleSelect"
            :background-color=" backgroundColor"
            :default-active="activeAccount"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>信息列表</span>
              </template>
              <el-menu-item :index="key" v-for="(val, key, index) in getMessageList" :key="index" @click="selectAccount(val)">
                {{key}}
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="chat-box">
          <div class="chat">
            <el-row v-for="(thisMessage,index) in this.currentMessages" :key="index">
              <div class="leftd" v-if="thisMessage.flag === 'send' ">
                <span class="leftd_h">
                    <img src="../../../static/img/headImg/1.jpg"/>
                </span>
                <div class="speech left">
                  {{thisMessage.text}}
                </div>
              </div>
              <div class="rightd" v-if="thisMessage.flag === 'accept' ">
            <span class="rightd_h">
                <img src="../../../static/img/headImg/1.jpg"/>
            </span>
                <div class="speech right">
                  {{thisMessage.text}}
                </div>
              </div>
            </el-row>
          </div>
          <div class="send-message">
            <el-row>
              <el-col :span="20">
                <el-input v-model="currentSendMessage" type="textarea" style="font-size: 16px"></el-input>
              </el-col>
              <el-col :span="4">
                <el-button type="primary" style="margin-top: 8px;margin-left: 10px" @click="sendMessage()">发送</el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import constant from "../../constants/constants";

  export default {
    name: "messageChat",
    data() {
      return {
        activeAccount: '',
        backgroundColor: '#606266',
        currentSendMessage: '',
        currentMessages: [],
      }
    },
    methods: {
      getRouteData() {
        let messageListTemp = this.getMessageList
        if(this.$route.params.acceptAccount != null) {
          if (messageListTemp.hasOwnProperty( this.$route.params.acceptAccount)) {

          } else {
            this.$set(messageListTemp,  this.$route.params.acceptAccount, [])
          }
          this.$store.commit('changeMessageList',messageListTemp)
        }
      },
      handleSelect(key,keyPath) {
        this.activeAccount = key
        this.axios({
          method: 'post',
          url: constant.api_url + '/message/delete_message_by_send_account',
          data: {
            sendAccount: key
          }
        }).then(result => {

        }).catch(error => {
          this.$message.error("数据清除错误");
        })
      },
      selectAccount(val){
        this.currentMessages = val
      },
      sendMessage(){
        if(this.activeAccount === ''){
          this.$message.error('请选择聊天人')
          return
        }
        if(this.currentSendMessage.trim() ==='' ){
          this.$message.error('消息不能为空')
          return
        }
        let messageListTemp = this.getMessageList
        let temp={
          text:this.currentSendMessage,
          flag:'send'
        }
        let message={
          sendAccount: this.$store.state.userData.account,
          acceptAccount: this.activeAccount,
          type:'private',
          content: this.currentSendMessage,
          state: 'unread'
        }
       this.axios({
          method: 'post',
          url: constant.api_url + '/MySocketController/publish',
          data: message
        }).then(result => {
          messageListTemp[this.activeAccount].push(temp)
          this.$store.commit('changeMessageList',messageListTemp)
        }).catch(error => {
          this.$message.error("数据请求错误");
        })
      },

    },
    computed: {
      getMessageList() {
        return this.$store.state.messageList
      }
    },
    created() {
      this.getRouteData()
    }
  }
</script>

<style scoped>
  .account-list {
    width: 220px;
    height: 400px;
    float: right;
    margin-top: 40px;
    overflow: auto;
  }

  .send-message {
    width: 500px;
    margin: 40px auto;
  }

  .chat-box {
    width: 500px;
    margin-top: 0;
  }

  .chat {
    width: 500px;
    height: 500px;
    overflow: auto;
    background: white;
    margin: 40px auto;
    border-radius: 25px;
  }

  div.speech {
    float: left;
    margin: 10px 0;
    padding: 8px;
    table-layout: fixed;
    word-break: break-all;
    position: relative;
    background: -webkit-gradient(linear, 50% 0%, 50% 100%, from(#ffffff), color-stop(0.1, #ececec), color-stop(0.5, #dbdbdb), color-stop(0.9, #dcdcdc), to(#8c8c8c));
    border: 1px solid #989898;
    border-radius: 8px;
  }

  div.speech:before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    left: 15px;
    top: -20px;
    border: 10px solid;
    border-color: transparent transparent #989898 transparent;
  }

  div.speech:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    left: 17px;
    top: -16px;
    border: 8px solid;
    border-color: transparent transparent #ffffff transparent;
  }

  div.speech.right {
    display: inline-block;
    box-shadow: -2px 2px 5px #CCC;
    margin-right: 10px;
    max-width: 75%;
    float: right;
    background: -webkit-gradient(linear, 50% 0%, 50% 100%, from(#e4ffa7), color-stop(0.1, #bced50), color-stop(0.4, #aed943), color-stop(0.8, #a7d143), to(#99BF40));
  }

  div.speech.right:before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    top: 9px;
    bottom: auto;
    left: auto;
    right: -10px;
    border-width: 9px 0 9px 10px;
    border-color: transparent #989898;
  }

  div.speech.right:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    top: 10px;
    bottom: auto;
    left: auto;
    right: -8px;
    border-width: 8px 0 8px 9px;
    border-color: transparent #bced50;
  }

  div .left {
    display: inline-block;
    box-shadow: 2px 2px 2px #CCCCCC;
    margin-left: 10px;
    max-width: 75%;
    position: relative;
    background: -webkit-gradient(linear, 50% 0%, 50% 100%, from(#ffffff), color-stop(0.1, #eae8e8), color-stop(0.4, #E3E3E3), color-stop(0.8, #DFDFDF), to(#D9D9D9));
  }

  div .left:before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    top: 9px;
    bottom: auto;
    left: -10px;
    border-width: 9px 10px 9px 0;
    border-color: transparent #989898;
  }

  div .left:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    top: 10px;
    bottom: auto;
    left: -8px;
    border-width: 8px 9px 8px 0;
    border-color: transparent #eae8e8;
  }

  .leftimg {
    float: left;
    margin-top: 10px;
  }

  .rightimg {
    float: right;
    margin-top: 10px;
  }

  .leftd {
    clear: both;
    float: left;
    margin-left: 10px;
  }

  .rightd {
    clear: both;
    float: right;
    margin-right: 10px;
  }

  .leftd_h {
    width: 39px;
    height: 39px;
    border-radius: 100%;
    display: block;
    float: left;
    overflow: hidden;
  }

  .leftd_h img {
    display: block;
    width: 100%;
    height: auto;
  }

  .rightd_h {
    width: 39px;
    height: 39px;
    border-radius: 100%;
    display: block;
    float: right;
    overflow: hidden;
  }

  .rightd_h img {
    display: block;
    width: 100%;
    height: auto;
  }
</style>
