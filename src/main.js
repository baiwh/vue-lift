// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'

Vue.use(Vuex);
Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    taskIdStore: '',
    gradeIdStore: '',
    tagStore: '',
    detailStore: [],
    toGet:'ok',
    titleStore:'',
    navLinkTo:'/home'
  },
  mutations: {
    //获取itemBox中需要的taskId
    updateStoreTaskId(state, taskIdStore){
      state.taskIdStore = taskIdStore;
    },
    //获取itemBox中grade的颜色序号
    updateStoreGrade(state, gradeIdStore){
      state.gradeIdStore = gradeIdStore;
    },
    //获取itemBox中的tag
    updateStoreTag(state, tagStore){
      state.tagStore = tagStore;
    },
    //修改detail的item列表
    updateStoreDetail(state, detailStore){
      state.detailStore = detailStore;
    },
    //控制获取detial时get的执行次数
    changeToGet(state,toGet){
      state.toGet = toGet;
    },
    //标题
    updateStoreTitle(state,titleStore){
      state.titleStore = titleStore;
    },
    //导航
    updateNavLinkTo(state,navLinkTo){
      state.navLinkTo=navLinkTo;
    }
  },
  actions: {
    //detail的item的get请求
    updateStoreDetail({commit,state}){
      //如果taskId非空。且允许执行
      if (state.taskIdStore != ''&&state.toGet=='ok') {
        axios.get('/taskDetail/getDetailJson.action?', {
          params: {
            taskId: state.taskIdStore
          },
          baseURL: '/liftVue',
          withCredentials: false
        }).then((res)=>{
          let list=res.data.data;
          commit('updateStoreDetail',list);
          //停止执行
          commit('changeToGet','stop');
        })
      }
    }


  }


});



/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {App},
  computed: {},
  mounted: function () {

  },
  methods: {}
})
