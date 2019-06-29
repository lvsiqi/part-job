<template>
  <div style="width: 100%">
    <div class="box">
      <el-row>
        <el-col :span="17">
          <div class="job-detail">
            <el-card>
              <el-row>
                <el-col :span="20">
                  <b class="tittle">{{job.name}}&nbsp&nbsp&nbsp({{job.area}})</b>
                </el-col>
                <el-col :span="3">
                  <p style="color: #666">{{job.companyName}}({{job.account}})</p>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="20" class="require-message-col">
                  <strong class="salary">{{job.salary}}</strong>
                  <ul class="require-message-ul">
                    <li class="require-message-ul-li">{{job.jobNature}}</li>
                    <li class="require-message-ul-li">{{job.payMethod}}</li>
                    <li class="require-message-ul-li">{{job.peopleNum}} 人</li>
                  </ul>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="20">
                  <b>
                    发布时间: {{new Date(job.createTime).Format("yyyy-MM-dd")}}
                  </b>
                  &nbsp&nbsp&nbsp
                  <b>
                    类别: {{job.type}}
                  </b>
                </el-col>
                <el-col :span="4">
                  <el-button type="primary" round @click="replay(job)">报名参加</el-button>
                </el-col>
              </el-row>
            </el-card>
            <p></p>
            <el-card>
              <el-row>
                <el-col :span="20">
                  <b class="tittle">职位详情</b>
                </el-col>
                <el-col :span="4">
                  <el-button type="success" icon="el-icon-message"  round @click="toChat" v-show="this.$store.state.loginState">沟通</el-button>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <p>职位要求:</p>
                  <el-input type="textarea" :rows="4" :value="job.require" :disabled="true"
                            style="font-size: 18px;-webkit-text-fill-color: black;"></el-input>
                  <p>职位描述：</p>
                  <el-input type="textarea" :rows="4" :value="job.describe" :disabled="true"
                            style="font-size: 18px;-webkit-text-fill-color: black;"></el-input>
                  <p>工作内容：</p>
                  <el-input type="textarea" :rows="4" :value="job.work" :disabled="true"
                            style="font-size: 18px;-webkit-text-fill-color: black;"></el-input>
                  <p>薪资待遇：</p>
                  <strong class="salary">{{job.salary}}</strong>
                </el-col>
              </el-row>
            </el-card>
            <p></p>
            <el-card>
              <p>工作地点：</p>
              {{job.address}}
            </el-card>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="company">
            <p>
              <b style="color: #409EFF;font-size: 20px">商家信息</b>
            </p>
            <img src="../../../static/img/company_default.png" width="100px">
            <el-row style="margin-top: 15px">
              <el-col :span="24">
                <i class="el-icon-suitcase"><b>&nbsp&nbsp{{merchantData.company.name}}</b></i>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span=24>
                <div style="margin-left: 60px">
                <div class="text-div">
                  <span class="text-tittle">行业类别:&nbsp&nbsp</span>
                  <span class="text-content">{{merchantData.company.type}}</span>
                </div>
                <div class="text-div">
                  <span class="text-tittle">注册时间:&nbsp&nbsp</span>
                  <span class="text-content">{{new Date(merchantData.company.registerTime).Format("yyyy年MM月dd日")}}</span>
                </div>
                  <div class="text-div">
                    <span class="text-tittle">公司规模:&nbsp&nbsp</span>
                    <span class="text-content">{{merchantData.company.scale}}</span>
                  </div>
                </div>
              </el-col>
            </el-row>
            <div style="text-align: center;margin-top: 15px;color: #999">----------------------------</div>
            <div class="show-company" @click="showCompany()">查看该公司全部信息 ></div>
          </div>
        </el-col>
      </el-row>
    </div>
    <p></p>
    <p></p>
    <div class="footer">

    </div>
  </div>
</template>

<script>
  import constant from "../../constants/constants";

  export default {
    name: "JobDetail",
    data() {
      return {
        job: this.$store.state.jobTemp,
        queryMerchant: {
          account: this.$store.state.jobTemp.account
        },
        merchantData: ''
      }

    },
    methods: {
      toChat(){
        this.$router.push(
          {
            name: 'MessageChat',
            params :{
              acceptAccount: this.$store.state.jobTemp.account
            }
          }
        )
      },
      replay(job) {
        if (this.$store.state.userData === null || this.$store.state.userData === '') {
          this.$message.error("请先登录");
          event.stopPropagation()
          return
        }else if(this.$store.state.userData.name === null || this.$store.state.userData.name ===''){
          this.$message.error("请先补全基本信息");
          event.stopPropagation()
          return
        }
        let replayJob = {
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
          } else {
            this.$message.error(result.data.messages);
          }
        }).catch(error => {
          this.$message.error("数据请求错误");
        })
        event.stopPropagation()
      },
      getMerchantData() {
        this.axios({
          method: 'post',
          url: constant.api_url + '/merchant/get_merchant_data_by_account',
          data: this.queryMerchant
        }).then(result => {
          if (result.data.state === constant.system_success) {
            this.merchantData = result.data.messages
          }
        }).catch(error => {
          this.$message.error("数据请求错误");
        })

      },
      showCompany(){
        this.$store.commit('changeMerchantDataTemp',this.merchantData)
        this.$router.push('/visit_company')
      }
    },
    created() {
      this.getMerchantData()
    }
  }
</script>

<style scoped>
  .job-detail {
    width: 100%;
    margin: 0 auto;
  }

  .company {
    width: 90%;
    float: right;
    height: 400px;
    background-color: white;
    text-align: center;
  }

  .box {
    width: 60%;
    margin: 40px auto;
  }

  .tittle {
    float: left;
    font: 400 28px/40px "hiragino sans gb", "microsoft yahei";
    color: #4b4b4b;
    padding-right: 100px;
    width: 550px;
    word-break: break-all;
    word-wrap: break-word;
  }

  .salary {
    margin-top: 15px;
    line-height: 24px;
    height: 24px;
    font-size: 20px;
    color: #ff5959;
    float: left;
  }

  .require-message-col {
    height: 50px;
    display: inline-block;
    clear: both;
  }

  .require-message-ul {
    float: left;
    height: 20px;
  }

  .require-message-ul-li {
    float: left;
    max-width: 110px;
    overflow: hidden;
    white-space: nowrap;
    border-right: 1px solid #eee;
    font-size: 14px;
    color: #666;
    letter-spacing: 0;
    padding: 0 8px;
    margin-top: 4px;
  }

  .footer {
    width: 100%;
    height: 100px;
    background-color: #4B4B4B;
    margin-top: 40px;
  }

  .text-tittle {
    color: #999;
    font-size: 13px;
  }

  .text-content {
    color: #666;
    font-size: 13px;
  }
  .text-div{
    margin-top: 8px;
    float: left;
  }
  .show-company{
    color: #999;
    font-size: 12px;
    margin-top: 5px;
  }
  .show-company:hover{
    color:#409EFF ;
    cursor: pointer;
  }
</style>
