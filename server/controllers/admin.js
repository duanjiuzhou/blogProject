const {Get_LabelList,Get_AdminBlogList} = require("../../init/db-util");

module.exports = {
    async blogManage(ctx) {
        let blogList = null;
        await Get_AdminBlogList().then(async res => {
            blogList = res;
        }).catch(err => {
            blogList = [];
        })
        await ctx.render('admin/blogManage', {
            blogList
        })
    },
    async labelTable(ctx) {
        let lableList = null;
        await Get_LabelList().then(async res => {
            lableList = res;
        }).catch(err => {
            lableList = [];
        })

        await ctx.render('admin/labelTable', {
            lableList
        })
    },
};
