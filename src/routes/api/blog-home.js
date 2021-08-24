const Router = require('koa-router')
const router = new Router()
const { create } = require('../../controller/blog-home')

router.prefix('/api/blog')

router.post('/create', async (ctx, next) => {
  const { content, image } = ctx.request.body
  const { id: userId } = ctx.session.userInfo
  ctx.body = await create({userId, content, image})
})




module.exports = router