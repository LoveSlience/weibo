const Router = require('koa-router')
const router = new Router()

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
  console.log(ctx.session, 'lohinsession')
  await ctx.render('login', getUserInfo(ctx))
})

router.get('/register', async (ctx, next) => {
  console.log(ctx.session, 'registeression')
  await ctx.render('register', getUserInfo(ctx))
})

//404



module.exports = router