import Vue from 'vue'
import VueResource from 'vue-resource'

// 设置请求地址头部

var httpUrlHeader
if (process.env.NODE_ENV == 'development'){
  httpUrlHeader = 'localhost:3000/'
} else {
  console.log("It's not development environment!")
}

export default{
  
}

export { httpUrlHeader }
