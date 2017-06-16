export default function playBarControl (controlPoint, processBar, player) {
  let leftDis
  const processBarFullLength = 493

  // 定义鼠标移动时的行为
  function Move (event) {
    const e = event || window.event
    e.preventDefault()
    let newWidth = e.clientX - processBar.getBoundingClientRect().left - leftDis
    if (newWidth < 0) {
      newWidth = 0
    } else if (newWidth > 493) {
      newWidth = 493
    }
    processBar.style.width = newWidth + 'px'
  }

  // 定义鼠标松开时的行为
  function clearAllEventsAndJump () {
    document.removeEventListener('mouseup', clearAllEventsAndJump)
    document.removeEventListener('mousemove', Move)
    const current = player.duration / processBarFullLength * processBar.offsetWidth
    player.currentTime = current
    window.controlPointDown = 0
  }

  // 定义鼠标按下时的行为
  controlPoint.addEventListener('mousedown', function (event) {
    const e = event || window.event
    event.stopPropagation()
    window.controlPointDown = 1
    // 获取点击位置相对于进度条右边的位置
    leftDis = e.offsetX + controlPoint.offsetLeft - processBar.offsetWidth
    document.addEventListener('mousemove', Move)
    document.addEventListener('mouseup', clearAllEventsAndJump)
  })
}
