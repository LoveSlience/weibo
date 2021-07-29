const Router = require('koa-router')
const router = new Router()

router.get('/error', async (ctx, next) => {
  await ctx.render('error')
})

//404

router.get('*', async (ctx, next) => {
  await ctx.render('404')
})


module.exports = router