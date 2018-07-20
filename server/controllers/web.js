const {Get_BlogList,Get_LabelList} = require("../../init/db-util");

module.exports = {
    async blog(ctx) {
        let blogList = null;
        let index = '-1';  // 标签id，用于判断显示高亮选中标签
        let labelList = null;
        // 查询单个标签数据
        if(ctx.params.data){
            try{
                blogList = await Get_BlogList(true,ctx.params.data);
                index = ctx.params.data;
            }catch (err){
                blogList = [];
            }

        }
        // 查询全部数据
        else{
            await Get_BlogList(false).then(async res => {
                blogList = res;
            }).catch(err => {
                blogList = [];
            })
        }

        await Get_LabelList().then(async res => {
            labelList = res;
        }).catch (err => {
            labelList = [];
        })

        await ctx.render('web/blog', {
            blogList,labelList,index
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
