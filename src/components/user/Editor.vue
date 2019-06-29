<template>
  <div class="edit_container">
    <quill-editor
      v-model="myData.evaluation"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
      @change="onEditorChange($event)">
    </quill-editor>
    <div class="btn-box">
      <el-button type="success" icon="el-icon-check" circle @click="saveContent"></el-button>
      <el-button type="danger" icon="el-icon-delete" circle @click="clearContent"></el-button>
    </div>
  </div>
</template>
<script>
  import constant from "../../constants/constants";
  export default {
    name: "Editor",
    data() {
      return {
        myData: {
          account: this.$store.state.userData.account,
          evaluation: this.$store.state.userDetail.evaluation,
        },
        editorOption: {
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],        //加粗，斜体，下划线，删除线
              ['blockquote', 'code-block'],         //引用，代码块


              [{'header': 1}, {'header': 2}],               // 标题，键值对的形式；1、2表示字体大小
              [{'list': 'ordered'}, {'list': 'bullet'}],          //列表
              [{'script': 'sub'}, {'script': 'super'}],      // 上下标
              [{'indent': '-1'}, {'indent': '+1'}],          // 缩进
              [{'direction': 'rtl'}],                         // 文本方向


              [{'size': ['small', false, 'large', 'huge']}],  // 字体大小
              [{'header': [1, 2, 3, 4, 5, 6, false]}],         //几级标题


              [{'color': []}, {'background': []}],          // 字体颜色，字体背景颜色
              [{'font': []}],         //字体
              [{'align': []}],        //对齐方式


              ['clean'],        //清除字体样式
              /* ['image','video']        //上传图片、上传视频*/

            ]
          },
        }
      }
    },
    computed: {
      getSubmitUrl() {
        if (this.$store.state.userDetail != null) {
          return '/user_detail/update'
        } else {
          return '/user_detail/add'
        }
      },
      editor() {
        return this.$refs.myQuillEditor.quill;
      },
    },
    methods: {
      onEditorReady(editor) { // 准备编辑器

      },
      onEditorBlur() {
      }, // 失去焦点事件
      onEditorFocus() {
      }, // 获得焦点事件
      onEditorChange() {
      }, // 内容改变事件
      saveContent() {
        this.axios({
          method: 'post',
          url: constant.api_url + this.getSubmitUrl,
          data: this.myData
        }).then(result => {
          if (result.data.state === constant.system_success) {
            this.$store.commit('changeUserDetail', result.data.messages)
            this.$message.success("修改成功")
            this.$emit('changeShow3')
          } else {
            this.$message.error(result.data.messages);
          }

        }).catch(error => {
          this.$message.error("数据请求错误");
        })
      },
      clearContent() {
        this.myData.introduce = ''
      },
      cancle: function () {
        this.$emit('changeShow3')
      }
    },
  }
</script>
<style scoped>

  .btn-box {
    width: 100px;
    margin: 0 auto;
  }

  .quill-editor {
    margin: 0 auto;
  }

</style>

