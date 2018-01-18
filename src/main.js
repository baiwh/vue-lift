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
    navLinkTo:'/home',
    taskList:[],
    toGetTask:'ok',
    tagList:[],
    toGetTag:'ok',
    taskIndex:'0',
    rateAnimation:''
  },
  mutations: {
    //修改taskIndex
    updateTaskIndex(state,taskIndex){
      state.taskIndex=taskIndex;
    },
    //修改进度条
    updateTaskRate(state,rate){
      state.taskList[rate.index].completedDetail=rate.completedDetail;
      state.taskList[rate.index].totalDetail=rate.totalDetail;
      state.rateAnimation=rate.completedDetail/rate.totalDetail;
    },
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
    },
    //获取taskList
    getTask(state,taskList){
      state.taskList=taskList;
    },
    changeToGetTask(state,toGetTask){
      state.toGetTask = toGetTask;
    },
    //获取tagList
    getTag(state,tagList){
      state.tagList=tagList;
    },
    changeToGetTag(state,toGetTag){
      state.toGetTag = toGetTag;
    },
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
    },
    //task的get
    getTask({commit,state}){
      // //如果taskId非空。且允许执行
      if (state.toGetTask=='ok') {
        axios.get('/task/getTaskList.action?', {
          params: {},
          baseURL: '/liftVue',
          withCredentials: false
        }).then((res) => {
          let task = res.data;
          let taskList = task.data;
          commit('getTask',taskList);
          //获取第一个task的id
          let taskIdStore = taskList[0].taskId;
          commit('updateStoreTaskId', taskIdStore);
          commit('changeToGet', 'ok');
          //获取第一个task的grade状态
          let gradeIdStore = taskList[0].gradeId;
          commit('updateStoreGrade', gradeIdStore);
          //获取第一个task的tag
          let tagStore = taskList[0].labelName;
          commit('updateStoreTag', tagStore);
          //获取第一个task的title
          let titleStore = taskList[0].taskName;
          commit('updateStoreTitle', titleStore);
          commit('changeToGetTask', 'stop');
        })
      }
    },
    //tag
    getTag({commit,state}){
      //如果taskId非空。且允许执行
      if (state.toGetTag=='ok') {
        axios.get('/label/getLabelList.action?', {
          params: {
          },
          baseURL: '/liftVue',
          withCredentials: false
        }).then((res)=>{
          let list=res.data;
          let tag=list.data;
          commit('getTag',tag);
          //停止执行
          commit('changeToGetTag','stop');
        })
      }
    },

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
