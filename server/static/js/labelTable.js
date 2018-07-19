$(function () {
    var addOrSetLabel = 0; // 创建或者修改标签 {number} 0/1 0:创建 1：修改
    
    /**
     * 获取标签列表
     */
    function searchLabel() {
        $.ajax({
            type: 'GET',
            url: '/api/LableList.do',
            data: $('#search-label-form').serialize(),
            success: function (response) {
                console.log('success', response);
                if (response.success) {
                    var htmlData = '';
                    var data = response.list;
                    for (var i = 0, n = data.length; i < n; i++) {
                        htmlData += '<tr><th scope="row">' + i + 1 + '</th><td>' + data[i].label + '</td><td>' +
                            '<button type="button" class="btn btn-primary btn-sm" id="updateLabel">修改</button>' +
                            '<button type= "button" class="btn btn-danger btn-sm" id="deleteLabel" value='+data[i].id+'>删除</button></td>'+
                            '<td>'+data[i].createTime+'</td></tr>'
                    }
                    $("#table-tbody").html(htmlData);
                }
            },
            error: function (err) {
                console.log('err', err);
            }
        })
    }
    
    /**
     * 关闭标签模态框
     */
    function closeLabelModal() {
        $('#labelModal').modal('hide');
        $('#label-modal-form')[0].reset();
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
     * 点击打开修改模态框
     */
    $('#updateLabel').on('click', function () {
        openAddOrSetModal('修改',1)
    });

    /**
     * 保存提交
     */
    $("#saveSubmit").on('click', function () {

        closeLabelModal();
    });
});