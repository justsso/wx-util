const Koa = require('koa')
const convert = require('koa-convert');
const koaLogger = require('koa-logger');
const helmet = require('koa-helmet');
const bodyParser = require('koa-bodyparser');

const static = require('koa-static');
const view = require('koa-views');
const path = require('path');
const router = require('./app/router');
const app = new Koa();
const axios = require('axios');
const getAccessToken = require('./init').getAccessToken;

//错误处理


app.use(async (ctx, next) => {
    try {
        await next();
    } catch (e) {
        ctx.response.status = e.statusCode || e.status || 500;
        ctx.response.body = {
            message: err.message
        };
        ctx.app.emit('error', err, ctx);
    }
});

app.on('error', (err, ctx) => {
    console.error('server error', err);
});

app.use(convert(koaLogger()));
app.use(bodyParser());
app.use(helmet());

const staticPath = './../static';
const viewsPath = './views';
app.use(static(
    path.join(__dirname, staticPath)
));
app.use(view(path.join(__dirname, viewsPath), {
    extension: 'ejs'
}));


app.use(router.routes()).use(router.allowedMethods());

getAccessToken().then(data => {
    global.accessTokens = data;
    console.log(global.accessTokens, 'app.js')
});
setInterval(() => {
    getAccessToken().then(data => {
        global.accessTokens = data;
    });
}, 1.5 * 60 * 60 * 1000);


app.listen(3000);
console.log(`项目启动 at port 3000`);
