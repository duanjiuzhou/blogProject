module.exports = {
    async blogManage(ctx) {
        const title = '';
        await ctx.render('admin/blogManage', {
            title,
        })
    },
    async labelTable(ctx) {
        const title = '';
        await ctx.render('admin/labelTable', {
            title,
        })
    },
};
