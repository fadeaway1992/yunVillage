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
  },
  // 获取歌词
  getMusicLyrics (id) {
    return ycaxios.get('lyric?id=' + id).then(res => {
      if (res.data.nolyric) {
        return '没有歌词'
      }
      try {
        console.log(res, '拿到了什么歌词？')
        return res.data.lrc.lyric
      } catch (e) {
        console.log(e, '捕捉到了错误')
        return '[9999:00:00] 无歌词'   // 当请求歌词出现了问题时统一返回一个固定的歌词字符串，防止因为请求不到歌词导致程序阻塞
      }
    })
  }
}
