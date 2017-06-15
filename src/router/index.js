import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import PlayListDetail from '@/components/PlayListDetail'
import store from '@/store'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/playlist/:id',
      name: 'playListDetail',
      component: PlayListDetail,
      beforeEnter: (to, from, next) => {
        store.dispatch('getListDetail', to.params.id)
        // 这里需要判断返回值code，改歌单是否存在。
        next()
      }
    }
  ]
})
