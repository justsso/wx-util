const Router = require('koa-router');
const wxConfig = require('../../config/config.default').wxConfig;
const parsePostData = require('../../util/lib').parsePostData;
const parseXML = require('../../util/lib').parseXML;
let router = new Router();

//公众号开发
//公众号都请求这个接口
router.post('/', async (ctx, next) => {
    let postData = "";
    postData = await parsePostData(ctx);
    console.log(postData, 9);
    let obj = await parseXML(postData);
    ctx.body = obj;
    // 分析obj 处理业务需求，如接受普通消息，接受事件推送
});

//  服务器 /wx 用于配置微信公众号的服务器
router.get('/', async (ctx, next) => {
    if (ctx.query) {
        var {signature, timestamp, nonce, echostr} = ctx.query;
        if (echostr) {
            if (signature) {
                //for 循环token
                for (let wxItem of Object.values(wxConfig)) {
                    let list = [wxItem.TOKEN, timestamp, nonce];
                    list.sort();
                    list = list.join("");
                    let hash = crypto.createHash('sha1');
                    hash.update(list);
                    let hashcode = hash.digest('hex');
                    if (hashcode === signature) {
                        ctx.body = echostr;
                        await next();
                        return;
                    }
                }
            } else {
                console.log('无signature')
            }
        } else {
            console.log('来自用户');
            ctx.body = '缺少参数';
        }
    } else {
        ctx.body = {
            info: 'ctx.query 为null'
        }
    }
});


module.exports = router;
