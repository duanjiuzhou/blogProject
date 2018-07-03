$(function () {
    // 自我介绍文本动画是否触发  true未触发  false已触发
    var starstAnimation = true;
    // 自我介绍技能列表
    var progress = 0;
    // 波浪样式 定时器标记
    var timer = null;

    /*  点击锚点滑动至顶部 */
    GOTOTOP(document.getElementById("thumbtack"),10);

    /**
     * 滚动到页面指定位置的点击绑定
     */
    $("#button-more").on('click',function () {
        var buttonMore = document.getElementById('button-more');
        var personalIntroduction = document.getElementById('personalIntroduction');
        scroll(buttonMore.offsetTop,personalIntroduction.offsetTop,8)
    });
    /**
     * [scroll 滚动到页面指定位置]
     * @param  {[type]} current [当前位置]
     * @param  {[type]} appoint [指定距离]
     * @param  {[type]} step  [步长]
     */
    function scroll(current,appoint,step){
        var timer = null;
        var currentPosition = current;
        var appointPosition = appoint;
        timer = setInterval(function(){
            if(currentPosition >= appointPosition){
                clearInterval(timer);
                if(starstAnimation){
                    introduceAnimation();
                }
            }
            currentPosition += step;
            window.scrollTo(0,currentPosition)
        },10)
    };

    /**
     *  定义自我介绍文本动画对象
     * @param el        DOM
     * @param toRotate  文本数据
     * @param period    时间
     */
    var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) {
            delta /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }

        setTimeout(function() {
                that.tick();
            },
            delta);
    };

    /**
     *  自我介绍文本动画
     */
    function introduceAnimation() {
        var elements = document.getElementById('who-me-info');
        var data = [ "本人擅长Ai、Fw、Fl、Br、Ae、Pr、Id、Ps等软件的安装与卸载",
            "精通CSS、JavaScript、PHP、ASP、C、C＋＋、C#、Java、Ruby、Perl、Lisp、python、Objective-C、ActionScript、Pascal、spss、sas等单词的拼写",
            "熟悉Windows、Linux、Mac、Android、IOS、WP8等系统的开关机。"];
        new TxtType(elements,data, 2000);
        starstAnimation = false;
    };

    /**
     *  滚动条滚动到自我介绍元素触发 自我介绍文本动画
     */
    document.onscroll = function() {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var cHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        var elements = document.getElementById('who-me-info');
        // 滚动条位置 大于 指定元素减去视口高度 并且 自我介绍文本动画未触发
        if ((scrollTop > (elements.offsetTop - cHeight)) && starstAnimation){
            introduceAnimation();
            starstAnimation = false;
        }
    }

    /**
     * 技能列表 鼠标移入移出事件
     */
    $('.skill-list li').on('mouseenter',function(){
        var val = $(this).attr("data-percent");
        $(this).children('.skill-item').children('.skill-img').css('bottom',-(100-val)+"%");

        function step() {
            progress += 1;
            $('.skill-inscir .skill-per').html(progress + "%");
            if (progress >= val) {
                clearInterval(timer);
                timer = null;
            }
        }
        if(timer == null){
            timer = setInterval(step,8);
        }
    });
    $('.skill-list li').on('mouseleave',function(){
        $('.skill-img').css('bottom','-100px');
        progress = 0;
        if(timer != null){
            clearInterval(timer);
            timer = null;
        }
        $('.skill-inscir .skill-per').html(progress + "%");
    });
});