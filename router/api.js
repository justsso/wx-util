const {appId, appSerect, domain} = require('../../config');
const Router = require('koa-router');
let router = new Router();
const axios = require('axios');
const {
    getRanId,
    generateKey,
    ascLine,
    getSha1
} = require('../utils/security');

//微信公众号 网页登陆
router.get('/login', async (ctx, next) => {
    try {
        console.log('访问/login接口');
        let code = ctx.query.code;
        let state = ctx.query.state;
        console.log(ctx.query, 11);
        if(code && state){
            //微信登陆
            var result = await axios.get(`https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appId}&secret=${appSerect}&code=${code}&grant_type=authorization_code`);
            if (result.data) {
                console.log(result.data);
                const {access_token, openid} = result.data;
                console.log(openid);
                var student = await axios.get(`https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`);
                console.log(student.data, 25);
                if (student) {
                    ctx.body = {
                        data: student.data
                    }
                }
            }
        }else {
            //    用户调用
            console.log('重定向 微信登陆');
            const redirect_uri = encodeURI(`http://${domain}/api/login`);
            ctx.redirect(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=120#wechat_redirect`);
        }
    }catch (e) {
        console.log(e)
    }
});

//所有需要使用JS-SDK的页面必须先注入配置信息，否则将无法调用
//weconfigparams
router.get('/wx_config', async (ctx, next) => {
    const noncestr = getRanId(16);
    const timestamp = (new Date().getTime() + '').slice(0, 10);
    console.log(ctx.query.url, '请求路径');
    // url（当前网页的URL，不包含#及其后面部分
    const wxConfig = Object.assign({noncestr: noncestr}, {timestamp: timestamp}, global.wx, {url: ctx.query.url});
    ascLine(wxConfig).then(lineWx => {
        let sha = '';
        for (let item in lineWx) {
            if (item) {
                sha += `${item}=${lineWx[item]}&`
            }
        }
        return Promise.resolve(sha.slice(0, -1));
    }).then(wxString => {
        if (wxString) {
            // console.log(wxString,"weString")
            ctx.body = {
                signature: getSha1(wxString), noncestr, timestamp, appId: appId
            }
        }
    })
});

module.exports = router;

