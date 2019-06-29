<template>
  <div class="box">
    <div class="job-search">
      <el-card style="margin-top: 20px">
        <el-row v-show="!this.searchModel">
          <el-col :span="2">
            <b style="font-size: 12px">职位:</b>
          </el-col>
          <el-col :span="18">
            <label-visit class="label-list" @labelClick="searchJobByType"></label-visit>
          </el-col>
          <el-col :span="2">
            <b style="font-size: 12px;color: #666">搜索框</b>
          </el-col>
          <el-col :span="2">
            <el-switch
              @change="changeModel"
              v-model="searchModel"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </el-col>
        </el-row>
        <el-row v-show="this.searchModel">
          <el-col :span="2">
            <b style="font-size: 12px">搜索:</b>
          </el-col>
          <el-col :span="18">
              <input class="search-input" :value="jobName" placeholder="请输入名称或类别" ref="searchInput"></input>
            <el-button icon="el-icon-search" type="primary" size="mini" @click="searchInputClick"></el-button>
          </el-col>
          <el-col :span="2">
            <b style="font-size: 12px;color: #666">搜索框</b>
          </el-col>
          <el-col :span="2">
            <el-switch
              @change="changeModel"
              v-model="searchModel"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </el-col>
        </el-row>
        <el-row style="margin-top: 20px">
          <el-col :span="2">
            <b style="font-size: 12px">城市:</b>
          </el-col>
          <el-col :span="22">
            <city-visit class="label-list" @labelClick="searchJobByArea"></city-visit>
          </el-col>
        </el-row>
        <el-row style="margin-top: 30px" v-if="this.jobType !=='' || this.jobArea !==''">
          <el-col :span="2">
            <b style="font-size: 12px">已选:</b>
          </el-col>
          <el-col :span="22">
            <el-tag
              v-show="this.jobType !==''"
              closable
              type="warning"
              @close="handleClose1()"
              style="cursor: pointer;">
              {{jobType}}
            </el-tag>
            <el-tag
              v-show="this.jobArea !==''"
              closable
              type="warning"
              @close="handleClose2()"
              style="cursor: pointer;">
              {{jobArea}}
            </el-tag>
          </el-col>
        </el-row>
      </el-card>
      <el-card style="margin-top: 10px">
        <el-row>
          <el-col :span="15">
            <el-dropdown @command="handleCommand1">
              <span class="el-dropdown-link">
                {{getJobNatureTittle}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command=''>不限</el-dropdown-item>
                <el-dropdown-item command="小时工">小时工</el-dropdown-item>
                <el-dropdown-item command="全天">全天</el-dropdown-item>
                <el-dropdown-item command="短期">短期</el-dropdown-item>
                <el-dropdown-item command="长期">长期</el-dropdown-item>
                <el-dropdown-item command="暑期工">暑期工</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown @command="handleCommand2" style="margin-left: 20px">
              <span class="el-dropdown-link">
                {{getJobPayMethodTittle}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command=''>不限</el-dropdown-item>
                <el-dropdown-item command="次结">次结</el-dropdown-item>
                <el-dropdown-item command="日结">日结</el-dropdown-item>
                <el-dropdown-item command="月结">月结</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
          <el-col :span="9">
            <el-col :span="6">
              <b style="font-size: 12px;color: #666">排序方式:</b>
            </el-col>
            <el-col :span="6">
              <el-dropdown @command="handleCommand4" >
              <span class="el-dropdown-link">
                {{getSortMethodTittle}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="job_create_time">发布时间</el-dropdown-item>
                  <el-dropdown-item command="avg_salary">薪资</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
              <el-col :span="6">
                <el-dropdown @command="handleCommand3" >
              <span class="el-dropdown-link">
                {{getSortFlagTittle}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="desc">降序</el-dropdown-item>
                    <el-dropdown-item command="asc">升序</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
          </el-col>
        </el-row>
      </el-card>
      <div class="no-data" v-if="this.pageTotal=== 0">无符合条件工作</div>
      <visit-job :data-url="dataUrl" :query-bean="queryData" @computeHeight="getHeight" style="width: 100%"></visit-job>
    </div>
    <div class="footer" :style="{'margin-top':this.marginHeight+'px'}"></div>
  </div>
</template>

<script>
  import LabelVisit from "../childComponents/labelVisit";
  import CityVisit from "../childComponents/cityVisit";
  import VisitJob from "../job/VisitJob";

  export default {
    name: "jobSearch",
    components: {VisitJob, CityVisit, LabelVisit},
    data() {
      return {
        jobNatureTittle: this.$store.state.searchFactor.jobNature,
        jobPayMethodTittle: this.$store.state.searchFactor.jobPayMethod,
        dataUrl: '/job/select_job_by_factor',

        account:this.$store.state.searchFactor.account,
        jobName: this.$store.state.searchFactor.jobName,
        jobType: this.$store.state.searchFactor.jobType,
        jobArea: this.$store.state.searchFactor.jobArea,
        jobNature: this.$store.state.searchFactor.jobNature,
        jobPayMethod: this.$store.state.searchFactor.jobPayMethod,
        modelFlag: this.$store.state.searchFactor.modelFlag,
        sortMethod:this.$store.state.searchFactor.sortMethod,
        sortFlag:this.$store.state.searchFactor.sortFlag,

        searchModel:this.$store.state.searchModel,
        marginHeight: 40,
        pageTotal: 1,
      }

    },
    methods: {
      parentChangeAccount(parentAccount){
        this.account = parentAccount
      },
      searchJobByType(label) {
        this.jobType = label
      },
      searchJobByArea(label) {
        this.jobArea = label
      },
      handleClose1() {
        this.jobType = ''
      },
      handleClose2() {
        this.jobArea = ''
      },
      handleCommand1(command) {
        if (command === '') {
          this.jobNatureTittle = '工作性质'
          this.jobNature = command
        } else {
          this.jobNatureTittle = command
          this.jobNature = command
        }
      },
      handleCommand2(command) {
        if (command === '') {
          this.jobPayMethodTittle = '薪资方式'
          this.jobPayMethod = command
        } else {
          this.jobPayMethodTittle = command
          this.jobPayMethod = command
        }
      },
      handleCommand3(command){
        this.sortFlag =command
      },
      handleCommand4(command){
        this.sortMethod = command
      },
      getHeight(total) {
        this.pageTotal = total
        this.marginHeight = 50
        if (total >= 3) {
          return
        } else {
          this.marginHeight = this.marginHeight + (3 - total) * 110
        }
      },
      changeModel:function () {
        this.$store.commit('changeSearchModel',this.searchModel)
        if(this.$store.state.searchModel){
          this.modelFlag = 'special'
        }else {
          this.modelFlag = ''
        }
        this.jobType =''
        this.jobName =''
      },

      searchInputClick:function () {
        this.jobName = this.$refs.searchInput.value
      }
    },
    computed: {
      getJobNatureTittle(){
        if(this.jobNatureTittle === ''){
          return '工作性质'
        }else {
          return this.jobNatureTittle
        }
      },
      getJobPayMethodTittle(){
        if(this.jobPayMethodTittle === ''){
          return '结算方式'
        }else {
          return this.jobPayMethodTittle
        }
      },
      getSortFlagTittle(){
        if(this.$store.state.searchFactor.sortFlag === 'asc'){
          return '升序'
        }else {
          return '降序'
        }
      },
      getSortMethodTittle(){
        if(this.$store.state.searchFactor.sortMethod === 'job_create_time'){
          return '发布时间'
        }else {
          return '薪资'
        }
      },
      queryData() {
        return {
          account:this.account,
          jobName: this.jobName,
          jobType: this.jobType,
          jobArea: this.jobArea,
          jobNature: this.jobNature,
          jobPayMethod: this.jobPayMethod,
          sortMethod:this.sortMethod,
          sortFlag:this.sortFlag,
          modelFlag: this.modelFlag
        }
      },
    }
  }
</script>

<style scoped>
  .box {
    width: 100%;
  }

  .job-search {
    width: 50%;
    margin: 0 auto;
  }

  .label-list {
    margin-left: -60px;
    margin-top: -20px;
  }

  .footer {
    width: 100%;
    height: 100px;
    background-color: #4B4B4B;
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

  .search-input{
    width: 300px;
    height: 20px;
    font-size: 12px;
    line-height: 100%;
    box-sizing: border-box;
    padding: 15px 20px;
    color: #4B4B4B;
    border: 1px solid;
    border-radius: 5px;
  }
</style>
