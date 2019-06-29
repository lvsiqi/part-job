<template>
    <div class="job-message-change">
      <el-row type="flex" style="margin: 0 auto;position: relative;top: 40px">
        <el-col :span="24">
          <el-form label-width="130px">
            <el-form-item label="爱好:">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="请填写个人爱好"
              v-model="message.hobby"
              @focus="openMessage('请填写个人爱好')">
            </el-input>
            </el-form-item>
            <el-form-item label="特长:">
              <el-input
                type="textarea"
                :rows="3"
                placeholder="请填写个人特长"
                v-model="message.speciality"
                @focus="openMessage('请填写个人特长')">
              </el-input>
            </el-form-item>
            <el-form-item label="期望行业类别:">
              <el-select v-model="query.groupNames" multiple :multiple-limit="3" placeholder="请选择" @visible-change="getOptionData" @change="getLabel">
                <el-option
                  v-for="item in options"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="期望工作类别:" v-if="Labels.length != 0">
              <el-collapse>
                <el-collapse-item
                  v-for="(labelGroup, index) in Labels"
                  :key="index"
                  :title="labelGroup.groupName">
                  <el-tag
                    :class="{active : message.labelList.indexOf(label)>=0}"
                    v-for="label in labelGroup.labelValues"
                    :key="label"
                    @click="MyhandClick(label)"
                    style="margin-left: 10px; cursor: pointer;">
                    {{label}}
                  </el-tag>
                </el-collapse-item>
              </el-collapse>
            </el-form-item>
           <div class="label-selected" v-if="message.labelList.length>0">
             <el-divider><p>已选择</p></el-divider>
             <el-tag
               v-for="label in message.labelList"
               :key="label"
               closable
               type="success"
               @close="handleClose(label)"
               style="margin-left: 10px; margin-top:10px; cursor: pointer;">
               {{label}}
             </el-tag>
           </div>
            <el-form-item>
              <el-button type="primary" @click="submitUpdate()">提交</el-button>
              <el-button @click="cancle" >取消</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    import constant from "../../constants/constants";

    export default {
        name: "jobMessageChange",
      data()
      {
        return{
          query:{
            groupNames:[]
          },
          options:[],
          Labels:[],
          message:{
            hobby: this.$store.state.userDetail.hobby,
            speciality:this.$store.state.userDetail.speciality,
            labelList:this.$store.state.userDetail.labelList,
            account:this.$store.state.userData.account
          },
        }
      },
      computed:{
         getSubmitUrl(){
           if(this.$store.state.userDetail.account != null)
           {
             return '/user_detail/update'
           }else {
             return '/user_detail/add'
           }
         },
      },
      methods:{
        openMessage(message) {
          this.$notify.info({
            title: '提示',
            dangerouslyUseHTMLString: true,
            message: "<Strong style='color: #409EFF'>" + message + "</Strong>",
            offset: 100,
          });
        },
        getOptionData(event) {
          if (event) {
            this.axios({
              method: 'post',
              url: constant.api_url + '/user_label/get_all_group',
            }).then(result => {
              this.options = result.data.messages
            }).catch(error => {
              this.$message.error("数据请求错误");
            })
          }
        },
        handleClose(tag) {
         this.message.labelList.splice(this.message.labelList.indexOf(tag), 1);
        },
        getLabel(){
          this.axios({
            method: 'post',
            url: constant.api_url + '/user_label/get_label_by_group',
            data:this.query
          }).then(result => {
            this.Labels = result.data.messages
          }).catch(error => {
            this.$message.error("数据请求错误");
          })
        },
        MyhandClick(name){
          if(this.message.labelList.indexOf(name)<0){
            if(this.message.labelList.length>4){
              this.$message.error("最多选择5个");
            }else {
              this.message.labelList.push(name)
            }
          } else{
            this.message.labelList.splice(this.message.labelList.indexOf(name),1)
          }
        },
        submitUpdate(){
          this.axios({
            method: 'post',
            url: constant.api_url + this.getSubmitUrl,
            data:this.message
          }).then(result => {
            if(result.data.state === constant.system_success){
              this.$store.commit('changeUserDetail',result.data.messages)
              this.$message.success("修改成功");
              this.$emit('changeShow2')
            }else {
              this.$message.error(result.data.messages);
            }

          }).catch(error => {
            this.$message.error("数据请求错误");
          })
        },
        cancle: function () {
          this.$emit('changeShow2')
        }
      },
    }
</script>

<style scoped>
.job-message-change{

}
.active {
  background: #fd7522;
  border: 1px solid #fd7522;
  color: #fff;
}
.label-selected{
  width: 300px;
  height: 150px;
  margin-left: 130px;
  border-radius: 25px;
}
</style>
