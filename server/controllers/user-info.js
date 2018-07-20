const {Get_LabelList,Update_LabelList,Insert_LabelList,Delete_LabelList} = require("../../init/db-util");

/**
 * 登录操作
 * @param {object} ctx 上下文对象
 */
const signIn = async (ctx)=>{
console.log('用户账号密码信息：',ctx.request.body)
    ctx.body = ctx.request.body;
};

/**
 * 查询标签列表
 * @param {object} ctx 上下文对象
 */
const _Get_LabelList = async (ctx) =>{
    console.log('get标签列表label:',ctx.query.label)
    let data = null;
    try{
        data = {
            success: true,
            message: '操作成功'
        }
        data.list = await Get_LabelList(ctx.query.label);
        console.log('查询标签列表: ',data.list)
    }catch(err) {
        data = {
            list : [],
            success: false,
            message: '操作失败'
        }
    }
    ctx.body = data;
};

/**
 * 更新标签列表
 * @param {object} ctx 上下文对象
 */
const _Update_LabelList = async (ctx) =>{
    let data = null;
    const requestData = ctx.request.body;
    console.log('更新数据：',requestData)
    if(!requestData.label || !requestData.id){
        data = {
            success: false,
            message: '操作失败'
        }
    }else {
        await Update_LabelList([requestData.label,requestData.id]).then(async res => {
            console.log('更新标签列表: ',res)
            data = {
                success: true,
                message: '操作成功'
            }
        }).catch(err => {
            data = {
                success: false,
                message: '系统繁忙'
            }
        })
    }
    ctx.body = data;
};

/**
 * 新增标签列表
 * @param {object} ctx 上下文对象
 */
const _Insert_LabelList = async (ctx) =>{
    let data = null;
    const requestData = ctx.request.body;
    console.log('新增数据：',requestData)
    if(!requestData.label) {
        data = {
            success: false,
            message: '操作失败'
        }
    }else {
        await Insert_LabelList(requestData.label).then(async res => {
            console.log('新增标签列表: ',res)
            data = {
                success: true,
                message: '操作成功'
            }
        }).catch(err => {
            data = {
                success: false,
                message: '系统繁忙'
            }
        })
        ctx.body = data;
    }
};

/**
 * 删除标签列表
 * @param {object} ctx 上下文对象
 */
const _Delete_LabelList =  async (ctx) =>{
    let data = null;
    const requestData = ctx.request.body;
    if(!requestData.id) {
        data = {
            success: false,
            message: '操作失败'
        }
    }else {
        await Delete_LabelList(requestData.id).then(async res => {
            data = {
                success: true,
                message: '操作成功'
            }
        }).catch(err => {
            data = {
                success: false,
                message: '系统繁忙'
            }
        })
        ctx.body = data;
    }
};

module.exports = {
    signIn,
    _Get_LabelList,
    _Update_LabelList,
    _Insert_LabelList,
    _Delete_LabelList
};