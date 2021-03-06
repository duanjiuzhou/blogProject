/**
 * web子路由
 */

const router = require('koa-router')();
const web = require('../controllers/web');
const routes = router
    .get('/',web.blog)
    .get('/label/:data',async (ctx)=>{
        await web.blog(ctx)
    })
    .get('/moods',web.moods)
    .get('/details/:data',async (ctx)=>{
        await web.details(ctx)
    })

module.exports = routes;
