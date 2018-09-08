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
            transform: 'translate('+ p +'px)'
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
        allButtons.eq(n % size).trigger('click')
        n += 1
    }, 3000)
}

//轮播3
let m = 1

imgsInit()

let timer = setInterval(() => {
    // 使用ES6插值法把n传进去
    makeLeave(getImages(m))
        //one()表示只此一次，transitonend表示动画结束时
        .one('transitionend',(e) => {
            makeEnter($(e.currentTarget))
        })
    makeCurrent(getImages(m+1)) 
    m += 1
},2000)


function x(m){
    if(m>5){
        m = m % 5
        if (m === 0){
            m = 5
        }
    }
    return m
}
function getImages(m){
    return $(`.images3  img:nth-child(${x(m)})`)
}

function imgsInit(){
    let n = 1
    $(`.images3  img:nth-child(${n})`).addClass('current')
        .siblings().addClass('enter')
}
function makeLeave($node){
    $node.removeClass('current').addClass('leave')
    return $node
}
function makeEnter($node){
    $node.removeClass('leave').addClass('enter')
    return $node
}
function makeCurrent($node){
    $node.removeClass('enter').addClass('current')
    return $node
}

document.addEventListener('visibilitychange',function(e){
    if(document.hidden){
        window.clearInterval(timer)
        window.clearInterval(timerId)
    }else{
        timerId = setTimer()
        timer = setInterval(() => {
            // 使用ES6插值法把n传进去
            makeLeave(getImages(m))
                //one()表示只此一次，transitonend表示动画结束时
                .one('transitionend',(e) => {
                    makeEnter($(e.currentTarget))
                })
            makeCurrent(getImages(m+1)) 
            m += 1
        },2000)
    }
})


 /**
  * 轮播4
  */
let $button4 = $('#bnCtrl4 button')
let $images4 = $('#images4')
let $imgs   = $images4.children('img')
let current = 0

makeFakeSlides()

$images4.css({transform:'translateX(-960px)'})

bindEvents()

$(next).on('click',function(){
    goToSlides(current + 1)
})

$(prev).on('click',function(){
    goToSlides(current - 1)
})

let thisTimer = setInterval(function(){
    goToSlides(current + 1)
},3000)

$('.container').on('mouseenter',function(){
    window.clearInterval(thisTimer)
}).on('mouseleave',function(){
    thisTimer = setInterval(function(){
        goToSlides(current + 1)
    },3000)
})

function bindEvents(){
    $('#bnCtrl4').on('click','button',function(e){
        let $buttons = $(e.currentTarget)
        let index = $buttons.index() 
        goToSlides(index)
    })
}

function goToSlides(index){
    if(index > $button4.length - 1){
        index = 0
    }else if(index < 0 ){
        index = $button4.length -1
    }
    console.log('current,'+ current)
    console.log('index,'+ index)
    if(current === $button4.length-1 && index === 0){
        $images4.css({transform:`translateX(${-($button4.length+1) * 960}px)`})
        
        // 当动画结束时添加一个时间，执行函数，让他快速转回第一张图片
            .one('transitionend',function(){
            
            //小技巧，先hide()再show(),中断动画
                $images4.hide()
                    .offset()
                    $images4.css({transform:`translateX(${-(index+1)*960}px)`})
                    .show()
                })
    }else if(current === 0 && index === $button4.length-1){
        $images4.css({transform:`translateX(0px)`})
        
        // 当动画结束时添加一个时间，执行函数，让他快速转回第一张图片
            .one('transitionend',function(){
            
            //小技巧，先hide()再show(),中断动画
                $images4.hide()
                    .offset()
                    $images4.css({transform:`translateX(${-(index+1) * 960}px)`})
                    .show()
                })
    }else{
        $images4.css({transform:`translateX(${-(index+1) * 960}px)`})
    }
    current = index
}   
/**
function bindEvents(){
    $button4.eq(0).on('click',function(){
        if (current == 4){
            $images4.css({transform:'translateX(-5760px)'})
            
            // 当动画结束时添加一个时间，执行函数，让他快速转回第一张图片
            .one('transitionend',function(){
                
                //小技巧，先hide()再show(),中断动画
                $images4.hide()
                        .offset()
                        $images4.css({transform:'translateX(-960px)'})
                        .show()
                    })
        }else{
            $images4.css({transform:'translateX(-960px)'})
            current = 0   
        }
    })
    $button4.eq(1).on('click',function(){
        $images4.css({transform:'translateX(-1920px)'})
        current = 1
    })
    $button4.eq(2).on('click',function(){
        $images4.css({transform:'translateX(-2880px)'})
        current = 2
    })
    $button4.eq(3).on('click',function(){
        $images4.css({transform:'translateX(-3840px)'})
        current = 3
    })
    $button4.eq(4).on('click',function(){
        if (current == 0){
            $images4.css({transform:'translateX(0px)'})
            .one('transitionend',function(){           
                $images4.hide()
                        .offset()
                        $images4.css({transform:'translateX(-4800px)'})
                        .show()
                    })
                }else{
            $images4.css({transform:'translateX(-4800px)'})
            current = 4
        }  
    })
}
 */

function makeFakeSlides(){
    //克隆第一张图片和最后一张图片
    let $firstCopy = $imgs.eq(0).clone(true)
    let $lastCopy = $imgs.eq($imgs.length-1).clone(true)

    // 把第一张图片放到最后一张图片的后面，把最后一张图片放到第一张图片的前面
    $images4.append($firstCopy)
    $images4.prepend($lastCopy)
}