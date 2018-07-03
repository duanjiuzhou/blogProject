const query = require('../../init/db');

let createTable = function( sql ) {
    return query( sql, [] )
}

module.exports = {
    query,
    createTable,
}