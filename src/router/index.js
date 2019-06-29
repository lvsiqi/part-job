import Vue from 'vue'
import Router from 'vue-router'
import index from "../components/main/index";
import main from "../components/main/main"
import JobDetail from "../components/job/JobDetail";
import pwdChange from "../components/user/pwdChange";
import baseChange from "../components/user/baseChange";
import jobMessageChange from "../components/user/jobMessageChange";
import messageChange from "../components/user/messageChange";
import jobSearch from "../components/search/jobSearch";
import applyJobVisit from "../components/user/applyJobVisit";
import visitCompany from "../components/user/childComponents/visitCompany";
import store from '../store'
import recommend from "../components/tool/recommend";
import messageChat from "../components/tool/messageChat";
Vue.use(Router)
const cleanPath =['/main','/pwd_change','/base_change','/job_message_change','/message_change','/apply_job_visit']
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      redirect: '/main',
      children: [
        {
          path: '/main',
          name: 'main',
          component: main
        },
        {
          path: '/job_detail',
          name: 'JobDetail',
          component: JobDetail
        },
        {
          path: '/pwd_change',
          name: 'pwdChange',
          component: pwdChange
        },
        {
          path: '/base_change',
          name: 'baseChange',
          component: baseChange
        },
        {
          path: '/job_message_change',
          name: 'jobMessageChange',
          component: jobMessageChange
        },
        {
          path: '/message_change',
          name: 'messageChange',
          component: messageChange
        },
        {
          path: '/search_job',
          name: 'searchJob',
          component: jobSearch
        },
        {
          path: '/apply_job_visit',
          name: 'applyJobVisit',
          component: applyJobVisit
        },
        {
          path: '/visit_company',
          name: 'visitCompany',
          component: visitCompany
        },
        {
          path: '/recommend',
          name: 'recommend',
          component: recommend
        },
        {
          path: '/message_chat',
          name: 'MessageChat',
          component: messageChat
        }
      ]
    }
  ],
  base:'/MyWeb/'   /*打包到生产环境设置访问根路径*/
});
router.beforeEach((to, from, next) => {
  let searchFactor = {
    account: '',
    jobName: '',
    jobType: '',
    jobArea: '',
    jobNature: '',
    jobPayMethod: '',
    modelFlag: '',
    sortMethod:'',
    sortFlag:'',
    pageNum: 1,
    pageSize: 5,
  }
    if (cleanPath.indexOf(to.path) > 0) {
      store.commit('changeSearchFactor', searchFactor)
      next()
    } else if(from.path === '/visit_company' && to.path !== '/job_detail') {
      store.commit('changeSearchFactor', searchFactor)
      next()
    }else {
      next()
    }
})
export default router
