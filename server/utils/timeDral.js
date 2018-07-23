/**
 * 时间不满2位添加0
 * @param m
 * @returns {string}
 */
const add = function (m) {
    return m < 10 ? '0' + m : m
}

/**
 * 格式化时间 hh:mm:ss
 */
const SetDateHMS = function (params) {
    if(!params){
        var time = new Date();
    }else {
        var time = new Date(params);
    }
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return add(h) + ':' + add(mm) + ':' + add(s);
}

/**
 * 格式化时间 yyyy-MM-dd
 */
const SetDateYMD = function (params) {
    if(!params){
        var time = new Date();
    }else {
        var time = new Date(params);
    }
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    return y + '-' + add(m) + '-' + add(d) ;
};

/**
 * 格式化时间 yyyy-MM-dd hh:mm:ss
 * @returns {string}
 * @constructor
 */
const SetDateYMDHMS = function () {
    return `${SetDateYMD()} ${SetDateHMS()}`;
};

module.exports = {
    SetDateHMS,
    SetDateYMD,
    SetDateYMDHMS
}