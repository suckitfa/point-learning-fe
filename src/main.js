import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import XLSX from 'xlsx'
import '@/assets/css/common.less';
import '@/assets/css/variable.less';
import '@/assets/css/theme/459f75/index.css';
//import '@/assets/js/directive.js';
// import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import echarts from 'echarts';
import Vuex from 'vuex'

require('./mock');
//挂载Vuex
Vue.use(Vuex)
Vue.config.productionTip = false;
Vue.use(ElementUI, {size: 'medium'});
Vue.prototype.$axios = axios; // axios不能使用use
Vue.prototype.$echarts = echarts;
Vue.use(XLSX)

const store = new Vuex.Store({
  state:sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')):{
      //存放的键值对就是所要管理的状态
      artcle:[],  //点击查看时保存文章文章信息
      user:[],    //
      editstudent:[], //点击编辑学生信息时保存学生信息
  },
  mutations: {
    setUser(state,user){
      state.user=user;
    },
    setArtcle(state,artcle){    //保存文章信息
      state.artcle=artcle;
    },
    
    setEditStudent(state,editstudent){    //保存所需编辑学生的信息
      state.editstudent=editstudent;
    },
  },
  strict: true,
  getters: {
    artcleInfo(state){            //获得文章信息
      return state.artcle;
    },
    userInfo(state){
      return state.user;
    },
    
    getEditStudent(state){      //获取所需编辑学生的信息
      return state.editstudent;
    },
  }
})


new Vue({
  el: '#app',
  router,
  store,  
  components: {App},
  template: '<App/>'
});
