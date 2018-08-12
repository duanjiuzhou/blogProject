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
router.use(async(ctx,next)=>{
    if(ctx.path == '/login'){
        if( ctx.session && ctx.session.isLogin ){
            ctx.redirect('/admin')
        }else {
            await next();
        }
    }
    else if(ctx.path == '/admin' || ctx.path == '/admin/labelTable'){
        if( ctx.session && ctx.session.isLogin ){
            await next();
        }else {
            ctx.redirect('/login')
        }
    }else {
        await next();
    }
});


router.use('/', home.routes(), home.allowedMethods());
router.use('/login', login.routes(), login.allowedMethods());
router.use('/blog', web.routes(), web.allowedMethods());
router.use('/admin', admin.routes(), admin.allowedMethods());
router.use('/api', api.routes(), api.allowedMethods());
router.get('*', async (ctx) => {
    await ctx.render('web/error', {})
}) 

module.exports = router;