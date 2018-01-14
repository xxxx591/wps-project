import Vue from 'vue'
import Router from 'vue-router'
import allCheck from '@/components/index'
import loading from '@/components/loading'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/allCheck',
      name: 'allCheck',
      component: allCheck
    },
    {
      path: '/loading',
      name: 'loading',
      component: loading
    },
  
  ]
})
