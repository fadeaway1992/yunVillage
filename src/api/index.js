import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
// 设置请求地址头部

var httpUrlHeader
if (process.env.NODE_ENV == 'development'){
  httpUrlHeader = 'http://localhost:3000/'
} else {
  console.log("It's not development environment!")
}

export default{
  loginByPhone(options,cb,errorCb){
    Vue.http.get(`${httpUrlHeader}login/cellphone`,options).then((response)=>{
      cb(response)
    },(error)=>{
      errorCb(error)
    })
  }
}
