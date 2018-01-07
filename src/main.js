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
    detailStore: '',

  },
  getters: {
    // getDetail:state => {
    //   return state.todos.filter(todo => todo.done)
    //   if (state.taskIdStore!=''){
    //     return state.filter()
    //     // axios.get('/taskDetail/getDetailJson.action?', {
    //     //   params: {
    //     //     userId:1,
    //     //     taskId:state.taskIdStore
    //     //   },
    //     //   baseURL: '/liftVue',
    //     //   withCredentials: false
    //     // }).then((detail)=>{
    //     //   let res = detail.data;
    //     //   return res.data;
    //     // })
    //   }
    // }

  },
  mutations: {
    //获取itemBox中需要的taskId
    updateTaskId(state, taskIdStore){
      state.taskIdStore = taskIdStore;
    },
    //获取itemBox中grade的颜色序号
    updateGrade(state, gradeIdStore){
      state.gradeIdStore = gradeIdStore;
    },
    //获取itemBox中的tag
    updateTag(state, tagStore){
      state.tagStore = tagStore;
    },


    updateStoreDetail(state, detailStore){
      state.detailStore = detailStore;
    }
  },
  actions: {
    updateStoreDetail({commit,state}){
      if (state.taskIdStore != '') {
        axios.get('/taskDetail/getDetailJson.action?', {
          params: {
            userId: 1,
            taskId: state.taskIdStore
          },
          baseURL: '/liftVue',
          withCredentials: false
        }).then((result)=>{
          let res=result.data;
          commit({
            type:'updateDetail',
            res:res.data
          })
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
