/**
 * 写转化函数
 */
function convert(){
    var converter = new showdown.Converter();
    var html = converter.makeHtml(text);
    document.getElementById("showdown").innerHTML = html;
}