const Router = require('koa-router')
const router = new Router()
const { loginRedirect } = require('../../middlewares/loginChecks')

function getUserInfo(ctx) {
  const res = {
    isLogin: false
  }
  if(ctx.session.userInfo) {
    res.isLogin = true
    res.userName = ctx.session.userInfo.userName
  }
  return res
}

router.get('/login', async (ctx, next) => {
  await ctx.render('login', getUserInfo(ctx))
})

router.get('/register', async (ctx, next) => {
  await ctx.render('register', getUserInfo(ctx))
})

router.get('/setting', loginRedirect ,async (ctx, next) => {
  
  await ctx.render('setting', ctx.session.userInfo)
})

//404



module.exports = router