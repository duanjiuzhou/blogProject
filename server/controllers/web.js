const {Get_BlogList,Get_LabelList,Get_BlogListOne} = require("../../init/db-util");

module.exports = {
    async blog(ctx) {
        console.log('session',ctx.session)
        let blogList = null;
        let index = '-1';  // 标签id，用于判断显示高亮选中标签
        let labelList = null;
        // 查询单个标签数据
        var reg = /^[0-9]*$/;
        if(ctx.params.data){
            if(!reg.test(ctx.params.data)){
                return await ctx.render('web/error');
            }
            const data = {single:true,id:ctx.params.data,pageNum:1,pageSize:12};
            await Get_BlogList(data).then(async res => {
                blogList = res;
                index = ctx.params.data
            }).catch(err => {
                blogList = [];
            });

        }
        // 查询全部数据
        else{
            await Get_BlogList({single:false,pageNum:1,pageSize:12}).then(async res => {
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

        if(blogList.length == 0){
            await ctx.render('web/error');
        }else {
            await ctx.render('web/blog', {
                blogList,labelList,index
            })
        }
    },
    async moods(ctx) {
        const title = '';
        await ctx.render('web/moods', {
            title,
        })
    },
    async details(ctx) {
        if(isNaN(ctx.params.data)){
            return await ctx.render('web/error')
        }else {
            let blogList = null;
            await Get_BlogListOne(ctx.params.data).then(async res => {
                if(res.length == 0){
                    return await ctx.render('web/error');
                }else {
                    blogList = res[0];
                    await ctx.render('web/details', {
                        blogList,
                    })
                }
            }).catch(async err => {
                await ctx.render('web/error');
            })
        }
    },
};
