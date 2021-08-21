const Router = require('koa-router')
const router = new Router()

router.get('/login', async (ctx, next) => {
  await ctx.render('login', {})
})

router.get('/register', async (ctx, next) => {
  await ctx.render('register', {})
})

//404



module.exports = router