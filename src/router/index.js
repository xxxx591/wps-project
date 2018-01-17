import Vue from 'vue'
import Router from 'vue-router'
import allCheck from '@/components/allCheck'
import loading from '@/components/loading'
import viewReport from '@/components/viewReport'
import fullTxt from '@/components/fullTxt'
import robotTxt from '@/components/robotTxt'
import fragment from '@/components/fragment'
import source from '@/components/source'

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
    {
      path: '/viewReport',
      name: 'viewReport',
      component: viewReport
    },
    {
      path: '/robotTxt',
      name: 'robotTxt',
      component: robotTxt
    },
    {
      path: '/fullTxt',
      name: 'fullTxt',
      component: fullTxt
    },
    {
      path: '/source',
      name: 'source',
      component: source
    },
    {
      path: '/fragment',
      name: 'fragment',
      component: fragment
    },
  
  ]
})
