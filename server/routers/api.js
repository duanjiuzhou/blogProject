/**
 * api 子路由
 */
const router = require('koa-router')();
const apiContollor = require('../controllers/user-info');

const routers = router
    .post('/login.do',apiContollor.signIn)
    .get('/lable/select.do',apiContollor._Get_LabelList)
    .put('/label/update.do',apiContollor._Update_LabelList)
    .post('/label/insert.do',apiContollor._Insert_LabelList)
    .del('/label/delete.do',apiContollor._Delete_LabelList)
    .get('/blog/select.do',apiContollor._Get_AdminBlogList)
    .get('/blog/selectOne.do',apiContollor._Get_BlogListOne)
    .put('/blog/update.do',apiContollor._Update_BlogList)
    .post('/blog/insert.do',apiContollor._Insert_BlogList)
    .del('/blog/delete.do',apiContollor._Delete_BlogList)

module.exports = routers;