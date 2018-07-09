$(function () {
    $("#buttonlogintoregister").on('click',function () {
        submitStyle("no-drop",true);
        console.log('form data',$('#form-box').serialize());
        $.ajax({
            type:'POST',
            url:'/api/login.do',
            data:$('#form-box').serialize(),
            success:function (response) {
                console.log('success',response);

                submitStyle("pointer",false);
            },
            error:function (err) {
                console.log('err',err);

                submitStyle("pointer",false);
            }
        })
    });

    /**
     * 设置提交按钮的样式 禁止或者可用
     * @param cursor    {string}    "no-drop"/"pointer"
     * @param disabled  {boolean}   true/false
     */
    function submitStyle(cursor,disabled) {
        $("#buttonlogintoregister").css({"cursor":cursor});
        $('#areaSelect').attr("disabled",disabled);
    }
});