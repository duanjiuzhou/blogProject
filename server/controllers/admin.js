const {Get_LableList} = require("../../init/db-util");

module.exports = {
    async blogManage(ctx) {
        const title = '';
        await ctx.render('admin/blogManage', {
            title,
        })
    },
    async labelTable(ctx) {
        // const lableList = await Get_LableList();
        const lableList = [{}];
        await ctx.render('admin/labelTable', {
            lableList,
        })
    },
};
