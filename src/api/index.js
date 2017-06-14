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
      console.log(res.data.playlist, '-------playList')
      return res.data.playlist
    })
    .catch(e => {
      return e
    })
  }
}
