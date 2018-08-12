$(function () {
    $("#buttonlogintoregister").on('click',function () {
        if(!$(".inputMaterial:eq(0)").val()){
            return $.growl.warning({
                title: "提示",
                message: '账号不能为空',
            });
        }
        if( !$(".inputMaterial:eq(1)").val()){
            return $.growl.warning({
                title: "提示",
                message: '密码不能为空',
            });
        }
        submitStyle("no-drop",true);
        $.ajax({
            type:'POST',
            url:'/api/login.do',
            data:$('#form-box').serialize(),
            success:function (response) {
                if(response.success){
                    window.location.href = '/admin';
                }else {
                    $.growl.warning({
                        title: "提示",
                        message: response.message,
                    });
                }
                submitStyle("pointer",false);
            },
            error:function (err) {
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