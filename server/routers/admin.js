/**
 * admin子路由
 */

const router = require('koa-router')();
const admin = require('../controllers/admin');
const routes = router
    .get('/',admin.blogManage)
    .get('/labelTable',admin.labelTable)

module.exports = routes;
