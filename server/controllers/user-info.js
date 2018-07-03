/**
 * 登录操作
 * @param {object} ctx 上下文对象
 */
const signIn = async (ctx)=>{
console.log('用户账号密码信息：',ctx.request.body)
};

module.exports = {signIn}