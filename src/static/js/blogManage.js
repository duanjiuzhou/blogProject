$(function () {
    $('#oriContent').on('keyup',function () {
        $("#showContent").html(marked(this.value))
    })
});