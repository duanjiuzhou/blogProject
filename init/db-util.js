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
         sql = `SELECT * from BlogList where labelId=${id}`;
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
const Get_LabelList = function (value) {
    let sql = null;
    if(value){
        sql = `SELECT * from LabelList WHERE label=?`;
    }else {
        sql = `SELECT * from LabelList`;
    }
    return query( sql, [value] )
};

/**
 * 更新标签列表
 * @param value {array} [label,id]  label: 标签名称 id: 标签id
 * @constructor
 */
const Update_LabelList = function (value) {
    const sql = `UPDATE LabelList SET label=? WHERE id=?`;
    return query( sql, value )
};

/**
 * 新增标签列表
 * @param value {string}  label: 标签名称
 * @constructor
 */
const Insert_LabelList = function (value) {
    const sql = `INSERT INTO LabelList (label) VALUES(?)`;
    return query( sql, [value] )
};

/**
 * 删除标签列表
 * @param value {string}  id: 标签id
 * @constructor
 */
const Delete_LabelList = function (value) {
    const sql = `DELETE FROM LabelList WHERE id=?`;
    return query( sql, [value] )
};


module.exports = {
    Get_BlogList,
    Get_LabelList,
    Update_LabelList,
    Insert_LabelList,
    Delete_LabelList,
};