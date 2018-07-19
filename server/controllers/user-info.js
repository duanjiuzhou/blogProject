const {Get_LabelList} = require("../../init/db-util");

/**
 * 登录操作
 * @param {object} ctx 上下文对象
 */
const signIn = async (ctx)=>{
console.log('用户账号密码信息：',ctx.request.body)
    ctx.body = ctx.request.body;
};

/**
 * 标签列表
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

    }catch(err) {
        data = {
            list : [],
            success: false,
            message: '操作失败'
        }
    }
    ctx.body = data;
}


module.exports = {signIn,_Get_LabelList}