import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
    },
    {
      path:'/0',
      component:Index
    },
    {
      path:'/1',
      component:Index
    },
    {
      path:'/2',
      component:Index
    },
    {
      path:'/3',
      component:Index
    },
    {
      path:'/4',
      component:Index
    },
    {
      path:'/5',
      component:Index
    }
  ]
})
