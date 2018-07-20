const {Get_LabelList} = require("../../init/db-util");

module.exports = {
    async blogManage(ctx) {
        const title = '';
        await ctx.render('admin/blogManage', {
            title,
        })
    },
    async labelTable(ctx) {
        let lableList = null;
            try{
                lableList = await Get_LabelList();
            }catch (err){
                lableList = [{}];
            }
        await ctx.render('admin/labelTable', {
            lableList,
        })
    },
};
