<template>
  <div class="recommend">
    <el-row  v-if="this.$store.state.userDetail.label === '' || this.$store.state.userDetail.label === null">
      <el-alert
        title="补全个人信息获得更精准推荐"
        :closable="false"
        type="success">
        <router-link to="/message_change" tag="li" class="link-li">去补全 >>></router-link>
      </el-alert>
    </el-row>
    <el-row  v-if="this.$store.state.userDetail.label !== '' && this.$store.state.userDetail.label !== null">
      <el-tag
        v-for="label in this.$store.state.userDetail.labelList"
        :key="label"
        type="success"
        style="margin-left: 10px; margin-top:10px; cursor: pointer;">
        {{label}}
      </el-tag>
      <div class="no-data" v-if="partJobPageByType.length === 0">无该类别工作</div>
    </el-row>
  <el-row type="flex" justify="center" v-for="job in partJobPageByType" :key="job.id" style="margin-top: 5px">
    <el-col :span="24">
      <el-card shadow="hover" @click.native="showDetail(job)">
        <el-row>
          <el-col :span="20">
              <span class="tittle">
               {{job.name}}
             </span>
          </el-col>
          <el-col :span="4">
            {{job.companyName}}
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="20" class="require-message-col">
            <p class="salary">{{job.salary}}</p>
            <ul class="require-message-ul">
              <li class="require-message-ul-li">{{job.area}}</li>
              <li class="require-message-ul-li">{{job.jobNature}}</li>
              <li class="require-message-ul-li">{{job.payMethod}}</li>
            </ul>
          </el-col>
          <el-col :span="4">
            <p style="font-size: 12px ;color: #666;">规模 : {{job.companyScale}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <div class="message-foot">
                <span style="font-size: 15px; color: #666;">
                  招聘人数:
                </span>
              <span style="font-size: 15px; color: #ff5959;margin-left: 5px">
                  {{job.peopleNum}}
                </span>
              <span style="font-size: 15px; color: #666; margin-left: 15px">
                  发布时间:
                </span>
              <span style="font-size: 13px; color: #ff5959;">
                 {{new Date(job.createTime).Format("yyyy-MM-dd")}}
                </span>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="message-foot">
              <el-button type="primary" round @click="replay(job)">报名参加</el-button>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
    <el-alert
      title="和你申请同样兼职的人还申请了"
      type="success"
      :closable="false">
    </el-alert>
    <div class="no-data" v-if="partJobPageUserCF.length === 0">没有推荐信息</div>
    <el-row type="flex" justify="center" v-for="job in partJobPageUserCF" :key="job.id" style="margin-top: 5px">
      <el-col :span="24">
        <el-card shadow="hover" @click.native="showDetail(job)">
          <el-row>
            <el-col :span="20">
              <span class="tittle">
               {{job.name}}
             </span>
            </el-col>
            <el-col :span="4">
              {{job.companyName}}
            </el-col>
          </el-row>
          <el-row >
            <el-col :span="20" class="require-message-col">
              <p class="salary">{{job.salary}}</p>
              <ul class="require-message-ul">
                <li class="require-message-ul-li">{{job.area}}</li>
                <li class="require-message-ul-li">{{job.jobNature}}</li>
                <li class="require-message-ul-li">{{job.payMethod}}</li>
              </ul>
            </el-col>
            <el-col :span="4">
              <p style="font-size: 12px ;color: #666;">规模 : {{job.companyScale}}</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <div class="message-foot">
                <span style="font-size: 15px; color: #666;">
                  招聘人数:
                </span>
                <span style="font-size: 15px; color: #ff5959;margin-left: 5px">
                  {{job.peopleNum}}
                </span>
                <span style="font-size: 15px; color: #666; margin-left: 15px">
                  发布时间:
                </span>
                <span style="font-size: 13px; color: #ff5959;">
                 {{new Date(job.createTime).Format("yyyy-MM-dd")}}
                </span>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="message-foot">
                <el-button type="primary" round @click="replay(job)">报名参加</el-button>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    import constant from "../../constants/constants";

    export default {
      name: "recommend",
      data() {
        return {
          partJobPageByType: [],
          partJobPageUserCF: []
        }
      },
      methods:{
        getDataByType(){
          this.axios({
            method: 'post',
            url: constant.api_url +'user/recommend/by_job_type',
            data: this.$store.state.userDetail
          }).then(result => {
            if(result.data.state === constant.system_success){
              this.partJobPageByType = result.data.messages
            }
          }).catch(error => {
            this.$message.error("数据请求错误");
          })
        },
        getDataUserCF(){
          this.axios({
            method: 'post',
            url: constant.api_url +'user/recommend/userCF',
            data: this.$store.state.userData
          }).then(result => {
            if(result.data.state === constant.system_success){
              this.partJobPageUserCF = result.data.messages
            }
          }).catch(error => {
            this.$message.error("数据请求错误");
          })
        },
        replay(job){
          if(this.$store.state.userData ===null || this.$store.state.userData === ''){
            this.$message.error("请先登录");
            event.stopPropagation()
            return
          }else if(this.$store.state.userData.name === null || this.$store.state.userData.name ===''){
            this.$message.error("请先补全基本信息");
            event.stopPropagation()
            return
          }
          let replayJob ={
            jobId: job.id,
            userAccount: this.$store.state.userData.account,
            merchantAccount: job.account,
            state: constant.job_apply_check
          }
          this.axios({
            method: 'post',
            url: constant.api_url + '/user/apply_job/apply',
            data: replayJob
          }).then(result => {
            if (result.data.state === constant.system_success) {
              this.$message.success("已申请");
            }else {
              this.$message.error(result.data.messages);
            }
          }).catch(error => {
            this.$message.error("数据请求错误");
          })
          event.stopPropagation()
        },
        showDetail(job){
          this.$store.commit('changeJobTemp', job)
          this.$router.push('/job_detail')
        }
      },
      created() {
        this.getDataByType()
        this.getDataUserCF()
      }
    }
</script>

<style scoped>
  .recommend{
    width: 55%;
    margin: 40px auto;
  }
  .el-card {
    padding: 0 15px 0 30px;
  }

  .tittle{
    float: left;
    max-width: 300px;
    color: #333;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .tittle:hover{
    color: #1787fb;
  }
  .el-row{

  }
  .require-message-col{
    height: 50px;
    display: inline-block;
    clear: both;
  }
  .salary{
    font-size: 18px;
    color: #ff5959;
    margin-right: 10px;
    float: left;
  }
  .require-message-ul{
    float: left;
    height: 20px;
  }
  .require-message-ul-li{
    float: left;
    max-width: 110px;
    overflow: hidden;
    white-space: nowrap;
    border-right: 1px solid #eee;
    font-size: 12px;
    color: #666;
    letter-spacing: 0;
    padding: 0 8px;
    margin-top: 3px;
  }
  .message-foot{
    display: inline-block;
    margin-top: 5px;
  }
  .link-li{
    list-style-type:none;
    float: right;
    margin-left: 180px;
    margin-top: -21.5px;

  }
  .link-li:hover{
    cursor: pointer;
    color: blue;
  }
  .no-data {
    width: 100%;
    height: 150px;
    line-height: 150px;
    text-align: center;
    background-color: white;
    margin-top: 20px;
    color: #666;
  }

</style>
