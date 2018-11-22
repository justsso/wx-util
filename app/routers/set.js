const Router = require('koa-router');
const menuController = require('../controller/menuController');
const getAccessToken = require('../../util/lib').getAccessToken;
let router = new Router();
//一些例子🌰

//获取菜单
router.get('/menu', async (ctx, next) => {
    let access_token = getAccessToken("ceshi");
    let data = await menuController.getMenu(access_token);
    ctx.body = {
        data
    }
});

router.post('/menu', async (ctx, next) => {
    let access_token = getAccessToken("ceshi");

});

module.exports = router;
