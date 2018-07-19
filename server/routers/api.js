/**
 * api 子路由
 */
const router = require('koa-router')();
const apiContollor = require('../controllers/user-info');

const routers = router
    .post('/login.do',apiContollor.signIn)
    .get('/LableList.do',apiContollor._Get_LableList)

module.exports = routers;