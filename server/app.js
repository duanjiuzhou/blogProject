const Koa = require('koa');
const path = require('path');
const koaStatic = require('koa-static');
const views = require('koa-views');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const config = require('../config');
const routers = require('./routers/index')
const app = new Koa();

// 使用ctx.body解析中间件
app.use(bodyParser());

// 配置静态资源加载中间件
app.use(koaStatic(path.join(__dirname, './static')));

// 加载模板引擎
app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs'
}));

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())

app.listen(config.port);
console.log('[demo] start-quick is starting at port 127.0.0.1:3001')