const Router = require('koa-router')
const router = new Router()
const { loginRedirect } = require('../../middlewares/loginChecks')


router.get('/',loginRedirect, async (ctx, next) => {
  await ctx.render('index', {})
})


module.exports = router