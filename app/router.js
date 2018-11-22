const Router = require('koa-router');
const apiRouter = require('./routers/api');
const wxRouter = require('./routers/wx');
const setRouter = require('./routers/set');
const router = new Router();

router.use('/api', apiRouter.routes());
router.use('/wx',wxRouter.routes());
router.use('/set', setRouter.routes());

module.exports = router;
