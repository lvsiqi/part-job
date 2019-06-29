<template>
  <div class="main">
    <el-row>
      <el-col :span="24">
        <div class="main-header">
          <div class="search">
         <el-form>
          <el-row>
           <el-col :span="20">
             <el-form-item>
               <input class="search-input" v-model="jobName"></input>
             </el-form-item>
           </el-col>
            <button class="search-button" @click="searchByName()">搜索</button>
          </el-row>
         </el-form>
           <el-row  type="flex" justify="center">
             <el-col :span="24">
               <div class="text">
                 <p style="color: #666;">职位推荐:</p>
                 <label-visit @labelClick="searchJob" style="margin-top: -5px"></label-visit>
               </div>
             </el-col>
             <el-col :span="12">
               <div class="text">
                 <p style="color: #666;">地区推荐:</p>
                 <city-visit @labelClick="searchJob"></city-visit>
               </div>
             </el-col>
           </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
       <visit-job style="margin: 30px auto;width: 60%" :data-url="dataUrl"></visit-job>
      </el-col>
    </el-row>
    <div class="footer">

    </div>
  </div>
</template>

<script>
  import VisitJob from "../job/VisitJob";
  import constant from "../../constants/constants";
  import LabelVisit from "../childComponents/labelVisit";
  import CityVisit from "../childComponents/cityVisit";
  export default {
    name: "main",
    components: {CityVisit, LabelVisit, VisitJob},
    data() {
      return {
        jobName:'',
        jobType:'',
        groups: '',
        labels: '',
        dataUrl: '/job/select_job_by_factor',
      }
    },
    methods:{
      searchJob:function(label){
        this.jobType = label
        this.$set(this.$store.state.searchFactor,'jobType',label)
        this.$router.push('/search_job')
      },
      searchByName(){
        if(this.jobName.trim() !=='') {
          this.$set(this.$store.state.searchFactor, 'jobName', this.jobName)
          this.$store.commit('changeSearchModel', true)
          this.$set(this.$store.state.searchFactor, 'modelFlag', 'special')
          this.$router.push('/search_job')
        }
      }
    },
  }
</script>

<style scoped>
  .main-header {
    height: 400px;
    background-image: url("../../../static/img/background1.jpg");
  }

  .main {
    height: 100%;
  }
  .main-main{

  }
  .search{
    width: 800px;
    height: 100px;
    position: relative;
    top: 100px;
    margin: auto;
  }
  .search-input{
    width: 666px;
    height: 54px;
    font-size: 16px;
    line-height: 100%;
    box-sizing: border-box;
    padding: 15px 20px;
    color: #4B4B4B;
    border: #ff6e16 2px solid;
    background-color: rgba(255, 255, 255, 0.9);
  }
  .search-button{
    width: 111px;
    margin: 0;
    height: 56px;
    line-height: 56px;
    text-align: center;
    background-color: #fa0;
    color: #fff;
    font-size: 16px;
    border: 0;
    vertical-align: middle;
  }
  .text{
    width: 370px;
    display: inline-block;
    margin-top: 60px;
  }
  .text-li{
    display: inline-block;
    font-size: 14px;
    line-height: 22px;
    margin-right: 20px;
    margin-bottom: 15px;
  }
  .text-li:hover{
    color:#ff6e16;
    cursor: pointer;
  }
  .footer{
    width:100%;
    height: 100px;
    background-color:#4B4B4B;
    margin-top: 30px;
  }
</style>
