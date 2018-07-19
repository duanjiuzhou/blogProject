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
         sql = `SELECT * from BlogList where lableId=${id}`;
    }else {
         sql = `SELECT * from BlogList`;
    }
    return query( sql, [] )
};

/**
 * 获取全部标签列表数据 或 查询某一条标签列表数据
 * @param value {array} [label]  label: 标签名称
 * @constructor
 */
const Get_LableList = function (value) {
    const sql = `SELECT * from LableList WHERE label=?`;
    return query( sql, [value] )
};

/**
 * 更新标签列表
 * @param value {array} [label,id]  label: 标签名称 id: 标签id
 * @constructor
 */
const Update_LableList = function (value) {
    const sql = `UPDATE LableList SET label=? WHERE id=?`;
    return query( sql, [value] )
};

/**
 * 新增标签列表
 * @param value {array} [label] label: 标签名称
 * @constructor
 */
const Insert_LableList = function (value) {
    const sql = `INSERT INTO LableList (label) VALUES(?)`;
    return query( sql, [value] )
};

/**
 * 删除标签列表
 * @param value {array} [id] id: 标签id
 * @constructor
 */
const Delete_LableList = function (value) {
    const sql = `DELETE FROM LableList WHERE id=?`;
    return query( sql, [value] )
};


module.exports = {
    Get_BlogList,
    Get_LableList,
    Update_LableList,
    Insert_LableList,
    Delete_LableList,
};