/**
 * 主页子路由
 */

const router = require('koa-router')();
const home = require('../controllers/home');
const routes = router.get('/', home)
module.exports = routes;