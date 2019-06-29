<template>
  <div class="box">
    <div class="show-company">
      <div class="base-message">
        <el-row>
          <el-col :span="4">
            <img src="../../../../static/img/company_default.png" width="120px"
                 style="margin-top: 20px;margin-left: 20px">
          </el-col>
          <el-col :span="20">
            <div class="text-company">
              <el-row>
                <el-col :span="24">
                  <b style="font-size: 30px;color: #444444">{{merchantData.company.name}}</b>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <ul class="text-ul">
                    <li class="text-ul-li">
                      <b class="text-ul-li-b">{{merchantData.company.type}}</b>
                      <span class="text-ul-li-span">所属行业</span>
                    </li>
                    <li class="text-ul-li">
                      <b class="text-ul-li-b">{{merchantData.company.scale}}</b>
                      <span class="text-ul-li-span">规模</span>
                    </li>
                    <li class="text-ul-li">
                      <b class="text-ul-li-b">{{new Date(merchantData.company.registerTime).Format("yyyy年MM月dd日")}}</b>
                      <span class="text-ul-li-span">注册时间</span>
                    </li>
                  </ul>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div :class="{ 'div-tittle': true, 'div-tittle-active': this.activeNum ===1 }" @click="changeActive(1)">
              公司信息
            </div>
          </el-col>
          <el-col :span="5">
            <div :class="{ 'div-tittle': true, 'div-tittle-active': this.activeNum ===2 }" @click="changeActive(2)">
              招聘职位
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="company-detail" v-show="activeNum ===1">
        <el-row>
          <h3>公司基本信息</h3>
        </el-row>
        <i class="li-split">——</i>
        <el-row>
          <el-col :span=24>
            <div>
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
              <div class="text-div">
                <span class="text-tittle">所属人:&nbsp&nbsp</span>
                <span class="text-content">{{merchantData.company.owner}}</span>
              </div>
              <div class="text-div">
                <span class="text-tittle">业务范围:&nbsp&nbsp</span>
                <span class="text-content">{{merchantData.company.business}}</span>
              </div>
              <div class="text-div">
                <span class="text-tittle">公司简介:&nbsp&nbsp</span>
                <span class="text-content" v-html="merchantData.company.introduce"></span>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <job-search v-show="activeNum===2" style="width: 199.8%;margin-left: -420px" ref="searchChild"></job-search>
    </div>
  </div>
</template>

<script>
  import JobSearch from "../../search/jobSearch";
  export default {
    name: "visitCompany",
    components: {JobSearch},
    data() {
      return {
        activeNum: 1,
        searchFactor:{
          account : 2
        }
      }
    },
    methods: {
      changeActive(num) {
        this.activeNum = num
        if(num === 2){
          this.$refs.searchChild.parentChangeAccount(this.merchantData.company.account)
        }
      },
    },
    computed: {
      merchantData() {
        return this.$store.state.merchantDataTemp
      }
    }

  }
</script>

<style scoped>
  .box {
    width: 100%;
  }

  .show-company {
    width: 50%;
    margin: 0 auto;
    margin-top: 40px;
  }

  .base-message {
    width: 100%;
    height: 182px;
    background: white;
  }

  .text-company {
    width: 80%;
    height: 120px;
    margin-top: 20px;
    margin-left: 40px;
  }

  .text-ul {
    list-style: none;
    margin-left: -40px;
    margin-top: 20px;
  }

  .text-ul-li {
    display: list-item;
    float: left;
    margin-right: 30px;
  }

  .text-ul-li-b {
    display: block;
    margin-bottom: 3px;
    font-weight: 700;
    text-align: center;
    font-size: 14px;
    line-height: 16px;
    color: #4b4b4b;
  }

  .text-ul-li-span {
    font-size: 12px;
    line-height: 14px;
    color: #999;
  }

  .div-tittle {
    font-size: 18px;
    line-height: 35px;
    color: #666;
    width: 150px;
    height: 35px;
    text-align: center;
  }

  .div-tittle:hover {
    font-size: 18px;
    line-height: 35px;
    color: #666;
    width: 150px;
    height: 35px;
    text-align: center;
    cursor: pointer;
  }

  .div-tittle-active {
    font-size: 18px;
    line-height: 35px;
    color: #2788f3;
    border-bottom: 2px solid #2788f3;
    width: 150px;
    height: 35px;
    text-align: center;
  }

  .company-detail {
    width: 90%;
    background: white;
    margin-top: 30px;
    padding: 30px 40px;
  }

  .company-detail h3 {
    float: left;
    font: 400 20px/1em "hiragino sans gb", "microsoft yahei";
    color: #4b4b4b;
    height: 1em;
  }

  .li-split {
    font-size: 30px;
    color: #c6c6c6;
  }

  .text-div{
    margin-top: 7px;
  }
  .text-tittle {
    color: #999;
    font-size: 16px;
  }

  .text-content {
    color: #666;
    font-size: 16px;
  }
</style>
