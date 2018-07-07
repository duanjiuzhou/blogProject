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

const Get_LableList = function (value) {
    const sql = `SELECT * from LableList`;
    return query( sql, [value] )
}

module.exports = {
    Get_BlogList,
    Get_LableList
}