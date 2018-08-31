// 轮播1
$(p1).on('click',function(){
    $(images).css({
        // 如果有bug也可以换成 'margin-left': 0
        transform: 'translateX(0)'
    })
})
$(p2).on('click',function(){
    $(images).css({
        // 'margin-left': '-960px'
        transform: 'translateX(-960px)'
    })
})
$(p3).on('click',function(){
    $(images).css({
        // 'margin-left': '-1920px'
        transform: 'translateX(-1920px)'
    })
})

// 轮播2
// 获取所有轮播图片的按钮
var allButtons = $('#bnCtrl2  button')
// 遍历按钮，添加点击事件
for(let i = 0;i<allButtons.length;i++){
    // 把每个按钮转成jQuery对象，使用jQuery方法
    $(allButtons[i]).on('click',function(x){
        // 获取每个按钮相对于父元素的下标位置
        var index = $(x.currentTarget).index()
        // 根据下标位置计算需要移动的距离
        var p = index * -960
        $('#images2').css({
            transform: 'translateX('+ p +'px)'
        })
        n = index
        activeButton(allButtons.eq(n)) 
    })
}
var n = 0
var size = allButtons.length
//eq会找出对应的DOM且把对应的DOM封装成jQuery对象
// trigger手动触发事件
allButtons.eq(n%size).trigger('click')
var timeId = setTimer()

// 当鼠标移入
$('.window2').on('mouseenter',function(){
    window.clearInterval(timeId)
})

// 当鼠标移出
$('.window2').on('mouseleave',function(){
    timerId = setTimer()
})

function activeButton($button){
    // trigger手动触发事件
    $button
    .addClass('red')
    //这里注意的是：siblings接受的是选择区，而removeClass接受的是类名
    .siblings('.red').removeClass('red')
}
function setTimer() {
    return setInterval(() => {
        n += 1
        allButtons.eq(n % size).trigger('click')
    }, 2000)
}