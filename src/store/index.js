import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
const state={
  loginState:false,
  userData:'',
  userDetail: '',
  merchantDataTemp:'',
  jobTemp:'',
  searchFactor:{
    account:'',
    jobName: '',
    jobType: '',
    jobArea: '',
    jobNature: '',
    jobPayMethod: '',
    modelFlag:'',
    sortMethod:'job_create_time',
    sortFlag:'desc',
    pageNum:1,
    pageSize: 5,
  },
  searchModel:false,
  currentMessage:'',
  messageList:{},
  unreadNum:0
};
const mutations = {
  changeMessageList(state,data){
    state.messageList = data
  },
  changeLoginState(state, data){
    state.loginState = data
  },
  changeUserData (state, data) {
    state.userData = data
  },
  changeUserDetail(state,data){
    state.userDetail = data
    if(state.userDetail != null && state.userDetail != '' && state.userDetail.label != null){
       Vue.set(state.userDetail,'labelList',state.userDetail.label.split('/'))
    }else if(state.userDetail != '') {
      Vue.set(state.userDetail,'labelList',[])
    }

  },
  changeJobTemp (state, data){
    state.jobTemp = data
  },
  changeMerchantDataTemp (state, data){
    state.merchantDataTemp = data
  },
  changeSearchFactor(state,data){
    state.searchFactor = data
  },
  changeSearchModel(state,data){
    state.searchModel = data
  },
  changeDateSortFlag(state,data){
    state.dateSortFlag = data
  },
  changeCurrentMessage(state,data){
    state.currentMessage = data
  },
  changeUnreadNum(state,data){
    state.unreadNum = data
  },
  logout(state){
    state.loginState=false,
      state.userData = ''
    state.userDetail= ''
    state.merchantDataTemp=''
    state.jobTemp=''
    state.searchFactor={
        account:'',
        jobName: '',
        jobType: '',
        jobArea: '',
        jobNature: '',
        jobPayMethod: '',
        modelFlag:'',
        sortMethod:'job_create_time',
        sortFlag:'desc',
        pageNum:1,
        pageSize: 5,
        messageList:{}
    }
    state.searchModel=false,
    state.currentMessage = ''
    state.unreadNum =  0
  }
};
const store = new Vuex.Store({
  state,
  mutations,
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })]
});
export default store
