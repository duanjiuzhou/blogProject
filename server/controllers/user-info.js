const {Get_LabelList,Update_LabelList, Insert_LabelList,Delete_LabelList,Get_BlogListOne,
        Get_AdminBlogList, Update_BlogList, Insert_BlogList, Delete_BlogList,Get_BlogList,
    Get_ListNum,Get_UserLogin} = require("../../init/db-util");
const {SetDateYMD} = require('../utils/timeDral');

/**
 * 登录操作
 * @param {object} ctx 上下文对象
 */
const signIn = async (ctx)=>{
    let requestData = ctx.request.body;
    let data = null;
    if(!requestData.userName || !requestData.passWord){
        data = {success: false, message: '参数异常'};
    }else {
        await Get_UserLogin([requestData.userName,requestData.passWord]).then(async res => {
            if(res.length != 0){
                // 设置session
                ctx.session.isLogin = true;
                data = {success: true, message: '登录成功'};
            }else {
                data = {success: false, message: '用户名称或者密码错误'};
            }
        }).catch(err => {
            data = {success: false, message: '系统繁忙'};
        })
    }
    ctx.body = data;
};

/**
 * 用户退出
 * @param ctx
 * @returns {Promise.<void>}
 */
const signOut = async (ctx)=>{
    ctx.session = null;
    ctx.redirect('/login')
};

/**
 * 查询标签列表
 * @param {object} ctx 上下文对象
 */
const _Get_LabelList = async (ctx) =>{
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
    if(!requestData.label || !requestData.id){
        data = {
            success: false,
            message: '参数有误'
        }
    }else {
        await Update_LabelList([requestData.label,requestData.id]).then(async res => {
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
    if(!requestData.label) {
        data = {
            success: false,
            message: '参数有误'
        }
    }else {
        await Insert_LabelList([requestData.label,SetDateYMD()]).then(async res => {
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
 * 博客分页查询
 * @param ctx
 * @returns {Promise.<void>}
 * @private
 */
const _Get_BlogPageList = async (ctx) =>{
    let data = null;
    const requestData = {};
    requestData.single = ctx.query.single === 'true' ? true : false;
    requestData.pageNum = Number(ctx.query.pageNum);
    requestData.pageSize = Number(ctx.query.pageSize);
    if(ctx.query.id){
        requestData.id = Number(ctx.query.id);
    }

    await Get_BlogList(requestData).then(async res => {
        data = {
            success: true,
            message: '操作成功',
            list:res,
        }
        }).catch(err => {
            data = {
                success: false,
                message: '系统繁忙',
                list:[],
            }
        })
    await Get_ListNum().then(async res => {
        data.total = res[0]["FOUND_ROWS()"];
        }).catch(err => {
            data.total = 0;
    })
    ctx.body = data;
};

/**
 *  查询博客列表
 * @param ctx
 */
const _Get_AdminBlogList = async (ctx) =>{
    let data = null;
    let database = {};
    if(ctx.query.title){
        database = {title:ctx.query.title,single:true}
    }else {
        database.pageNum = Number(ctx.query.pageNum);
        database.pageSize = Number(ctx.query.pageSize);
    }
    await Get_AdminBlogList(database).then(async res => {
        if(res.length == 0){
            data = {success: false, message: '操作失败', list:[]};
        }else {
            data = {success: true, message: '操作成功', list:res};
        }
    }).catch(err => {
        data = {success: false, message: '系统繁忙', list:[]};
    })

    await Get_ListNum().then(async res => {
        data.total = res[0]["FOUND_ROWS()"];
    }).catch(err => {
        data.total = 0;
    })

    ctx.body = data;
};

/**
 *  查询一条博客列表
 * @param ctx
 */
const _Get_BlogListOne = async (ctx) =>{
    let data = null;
    await Get_BlogListOne(ctx.query.id).then(async res => {
        if(res.length == 0){
            data = {success: false, message: '操作失败', list:{}};
        }else {
            data = {success: true, message: '操作成功', list:res[0]};
        }
    }).catch(err => {
        data = {success: false, message: '系统繁忙', list:{}};
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
    if(!requestData.label || !requestData.imgUrl || !requestData.title || !requestData.synopsis || !requestData.content
       || !requestData.labelId || !requestData.id){
        data = {
            success: false,
            message: '参数有误'
        }
    }else {
        await Update_BlogList([
            requestData.label,requestData.imgUrl,requestData.title,requestData.synopsis,
            requestData.content, requestData.labelId,requestData.id,
        ]).then(async res => {
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
    if(!requestData.label || !requestData.imgUrl || !requestData.title ||
        !requestData.synopsis || !requestData.content || !requestData.labelId) {
        data = {
            success: false,
            message: '参数有误'
        }
    }else {
        await Insert_BlogList([
            requestData.label,requestData.imgUrl,requestData.title,requestData.synopsis,requestData.content,
            SetDateYMD(),0,0,requestData.labelId
        ]).then(async res => {
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
    signOut,
    _Get_LabelList,
    _Update_LabelList,
    _Insert_LabelList,
    _Delete_LabelList,
    _Get_AdminBlogList,
    _Update_BlogList,
    _Insert_BlogList,
    _Delete_BlogList,
    _Get_BlogListOne,
    _Get_BlogPageList
};