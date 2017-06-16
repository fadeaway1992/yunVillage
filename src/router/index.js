import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import PlayListDetail from '@/components/PlayListDetail'
import store from '@/store'
import PlayList from '@/components/PlayList'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Index,
      children: [
        {
          path: '',
          name: 'index',
          component: PlayList
        },
        {
          path: 'playlist/:id',
          name: 'playListDetail',
          component: PlayListDetail,
          beforeEnter: (to, from, next) => {
            store.dispatch('getListDetail', to.params.id)
            // 这里需要判断返回值code，该歌单是否存在。
            next()
          }
        }
      ]
    }
  ]
})
