const query = require('./db');

/**
 * 获取博客列表数据
 * @param single {boolean}  是否查询单一数据 true/false true为查询单一数据
 * @param id     {string}   标签id
 * @constructor
 */
const Get_BlogList = function( single,id ) {
    let sql = '';
    if(single){
         sql = `SELECT id,label,imgUrl,title,synopsis,createTime,accessNumber,commentNumber,labelId from bloglist where labelId=${id}`;
    }else {
         sql = `SELECT id,label,imgUrl,title,synopsis,createTime,accessNumber,commentNumber,labelId from bloglist`;
    }
    return query( sql )
};

/**
 * 获取全部博客管理列表 或查询一条博客数据
 * @param value {array}
 * @constructor
 */
const Get_AdminBlogList = function (value) {
    let sql = null;
    if(value){
        sql = 'SELECT id,createTime,title from bloglist  WHERE title=?';
    }else {
        sql = 'SELECT id,createTime,title from bloglist';
    }
    return query( sql,[value] )
};

/**
 * 更新博客列表
 * @param value {array}
 * @constructor
 */
const  Update_BlogList = function (value) {
    const sql = `UPDATE bloglist SET 
                  label=?,imgUrl=?,title=?,synopsis=?,content=?,labelId=? WHERE id=?`;
    return query( sql, value )
};

/**
 * 新增博客列表
 * @param value {array}
 * @constructor
 */
const  Insert_BlogList = function (value) {
    const sql = `INSERT INTO bloglist 
                (label,imgUrl,title,synopsis,content,createTime,accessNumber,commentNumber,labelId) 
                VALUES(?,?,?,?,?,?,?,?,?)`;
    return query( sql, value )
};

/**
 * 删除博客列表
 * @param value {string}
 * @constructor
 */
const Delete_BlogList = function (value) {
    const sql = `DELETE FROM bloglist WHERE id=?`;
    return query( sql, [value] )
};

/**
 * 获取全部标签列表数据 或 查询某一条标签列表数据
 * @param value {array} [label]  label: 标签名称
 * @constructor
 */
const Get_LabelList = function (value) {
    let sql = null;
    if(value){
        sql = `SELECT * from labellist WHERE label=?`;
    }else {
        sql = `SELECT * from labellist`;
    }
    return query( sql, [value] )
};

/**
 * 更新标签列表
 * @param value {array} [label,id]  label: 标签名称 id: 标签id
 * @constructor
 */
const Update_LabelList = function (value) {
    const sql = `UPDATE labellist SET label=? WHERE id=?`;
    return query( sql, value )
};

/**
 * 新增标签列表
 * @param value {string}  label: 标签名称
 * @constructor
 */
const Insert_LabelList = function (value) {
    const sql = `INSERT INTO labellist (label) VALUES(?)`;
    return query( sql, [value] )
};

/**
 * 删除标签列表
 * @param value {string}  id: 标签id
 * @constructor
 */
const Delete_LabelList = function (value) {
    const sql = `DELETE FROM labellist WHERE id=?`;
    return query( sql, [value] )
};


module.exports = {
    Get_BlogList,
    Get_AdminBlogList,
    Update_BlogList,
    Insert_BlogList,
    Delete_BlogList,
    Get_LabelList,
    Update_LabelList,
    Insert_LabelList,
    Delete_LabelList,
};