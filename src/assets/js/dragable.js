export default function Drag(thing){
  let rectBody
  let self = this
  let down = false
  let distanceToLeftBorder,distanceToTopBorder
  thing.addEventListener('mousedown',function(event){
      let e = event || window.event
      rectBody = thing.getBoundingClientRect()
      distanceToLeftBorder = e.clientX - rectBody.left
      distanceToTopBorder = e.clientY - rectBody.top
      down = true
  })
  document.addEventListener('mousemove',function(event){
    if(down===false) {return}
    console.log(1234)
    let e = event || window.event
    let left = e.clientX - distanceToLeftBorder
    let top = e.clientY - distanceToTopBorder
    let maxLeft = window.innerWidth - rectBody.width
    let maxTop = window.innerHeight - rectBody.height
    if(left<0) {
      left = 0
    } else if (left>maxLeft){
      left = maxLeft
    }
    if(top<0) {
      top = 0
    } else if (top>maxTop){
      top = maxTop
    }
    thing.style.left = left+'px'
    thing.style.top = top+'px'
  })
  thing.addEventListener('mouseup',function(){
    down = false
  })
}
