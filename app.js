const Koa = require('koa');
const path = require('path');
const koaStatic = require('koa-static');
const views = require('koa-views');
const bodyParser = require('koa-bodyparser');
const koaLogger = require('koa-logger');
const convert = require('koa-convert')
const session = require('koa-session');
const config = require('./config/index');
const routers = require('./server/routers/index')
const app = new Koa();


// 使用ctx.body解析中间件
app.use(bodyParser());

// 配置控制台日志中间件
// app.use(convert(koaLogger()));

app.keys = ['some secret hurr','3424344','2434wqdwdsaftare4','45546534rfdsfdfghey'];
const SESSIONCONFIG = {
    key: 'SESSIONID',   //cookie key (default is koa:sess)
    maxAge: 86400000,  // cookie的过期时间 maxAge in ms (default is 1 days)
    overwrite: true,  //是否可以overwrite    (默认default true)
    httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
    signed: true,   //签名默认true
    rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
    renew: false,  //(boolean) renew session when session is nearly expired,
};
app.use(session(SESSIONCONFIG, app));

// 配置静态资源加载中间件
app.use(koaStatic(path.join(__dirname, './server/static')));

// 加载模板引擎
app.use(views(path.join(__dirname, './server/views'), {
    extension: 'ejs'
}));

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())

app.listen(config.port);