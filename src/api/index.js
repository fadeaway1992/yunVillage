import axios from 'axios'
// 设置请求地址头部
const ycaxios = axios.create({
  baseURL: 'http://localhost:3000/'
})

export default{
  // 使用手机登录
  loginByPhone (options) {
    return ycaxios.get('login/cellphone', options).then((res) => {
      return res
    })
  },
  // 获取用户歌单
  getPlayList (id) {
    return ycaxios.get('user/playlist?uid=' + id).then(res => {
      return res.data.playlist
    })
    .catch(e => {
      return e
    })
  },
  // 获取歌单详情
  getListDetail (id) {
    return ycaxios.get('playlist/detail?id=' + id).then(res => {
      return res
    })
  },
  // 获取歌曲 url
  getMusicUrl (id) {
    return ycaxios.get('music/url?id=' + id).then(res => {
      return { url: res.data.data[0].url, type: res.data.data[0].type }
    })
  }
}
