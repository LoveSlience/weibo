const Router = require('koa-router')
const router = new Router()
const { create } = require('../../controller/blog-home')
const blogValidate  = require('../../validator/blogs')
const { loginCheck } =require('../../middlewares/loginChecks')
const { genValidator } = require('../../middlewares/validator')

router.prefix('/api/blog')

router.post('/create',loginCheck, genValidator(blogValidate),  async (ctx, next) => {
  const { content, image } = ctx.request.body
  const { id: userId } = ctx.session.userInfo
  ctx.body = await create({userId, content, image})
})




module.exports = router