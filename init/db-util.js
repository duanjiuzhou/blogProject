const query = require('./db');

/**
 * 获取博客列表数据
 * @param data {object} {single:true,id:ctx.params.data,pageNum:1,pageSize:12} single {boolean}  是否查询单一数据 true/false true为查询单一数据
 * @constructor
 */
const Get_BlogList = function( data ) {
    let sql = '';
    // 查询单一类型数据
    if(data.single){
         sql = `SELECT SQL_CALC_FOUND_ROWS id,label,imgUrl,title,synopsis,createTime,accessNumber,commentNumber,labelId from bloglist where labelId=${data.id}
         order by id limit ${(data.pageNum-1)*data.pageSize},${data.pageSize}`;
        return query( sql )
    }
    // 查询全部类型数据
    else {
         sql = `SELECT SQL_CALC_FOUND_ROWS id,label,imgUrl,title,synopsis,createTime,accessNumber,commentNumber,labelId 
         from bloglist order by id limit ${(data.pageNum-1)*data.pageSize},${data.pageSize}`;
        return query( sql )
    }

};
const Get_ListNum = function () {
    return query( 'SELECT FOUND_ROWS()' );
}

/**
 *  查询一条博客详情数据
 * @param value {string}
 * @constructor
 */
const Get_BlogListOne = function (value) {
    const sql = 'SELECT title,content,synopsis,labelId,imgUrl from bloglist WHERE id=?';
    return query(sql,[value])
}

/**
 * 获取全部博客管理列表 或查询一条博客数据
 * @param value {object}
 * @constructor
 */
const Get_AdminBlogList = function (value) {
    let sql = null;
    // 单一查询
    if(value.single){
        sql = `SELECT id,createTime,title from bloglist WHERE title=${value.title}`;
    }else {
        sql = `SELECT SQL_CALC_FOUND_ROWS id,createTime,title from bloglist 
        order by id limit ${(value.pageNum-1)*value.pageSize},${value.pageSize}`;
    }
    return query( sql )
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
 * @param value {array}
 * @constructor
 */
const Insert_LabelList = function (value) {
    const sql = `INSERT INTO labellist (label,createTime) VALUES(?,?)`;
    return query( sql, value )
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
    Get_ListNum,
    Get_BlogListOne,
    Get_AdminBlogList,
    Update_BlogList,
    Insert_BlogList,
    Delete_BlogList,
    Get_LabelList,
    Update_LabelList,
    Insert_LabelList,
    Delete_LabelList,
};