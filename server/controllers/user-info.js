const {Get_LabelList,Update_LabelList, Insert_LabelList,Delete_LabelList,
        Get_AdminBlogList, Update_BlogList, Insert_BlogList, Delete_BlogList,} = require("../../init/db-util");

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
    await Get_LabelList(ctx.query.label).then(async res => {
        if(res.length == 0){
            data = {success: false, message: '操作失败', list:[]};
        }else {
            data = {success: true, message: '操作成功', list:res};
        }
    }).catch(err => {
        data = {success: false, message: '系统繁忙', list:[]};
    })
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
            message: '参数有误'
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
            message: '参数有误'
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
            message: '参数有误'
        }
    }else {
        await Delete_LabelList(requestData.id).then(async res => {
            // 受影响的行数大于0
            if(res.affectedRows){
                data = {
                    success: true,
                    message: '操作成功'
                }
            }else {
                data = {
                    success: false,
                    message: '操作失败'
                }
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
 *  查询博客列表
 * @param ctx
 */
const _Get_AdminBlogList = async (ctx) =>{
    let data = null;
    await Get_AdminBlogList(ctx.query.title).then(async res => {
        if(res.length == 0){
            data = {success: false, message: '操作失败', list:[]};
        }else {
            data = {success: true, message: '操作成功', list:res};
        }
    }).catch(err => {
        data = {success: false, message: '系统繁忙', list:[]};
    })
    ctx.body = data;
};

/**
 * 更新博客列表
 * @param ctx
 * @returns {Promise.<void>}
 * @private
 */
const _Update_BlogList = async (ctx) =>{
    let data = null;
    const requestData = ctx.request.body;
    console.log('更新数据：',requestData)
    if(!requestData.label || !requestData.imgUrl || !requestData.title || !requestData.synopsis || !requestData.content
        || !requestData.createTime || !requestData.accessNumber || !requestData.commentNumber || !requestData.labelId || !requestData.id){
        data = {
            success: false,
            message: '参数有误'
        }
    }else {
        await Update_BlogList([
            requestData.label,requestData.imgUrl,requestData.title,requestData.synopsis,requestData.content,
            requestData.createTime,requestData.accessNumber,requestData.commentNumber,requestData.labelId,requestData.id,
        ]).then(async res => {
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
 * 新增博客列表
 * @param ctx
 * @returns {Promise.<void>}
 * @private
 */
const _Insert_BlogList = async (ctx) =>{
    let data = null;
    const requestData = ctx.request.body;
    console.log('新增数据：',requestData)
    label,imgUrl,title,synopsis,content,createTime,accessNumber,commentNumber,labelId
    if(!requestData.label || !requestData.imgUrl || !requestData.title || !requestData.synopsis || !requestData.content
        || !requestData.createTime || !requestData.accessNumber || !requestData.commentNumber || !requestData.labelId) {
        data = {
            success: false,
            message: '参数有误'
        }
    }else {
        await Insert_BlogList([
            requestData.label,requestData.imgUrl,requestData.title,requestData.synopsis,requestData.content,
            requestData.createTime,requestData.accessNumber,requestData.commentNumber,requestData.labelId
        ]).then(async res => {
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
 * 删除博客列表
 * @param ctx
 * @returns {Promise.<void>}
 * @private
 */
const _Delete_BlogList = async (ctx) =>{
    let data = null;
    const requestData = ctx.request.body;
    if(!requestData.id) {
        data = {
            success: false,
            message: '参数有误'
        }
    }else {
        await Delete_BlogList(requestData.id).then(async res => {
            // 受影响的行数大于0
            if(res.affectedRows){
                data = {
                    success: true,
                    message: '操作成功'
                }
            }else {
                data = {
                    success: false,
                    message: '操作失败'
                }
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
    _Delete_LabelList,
    _Get_AdminBlogList,
    _Update_BlogList,
    _Insert_BlogList,
    _Delete_BlogList
};