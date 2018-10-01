const Router = require('koa-router');



let router = new Router();

router.get('/aa', async  (ctx,next) => {
    ctx.body = '123';
    next()
});

router.post('/wx', async (ctx, next) => {

    let postData = "";
    postData = await parsePostData(ctx);

    ctx.body = postData;
});

// 解析上下文里 node 原生请求的 POST 参数
function parsePostData(ctx) {
    return new Promise((resovle, reject) => {
        try {
            let postData = "";
            //  ctx.req 是原生 HTTP 请求对象
            ctx.req.on("data", (data) => {
                postData += data;
            });
            ctx.req.on("end", () => {
                resovle(postData);
            })
        } catch (err) {
            reject(err);
        }
    });
}


module.exports = router;