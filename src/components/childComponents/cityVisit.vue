<template>
  <div>
    <ul style="list-style: none;">
      <el-popover
        placement="bottom-start"
        trigger="hover"
        v-for="(data,index) in citys" :key="index">
        <ul class="label-ul">
          <li class="label-ul-li" v-for="(item,index2) in data.area" :key="index2" @click="labelClick(data.city+'/'+item)">
            {{item}}
          </li>
        </ul>
        <li slot="reference" class="label-ul-li-tittle" @click="changeColor(index)" :class='{active:index ===number}'>
          {{data.city}}
        </li>
      </el-popover>
    </ul>
  </div>
</template>

<script>
    import constant from "../../constants/constants";

    export default {
        name: "cityVisit",
      data() {
        return {
          citys: '',
          number: -1
        }
      },
      created() {
        this.getGroups()
      },
      methods: {
        getGroups: function () {
          this.axios({
            method: 'post',
            url: constant.api_url + '/city/get_all_area',
          }).then(result => {
            this.citys = result.data
          }).catch(error => {
            this.$message.error("数据请求错误");
          })
        },

        changeColor: function (index) {
          this.number = index;
        },

        labelClick(item) {
          this.$emit('labelClick', item)
        },
      },
    }
</script>

<style scoped>
  .label-ul-li {
    float: left;
    max-width: 110px;
    overflow: hidden;
    white-space: nowrap;
    border-right: 1px solid #eee;
    font-size: 12px;
    line-height: 22px;
    color: #666;
    letter-spacing: 0;
    padding: 0 8px;
  }

  .label-ul-li:hover {
    color: #ff6e16;
    cursor: pointer;
  }

  .label-ul {
    margin-left: -40px;
  }

  .label-ul-li-tittle {
    float: left;
    font-size: 14px;
    max-width: 110px;
    overflow: hidden;
    white-space: nowrap;
    letter-spacing: 0;
    padding: 5px 14px;
    margin-top: 3px;
  }

  .label-ul-li-tittle:hover {
    color: #ff6e16;
    cursor: pointer;
  }
  .active{
    color: #ff6e16;
  }
</style>
