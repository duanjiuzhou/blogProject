const {Get_LabelList,Get_AdminBlogList} = require("../../init/db-util");

module.exports = {
    async blogManage(ctx) {
        let blogList = null;
        let labelList = null;
        await Get_AdminBlogList().then(async res => {
            blogList = res;
        }).catch(err => {
            blogList = [];
        })

        await Get_LabelList().then(async res => {
            labelList = res;
        }).catch(err => {
            labelList = [];
        })

        await ctx.render('admin/blogManage', {
            blogList,labelList
        })
    },
    async labelTable(ctx) {
        let labelList = null;
        await Get_LabelList().then(async res => {
            labelList = res;

        }).catch(err => {
            labelList = [];
        })
        await ctx.render('admin/labelTable', {
            labelList
        })
    },
};
