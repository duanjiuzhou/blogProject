$(function () {
    var pageNum = 1;
    var tagId;  // 标签id
    var loging = true;  // 是否加载 false 不加载，true 加载
    var total = 0;  // 总页数

    /*  点击锚点滑动至顶部 */
    GOTOTOP(document.getElementById("thumbtack"), 10);

    /**
     * 下拉刷新
     */
    $(window).scroll(function () {
        var scrollTop = $(this).scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight = $(this).height();

        var height = $(".footer-box").height() + 30;
        if (scrollHeight - (scrollTop + windowHeight) < height) {
            console.log('到底了');
            tagId = document.getElementsByClassName('tag-active')[0].getAttribute('value');
            var data = {};
            // 单一数据查询
            if (tagId) {
                data = {single:false,id:tagId,pageNum:pageNum,pageSize:12};
            }else {
                data = {single:true,id:tagId,pageNum:pageNum,pageSize:12};
            }

            // 加载
            if(loging){
                loging = false;
                $.ajax({
                    type: 'GET',
                    url: '/api/blog/selectPageList.do',
                    data: '',
                    success: function (response) {
                        console.log('success', response);
                        if (response.success) {
                            var htmlData = '';
                            var data = response.list;
                            for (var i = 0, n = data.length; i < n; i++) {
                                var index = i + 1;
                                htmlData += '<tr><th scope="row">' + index + '</th><td>' + data[i].title + '</td><td>' +
                                    '<button style="margin-right: 5px" type="button" class="btn btn-primary btn-sm updateBlog"  value=' + data[i].id + '>修改</button>' +
                                    '<button type= "button" class="btn btn-danger btn-sm deleteBlog" value=' + data[i].id + '>删除</button></td>' +
                                    '<td>' + data[i].createTime + '</td></tr>'
                            }
                            $("#table-tbody").html(htmlData);
                            pageNum++;
                            loging = true;
                        } else {}
                    },
                    error: function (err) {
                        console.log('err', err);
                    }
                })
            }

        }
    });
});