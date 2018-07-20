/**
 * api 子路由
 */
const router = require('koa-router')();
const apiContollor = require('../controllers/user-info');

const routers = router
    .post('/login.do',apiContollor.signIn)
    .get('/LableList.do',apiContollor._Get_LabelList)
    .put('/label/update.do',apiContollor._Update_LabelList)
    .post('/label/insert.do',apiContollor._Insert_LabelList)
    .del('/label/delete.do',apiContollor._Delete_LabelList)

module.exports = routers;