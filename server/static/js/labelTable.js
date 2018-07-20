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
                        var index = i+1;
                        htmlData += '<tr><th scope="row">' + index + '</th><td>' + data[i].label + '</td><td>' +
                            '<button type="button" class="btn btn-primary btn-sm" id="updateLabel">修改</button>' +
                            '<button type= "button" class="btn btn-danger btn-sm" id="deleteLabel" value='+data[i].id+'>删除</button></td>'+
                            '<td>'+data[i].createTime+'</td></tr>'
                    }
                    $("#table-tbody").html(htmlData);
                }else {
                    $("#table-tbody").html('<tr align="center"><td colspan="4">暂无数据</td></tr>');
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
     * 新建或修改标签提交
     * @param url         {string}  请求地址
     * @param requestType {string}  请求类型
     * @param id          {string}  标签id（修改标签时使用）
     */
    function addOrSetSubmit(url,requestType,id) {
        id = id || '';
        $.ajax({
            type: requestType,
            url: url,
            data: $('#label-modal-form').serialize()+id,
            success: function (response) {
                console.log('新建或修改标签提交:', response);
                if(response.success){
                    searchLabel();
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
            },
            error: function (err) {
                console.log('err', err);
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
     * 点击打开修改模态框
     */
    $('#updateLabel').on('click', function () {
        openAddOrSetModal('修改',1)
    });

    /**
     * 保存提交
     */
    $("#saveSubmit").on('click', function () {
        if(!$("#label-name").val()){
            return alert('标签内容不能为空');
        }
        // 修改
        if(addOrSetLabel){
            addOrSetSubmit('/api/label/update.do','PUT','&id='+$("#deleteLabel").val())
        }
        // 新增
        else {
            addOrSetSubmit('/api/label/insert.do','POST')
        }
        closeLabelModal();
    });
});