const {Get_BlogList,Get_LableList} = require("../../init/db-util");

module.exports = {
    async blog(ctx) {
        let blogList = null;
        // 标签id，用于判断显示高亮选中标签
        let index = '-1';
        // 查询单个标签数据
        if(ctx.params.data){
             blogList = await Get_BlogList(true,ctx.params.data);
             index = ctx.params.data;
        }
        // 查询全部数据
        else{
            blogList = await Get_BlogList(false);
        }
        const lableList = await Get_LableList();
        await ctx.render('web/blog', {
            blogList,lableList,index
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
