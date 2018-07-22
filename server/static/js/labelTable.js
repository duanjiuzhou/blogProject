$(function () {
    var addOrSetLabel = null; // 创建或者修改标签 {number} 0/1 0:创建 1：修改
    var labelId = null; // 修改或者删除标签id
    /**
     * 获取标签列表
     * @param isData 是否带搜索框中数据进行查询 为true则不带值查询
     */
    function searchLabel(isData) {
        $.ajax({
            type: 'GET',
            url: '/api/lable/select.do',
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
    
    /**
     * 关闭标签模态框
     */
    function closeLabelModal() {
        $('#labelModal').modal('hide');
        $('#label-modal-form')[0].reset();
        labelId = null;
        addOrSetLabel = null;
    }

    /**
     * 打开新建或者修改模态框
     * @param modalTitle           {string} 模态框标题
     * @param addOrSetLabelState   {number} 创建或者修改标签状态
     */
    function openAddOrSetModal(modalTitle,addOrSetLabelState) {
        $("#myModalLabel").html(modalTitle);
        addOrSetLabel = addOrSetLabelState;
        $('#labelModal').modal('show');
    }

    /**
     * 新建或修改或删除标签提交
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
                console.log('新建或修改标签提交:', response);
                if(response.success){
                    searchLabel(true);
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
                closeLabelModal();
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
    

    /**
     * 点击关闭标签模态框
     */
    $('#closeLabelModal').on('click', closeLabelModal);

    /**
     * 点击搜索获取标签列表
     */
    $("#searchLabel").on('click', searchLabel);
    
    /**
     * 点击打开创建模态框
     */
    $("#createLabel").on('click', function () {
        openAddOrSetModal('创建',0)
    });







    /**
     * 点击打开修改模态框 或 点击删除标签
     */
    function openUpdateLabelOrOpenDeleteLabel() {
        /**
         * 点击打开修改模态框
         */
        $('.updateLabel').on('click', function () {
            labelId = $(this).val();
            openAddOrSetModal('修改',1)
        });
        /**
         * 点击删除标签
         */
        $(".deleteLabel").on("click",function () {
            labelId = $(this).val();
            if (confirm("你确定删除该标签吗？")) {
                addOrSetOrDelSubmit('/api/label/delete.do','DELETE','id='+labelId)
            }
        })
    }
    openUpdateLabelOrOpenDeleteLabel();

    /**
     * 保存提交
     */
    $("#saveSubmit").on('click', function () {
        if(!$("#label-name").val()){
            return alert('标签内容不能为空');
        }
        // 修改
        if(addOrSetLabel){
            addOrSetOrDelSubmit('/api/label/update.do','PUT',$('#label-modal-form').serialize()+'&id='+labelId)
        }
        // 新增
        else {
            addOrSetOrDelSubmit('/api/label/insert.do','POST',$('#label-modal-form').serialize())
        }
    });
});