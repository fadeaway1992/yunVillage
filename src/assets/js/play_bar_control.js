export default function playBarControl(controlPoint,processBar,player){
  let leftDis
  function Move(event){
    let e = event || window.event
    e.preventDefault()
    let newWidth = e.clientX - processBar.getBoundingClientRect().left - leftDis
    if(newWidth<0){
      newWidth = 0
    }else if(newWidth>493){
      newWidth = 493
    }
    processBar.style.width = newWidth+'px'

  }

  controlPoint.addEventListener('mousedown',function(event){
    let e = event || window.event
    event.stopPropagation();
    window.controlPointDown = 1
    //获取点击位置相对于进度条右边的位置
    leftDis = e.offsetX+controlPoint.offsetLeft-processBar.offsetWidth
    document.addEventListener('mousemove',Move)
    document.addEventListener('mouseup',function(){
      document.removeEventListener('mousemove',Move)
      let current = player.duration/493*processBar.offsetWidth
      player.currentTime = current
      window.controlPointDown=0
    })
  })
}
