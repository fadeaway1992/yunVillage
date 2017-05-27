export default function Drag(dragBox,dragBar){
  let rectBody
  let distanceToLeftBorder,distanceToTopBorder

  function move(event){
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
    dragBox.style.left = left+'px'
    dragBox.style.top = top+'px'
    return false
  }

  dragBar.addEventListener('mousedown',function(event){
    let e = event || window.event
    rectBody = dragBox.getBoundingClientRect()
    distanceToLeftBorder = e.clientX - rectBody.left
    distanceToTopBorder = e.clientY - rectBody.top
    document.addEventListener('mousemove',move)
    dragBox.addEventListener('mouseup',function(){
      document.removeEventListener('mousemove',move)
    })
    return false
  })


}
