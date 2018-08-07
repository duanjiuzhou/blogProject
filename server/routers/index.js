/**
 * 整合所有子路由
 */
const router = require('koa-router')();

// web子路由
const home = require('./home');
const web = require('./web');
// admin子路由
const login = require('./login');
const admin = require('./admin');
// api子路由
const api = require('./api');

/**
 * 校验用户是否登录
 * @param  {obejct} ctx 上下文对象
 */
// router.use(async(ctx,next)=>{
//     console.log(ctx.path);
//     if(ctx.path == '/login'){
//         ctx.redirect('/admin')
//     }else {
//         await next();
//     }
// });


router.use('/', home.routes(), home.allowedMethods());
router.use('/login', login.routes(), login.allowedMethods());
router.use('/blog', web.routes(), web.allowedMethods());
router.use('/admin', admin.routes(), admin.allowedMethods());
router.use('/api', api.routes(), api.allowedMethods());
router.get('*', async (ctx) => {
    await ctx.render('web/error', {})
}) 

module.exports = router;