const Koa = require('koa')
const convert = require('koa-convert');
const koaLogger = require('koa-logger');
const helmet = require('koa-helmet');
const bodyParser = require('koa-bodyparser');

const static = require('koa-static');
const view = require('koa-views');
const path = require('path');
const router = require('./router/index');
const config = require('./config');
const app = new Koa();
const axios = require('axios');

app.use(convert(koaLogger()));
app.use(bodyParser());
app.use(helmet());

const staticPath = './../static';
const viewsPath = './views';
app.use(static(
    path.join(__dirname,  staticPath)
))
app.use(view(path.join(__dirname, viewsPath),{
    extension: 'ejs'
}));


app.use(router.routes()).use(router.allowedMethods());

async function getAccessToken() {
    let accessToken;
    var appId = config.appId;
    var appSecret = config.appSerect;

    var tokenObj = await axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`);
    console.log(tokenObj.data, 'tokenObj.data');
    if(!tokenObj.data){
        return ;
    }else {
        if(tokenObj.data.access_token){
            var access_token = tokenObj.data.access_token;
            global.access_token = access_token;
        }

    }
}

// getAccessToken();

// setInterval(() => {
//     getAccessToken();
// }, 1.5 * 60 *60 * 1000);



app.listen(3000)
console.log(`项目启动 at port 3000`);