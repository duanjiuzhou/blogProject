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
            tagId = document.getElementsByClassName('tag-active')[0].getAttribute('value');
            var data = {};
            // 单一数据查询
            if (tagId) {
                data = {single: true, id: tagId, pageNum: pageNum, pageSize: 12};
            } else {
                data = {single: false, pageNum: pageNum, pageSize: 12};
            }

            // 加载
            if (loging) {
                loging = false;
                $('.loading').css('display','block');
                $.ajax({
                    type: 'GET',
                    url: '/api/blog/selectPageList.do',
                    data: data,
                    success: function (response) {
                        if (response.success) {
                            var htmlData = '';
                            var data = response.list;
                            for (var i = 0, n = data.length; i < n; i++) {
                                htmlData += ' <div class="col-sm-6 col-md-4 col-lg-3  col-xs-12">' +
                                    '            <div class="thumbnail content-box-list">' +
                                    '                <a href="/blog/details/'+data[i].id+'" class="post-box">' +
                                    '                    <div class="post-box-image" style="background-image: url('+data[i].imgUrl+')"></div>' +
                                    '                </a>' +
                                    '                <a href="/blog/label/'+ data[i].labelId+'" class="category"><'+data[i].label+'></a>' +
                                    '                <div class="caption-wrap">' +
                                    '                    <div class="caption-box">' +
                                    '                        <div class="caption-title"><a href="/blog/details/'+data[i].id+'">'+data[i].title+'</a></div>' +
                                    '                        <div class="caption-info">' + data[i].synopsis +
                                    '                        </div>' +
                                    '                    </div>' +
                                    '                    <div class="caption-footer clearfix">' +
                                    '                        <span><i class="iconfont icon-shijian"></i>'+data[i].createTime+'</span>' +
                                    '                        <span class=""><i class="iconfont icon-ai44"></i>('+data[i].accessNumber+')</span>' +
                                    '                        <span class=""><i class="iconfont icon-yonghupinglun"></i>('+data[i].commentNumber+')</span>' +
                                    '                    </div>' +
                                    '                </div>' +
                                    '            </div>' +
                                    '        </div>';
                            }
                            $("#content-box-list").append(htmlData);
                            $('.loading').css('display','none');
                            total = response.total;
                            pageNum++;
                            if (12 * pageNum <= total) {
                                loging = true;
                            } else if ((12 * pageNum - total) <= total && 12 * pageNum > total) {
                                loging = true;
                            } else if (12 * pageNum > total) {
                                loging = false;
                                $('.segmenting-line').css('display','block');
                            }

                        } else {
                            $('.loading').css('display','none');
                        }
                    },
                    error: function (err) {
                    }
                })
            }

        }
    });
});