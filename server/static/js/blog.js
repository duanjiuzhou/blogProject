/*  点击锚点滑动至顶部 */
$(function () {
    GOTOTOP(document.getElementById("thumbtack"),10);
    /**
     * 标签点击事件
     */
    $(".tag").click(function () {
        // 点击标签高亮其它标签变暗
        $(this).addClass("tag-active").siblings().removeClass("tag-active");
    });
});