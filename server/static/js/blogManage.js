$(function () {
    $('#oriContent').on('keyup',function () {
        $("#showContent").html(marked(this.value))
    })
    /**
     * 获取标签列表
     * @param isData 是否带搜索框中数据进行查询 为true则不带值查询
     */
    function searchLabel(isData) {
        $.ajax({
            type: 'GET',
            url: '/api/blig/select.do',
            data: isData == true ? '' : $('#search-label-form').serialize(),
            success: function (response) {
                console.log('success', response);
                if (response.success) {
                    var htmlData = '';
                    var data = response.list;
                    for (var i = 0, n = data.length; i < n; i++) {
                        var index = i+1;
                        htmlData += '<tr><th scope="row">' + index + '</th><td>' + data[i].label + '</td><td>' +
                            '<button style="margin-right: 5px" type="button" class="btn btn-primary btn-sm updateLabel"  value='+data[i].id+'>修改</button>' +
                            '<button type= "button" class="btn btn-danger btn-sm deleteLabel" value='+data[i].id+'>删除</button></td>'+
                            '<td>'+data[i].createTime+'</td></tr>'
                    }
                    $("#table-tbody").html(htmlData);
                    /**
                     * 点击打开修改模态框 或 点击删除标签
                     */
                    openUpdateLabelOrOpenDeleteLabel();
                }else {
                    $("#table-tbody").html('<tr align="center"><td colspan="4">暂无数据</td></tr>');
                }
            },
            error: function (err) {
                console.log('err', err);
                $.growl.error({
                    title: "提示",
                    message: '系统异常',
                });
            }
        })
    }
});