const Router = require('koa-router')
const router = new Router()
const {isExist, register} = require('../../controller/user')

router.prefix('/api/user')

router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  ctx.body = await isExist(userName)
})

router.post('/register', async (ctx, next) => {
  const {userName, password, gender} = ctx.request.body
  ctx.body = await register({userName, password, gender})
})

//404



module.exports = router