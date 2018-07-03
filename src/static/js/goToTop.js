/**
 * 点击锚点滑动至顶部
 * @param gotop DOM节点
 * @param speed 滚动间隔时间 number
 * @constructor
 */
function GOTOTOP(gotop, speed){
    var timer;
    var oldTop = document.documentElement.scrollTop || document.body.scrollTop;
    gotop.addEventListener('click',function(){
        var speed = speed || 10;
        timer = setInterval(function(){
            var top = document.documentElement.scrollTop || document.body.scrollTop;
            var gospeed = top/100;
            if(gospeed>speed){
                gospeed = speed;
            }else if(gospeed<3){
                gospeed = 3;
            }
            if(top>speed){
                if(document.documentElement.scrollTop){
                    top = document.documentElement.scrollTop-=speed;
                }else{
                    top = document.body.scrollTop-=speed;
                }
            }else{
                clearInterval(timer);
            }
        },5);
    });

    window.onscroll = function(e){
        var newTop = document.documentElement.scrollTop || document.body.scrollTop;
        if(newTop>100){
            gotop.style.display = "block";
        }else{
            gotop.style.display = "none";
        }
        if(newTop>oldTop){
            clearInterval(timer);
        }
        oldTop = newTop;
    }
}