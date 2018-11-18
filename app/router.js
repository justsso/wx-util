const Router = require('koa-router');
const apiRouter = require('./routers/api');
const wxRouter = require('./routers/wx');
const router = new Router();

router.use('/api', apiRouter.routes());
router.use('/wx',wxRouter.routes());

module.exports = router;
