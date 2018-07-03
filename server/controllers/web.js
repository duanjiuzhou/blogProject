const dbUtils = require("../utils/db-util")
let _sql = `SELECT * from BlogList`;

module.exports = {
    async blog(ctx) {
        const title = await dbUtils.createTable( _sql );
        console.log(title)
        await ctx.render('web/blog', {
            title,
        })
    },
    async moods(ctx) {
        const title = '';
        await ctx.render('web/moods', {
            title,
        })
    },
    async details(ctx) {
        const title = '';
        console.log(ctx.params); //获取动态路由的数据
        await ctx.render('web/details', {
            title,
        })
    },
};
