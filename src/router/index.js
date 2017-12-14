import Vue from 'vue'
import Router from 'vue-router'
import sign from './../view/sign.vue'
import home from './../view/home.vue'

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
    }
  ]
})
