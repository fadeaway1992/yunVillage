import Vue from 'vue'
import axios from 'axios'
// 设置请求地址头部
var ycaxios = axios.create({
  baseURL: 'http://localhost:3000/',
})

var httpUrlHeader
if (process.env.NODE_ENV === 'development'){
  httpUrlHeader = 'http://localhost:3000/'
} else {
  console.log("It's not development environment!")
}

export default{
  loginByPhone (options, cb, errorCb) {
    Vue.http.get(`${httpUrlHeader}login/cellphone`,options).then((response)=>{
      cb(response)
    }, (error)=>{
      errorCb(error)
    })
  },
  // 使用手机登录
  loginByAxios(options, cb, errorCb){
    ycaxios.get('login/cellphone',options).then((response) => {
      console.log(response)
      cb(response)
    })
  },
  // 获取用户歌单
  getPlayList(id){
    return ycaxios.get('user/playlist?uid=' + id).then( res => {
      console.log(res.data.playlist, '-------playList')
      return res.data.playlist
    })
    .catch( e => {
      return e
    })
  }
}
