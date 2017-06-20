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
