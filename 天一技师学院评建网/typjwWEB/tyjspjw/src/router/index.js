import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import tzgg from '@/components/tzgg'
import pjdt from '@/components/pjdt'
import pjjb from '@/components/pjjb'
import zcwj from '@/components/zcwj'
import Detail from '@/components/Detail'


Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/tzgg',
      name: 'tzgg',
      component: tzgg,
      meta:{
        keepAlive: true
      }
    }
    ,
    {
      path: '/pjdt',
      name: 'pjdt',
      component: pjdt,
      meta:{
        keepAlive: true
      }
    },
    {
      path: '/pjjb',
      name: 'pjjb',
      component: pjjb,
      meta:{
        keepAlive: true
      }
    },
    {
      path: '/zcwj',
      name: 'zcwj',
      component: zcwj,
      meta:{
        keepAlive: true
      }
    },
    {
      path: '/Detail',
      name: 'Detail',
      component: Detail
    }
  ]
})
