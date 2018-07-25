/*  点击锚点滑动至顶部 */
$(function () {
    GOTOTOP(document.getElementById("thumbtack"),10);

    /**
     * 下拉刷新
     */
    $(window).scroll(function(){
        var scrollTop = $(this).scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight = $(this).height();

        var height = $(".footer-box").height() + 30;
        if(scrollHeight - (scrollTop + windowHeight) < height ){
            console.log('到底了');
        }
    });
});