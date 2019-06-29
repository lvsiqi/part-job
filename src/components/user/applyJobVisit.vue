<template>
    <div style="width: 100%">
      <div class="apply-visit">
        <el-row>
          <el-col :span="5">
            <div :class="{ 'div-tittle': true, 'div-tittle-active': this.activeNum ===1 }" @click="changeActive(1)">待审核</div>
          </el-col>
          <el-col :span="5">
            <div :class="{ 'div-tittle': true, 'div-tittle-active': this.activeNum ===2 }" @click="changeActive(2)">审核通过</div>
          </el-col>
          <el-col :span="5">
            <div :class="{ 'div-tittle': true, 'div-tittle-active': this.activeNum ===3 }" @click="changeActive(3)">审核未通过</div>
          </el-col>
        </el-row>
        <div class="no-data" v-if="this.pageTotal=== 0">无符合条件信息</div>
        <visit-apply :data-url="this.dataUrl" :query-bean="this.queryData" @computeHeight="getHeight" style="margin-top: 10px"></visit-apply>
      </div>
    </div>
</template>

<script>
    import VisitJob from "../job/VisitJob";
    import VisitApply from "./childComponents/VisitApply";
    import constant from "../../constants/constants";
    export default {
        name: "applyJobVisit",
      components: {VisitApply, VisitJob},
      data(){
          return{
            activeNum:1,
            dataUrl :'/user/apply_job/select_apply_by_factor',
            state:'待审核',
            pageTotal:1
          }
      },
      methods:{
          changeActive(num){
            this.activeNum = num
            switch (num) {
              case 1: this.state = constant.job_apply_check
                      break;
              case 2: this.state = constant.job_apply_pass
                      break;
              case 3: this.state = constant.job_apply_refuse
                      break;
            }
          },
        getHeight(total){
           this.pageTotal = total
        }
      },
      computed:{
          queryData(){
            return{
              userAccount:this.$store.state.userData.account,
              state:this.state
            }
          }
      }
    }
</script>

<style scoped>
  .apply-visit {
    margin: 20px auto;
    width: 50%;
    background-color: white;
  }
  .div-tittle {
    font-size: 18px;
    line-height: 35px;
    color: #666;
    width: 200px;
    height: 35px;
    text-align: center;
  }
  .div-tittle:hover {
    font-size: 18px;
    line-height: 35px;
    color: #666;
    width: 200px;
    height: 35px;
    text-align: center;
    cursor: pointer;
  }
  .div-tittle-active{
    font-size: 18px;
    line-height: 35px;
    color: #2788f3;
    border-bottom: 2px solid #2788f3;
    width: 200px;
    height: 35px;
    text-align: center;
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
