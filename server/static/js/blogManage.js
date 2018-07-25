$(function () {
    var addOrSetLabel = null; // 创建或者修改标签 {number} 0/1 0:创建 1：修改
    var blogId = null; // 修改或者删除博客id

    $('#oriContent').on('keyup',function () {
        $("#showContent").html(marked(this.value))
    })
    /**
     * 获取博客列表
     * @param isData 是否带搜索框中数据进行查询 为true则不带值查询
     */
    function searchBlog(isData) {
        $.ajax({
            type: 'GET',
            url: '/api/blog/select.do',
            data: isData == true ? '' : $('#search-label-form').serialize(),
            success: function (response) {
                console.log('success', response);
                if (response.success) {
                    var htmlData = '';
                    var data = response.list;
                    for (var i = 0, n = data.length; i < n; i++) {
                        var index = i+1;
                        htmlData += '<tr><th scope="row">' + index + '</th><td>' + data[i].title + '</td><td>' +
                            '<button style="margin-right: 5px" type="button" class="btn btn-primary btn-sm updateBlog"  value='+data[i].id+'>修改</button>' +
                            '<button type= "button" class="btn btn-danger btn-sm deleteBlog" value='+data[i].id+'>删除</button></td>'+
                            '<td>'+data[i].createTime+'</td></tr>'
                    }
                    $("#table-tbody").html(htmlData);
                    /**
                     * 点击打开修改模态框 或 点击删除标签
                     */
                    openUpdateBlogOrOpenDeleteBlog();
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
    };

    /**
     * 新建或修改或删除博客提交
     * @param url         {string}  请求地址
     * @param requestType {string}  请求类型
     * @param data        {string}  请求数据
     */
    function addOrSetOrDelSubmit(url,requestType,data) {
        $.ajax({
            type: requestType,
            url: url,
            data: data,
            success: function (response) {
                console.log('新建或修改博客提交:', response);
                if(response.success){
                    searchBlog(true);
                    $.growl.notice({
                        title: "提示",
                        message: response.message
                    });
                }else {
                    $.growl.error({
                        title: "提示",
                        message: response.message,
                    });
                }
                $('#blogModal').modal('hide');
            },
            error: function (err) {
                console.log('err', err);
                $.growl.error({
                    title: "提示",
                    message: '系统异常',
                });
            }
        })
    };

    /**
     * 打开新建或者修改模态框
     * @param modalTitle           {string} 模态框标题
     * @param addOrSetLabelState   {number} 创建或者修改标签状态
     */
    function openAddOrSetModal(modalTitle,addOrSetLabelState) {
        $("#myModalBlog").html(modalTitle);
        addOrSetLabel = addOrSetLabelState;
        $('#blogModal').modal('show');
    };

    /**
     * 点击打开创建模态框
     */
    $("#createBlog").on('click', function () {
        openAddOrSetModal('创建',0)
    });

    /**
     * 点击关闭标签模态框回调
     */
    $('#blogModal').on('hidden.bs.modal', function (e) {
        $('#blog-modal-form')[0].reset();
        blogId = null;
        addOrSetLabel = null;
        $("#showContent").html('')
    });

    /**
     * 点击打开修改模态框 或 点击删除博客
     */
    function openUpdateBlogOrOpenDeleteBlog() {
        /**
         * 点击打开修改模态框
         */
        $('.updateBlog').on('click', function () {
            blogId = $(this).val();
            openAddOrSetModal('修改',1)
        });
        /**
         * 点击删除博客
         */
        $(".deleteBlog").on("click",function () {
            blogId = $(this).val();
            if (confirm("你确定删除该博客吗？")) {
                addOrSetOrDelSubmit('/api/blog/delete.do','DELETE','id='+blogId)
            }
        })
    }
    openUpdateBlogOrOpenDeleteBlog();

    /**
     * 点击搜索获取标签列表
     */
    $("#searchBlog").on('click', searchBlog);

    /**
     * 保存提交
     */
    $("#saveSubmit").on('click', function () {
        if(!$("#title").val()){
            return $.growl.warning({
                title: "提示",
                message: '标题不能为空',
            });
        }
        if(!$("#imgUrl").val()){
            return $.growl.warning({
                title: "提示",
                message: '图片地址不能为空',
            });
        }
        if(!$("#synopsis").val()){
            return $.growl.warning({
                title: "提示",
                message: '简介不能为空',
            });
        }
        if(!$("#label").val()){
            return $.growl.warning({
                title: "提示",
                message: '标签不能为空',
            });
        }
        if(!$("#oriContent").val()){
            return $.growl.warning({
                title: "提示",
                message: '内容不能为空',
            });
        }

        console.log('提交数据',$('#blog-modal-form').serialize())
        var label = $('#label option:selected').text();
        // 修改
        if(addOrSetLabel){
            addOrSetOrDelSubmit('/api/blog/update.do','PUT',$('#blog-modal-form').serialize()+'&id='+blogId+'&label='+label)
        }
        // 新增
        else {
            addOrSetOrDelSubmit('/api/blog/insert.do','POST',$('#blog-modal-form').serialize()+'&label='+label)
        }
    });
});