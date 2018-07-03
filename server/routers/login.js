/**
 * 登录页面子路由
 */

const router = require('koa-router')();
const login = require('../controllers/login');
const routes = router.get('/', login)
module.exports = routes;