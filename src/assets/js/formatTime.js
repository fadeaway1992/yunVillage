// 将获取到的当前播放的时间取整并格式化为 ’02:03‘
export const formatTime = function (second) {
  const curSec = Math.floor(second)  // 秒数取整
  const curMin = Math.floor(curSec / 60)  // 分钟取整
  // 取分钟
  let Min
  if (curMin < 10) {
    Min = '0' + curMin
  } else {
    Min = curMin
  }
  // 取秒
  let Sec = curSec % 60
  if (Sec < 10) {
    Sec = '0' + Sec
  }

  return Min + ':' + Sec
}

// 将时间戳转换为日期 ====> 2017-05-09
export const stampsToDate = (stamp) => {
  const date = new Date(stamp)
  const year = date.getFullYear()
  const month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  return `${year}-${month}-${day}`
}
