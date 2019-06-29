<template>
  <div class="visit-apply">
    <el-row type="flex" justify="center" v-for="(job,index) in applyJobPage" :key="index" style="margin-top: 5px">
      <el-col :span="24">
        <el-card shadow="hover" @click.native="showDetail(job.partTimeJob)">
          <el-row>
            <el-col :span="20">
              <span class="tittle">
               {{job.partTimeJob.name}}
             </span>
              <span style="font-size: 15px; color: #666; margin-left: 55px">
                  申请时间:
                </span>
              <span style="font-size: 13px; color: #ff5959;">
                 {{new Date(job.applyForJob.createTime).Format("yyyy-MM-dd")}}
                </span>
            </el-col>
            <el-col :span="4">
              {{job.partTimeJob.companyName}}
            </el-col>
          </el-row>
          <el-row >
            <el-col :span="20" class="require-message-col">
              <p class="salary">{{job.partTimeJob.salary}}</p>
              <ul class="require-message-ul">
                <li class="require-message-ul-li">{{job.partTimeJob.area}}</li>
                <li class="require-message-ul-li">{{job.partTimeJob.jobNature}}</li>
                <li class="require-message-ul-li">{{job.partTimeJob.payMethod}}</li>
              </ul>
            </el-col>
            <el-col :span="4">
              <p style="font-size: 12px ;color: #666;">规模 : {{job.partTimeJob.companyScale}}</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <div class="message-foot">
                <span style="font-size: 15px; color: #666;">
                  招聘人数:
                </span>
                <span style="font-size: 15px; color: #ff5959;margin-left: 5px">
                  {{job.partTimeJob.peopleNum}}
                </span>
                <span style="font-size: 15px; color: #666; margin-left: 15px">
                  发布时间:
                </span>
                <span style="font-size: 13px; color: #ff5959;">
                 {{new Date(job.partTimeJob.createTime).Format("yyyy-MM-dd")}}
                </span>
              </div>
            </el-col>
            <el-col :span="4">
              <span style="font-size: 15px; color: #666;">
                  状态:
              </span>
              <span style="font-size: 13px; color: #ff5959;">
                 {{job.applyForJob.state}}
              </span>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" style="margin-top: 20px">
      <el-col :span="10">
        <div class="block" v-if="total>0">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            background
            :current-page="queryForm.pageNum"
            :page-size="queryForm.pageSize"
            :page-sizes="pageSizes"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import constant from "../../../constants/constants";
  export default {
    name: "VisitApply",
    props:{
      dataUrl: {
        type: String,
        require: true
      },
      queryBean: {
        type: Object,
        default:function () {
          return{
            userAccount:'',
            state:'',
            pageNum:1,
            pageSize: 5,
          }
        }
      }
    },
    data() {
      return {
        queryForm:{
          pageNum:this.$store.state.searchFactor.pageNum,
          pageSize: this.$store.state.searchFactor.pageSize,
        },
        applyJobPage:[],
        total: 0,
        pageSizes: [1,5,10,10,40,50],
        visible : false
      };
    },
    computed:{
      query(){
        let temp = Object.assign({}, this.queryBean)
        this.$set(temp,'pageNum',this.queryForm.pageNum)
        this.$set(temp,'pageSize',this.queryForm.pageSize)
        return temp
      },
    },
    watch:{
      queryBean(){
        this.getData()
      }
    },
    methods: {
      getData(){
        this.axios({
          method: 'post',
          url: constant.api_url + this.dataUrl,
          data: this.query
        }).then(result => {
          this.applyJobPage = result.data.messages.applyJobs
          this.total = result.data.messages.total
          this.$emit('computeHeight', this.total)
        }).catch(error => {
          this.$message.error("数据请求错误");
        })
      },
      handleSizeChange(val) {
        this.queryForm.pageSize = val
        this.getData()
      },
      handleCurrentChange(val) {
        this.queryForm.pageNum = val
        this.getData()
      },
      showDetail(job){
        this.$store.commit('changeJobTemp', job)
        this.$router.push('/job_detail')
      }
    },
    created() {
      this.getData()
    }
  }
</script>

<style scoped>
  .visit-apply {

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
</style>
