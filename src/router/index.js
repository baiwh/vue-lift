import Vue from 'vue'
import Router from 'vue-router'
import sign from './../view/sign.vue'
import home from './../view/home.vue'
import del from '../view/taskdel.vue'
import notes from './../view/notes.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'sign',
      component: sign
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/taskdel',
      name: 'taskdel',
      component: del
    },
    {
      path: '/notes',
      name: 'notes',
      component: notes
    }
  ],
  mode: 'history',
  base:'/vueLift/'
})
