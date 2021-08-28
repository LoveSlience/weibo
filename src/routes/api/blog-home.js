const Router = require('koa-router')
const router = new Router()
const { create } = require('../../controller/blog-home')
const blogValidate  = require('../../validator/blogs')
const { loginCheck } =require('../../middlewares/loginChecks')
const { genValidator } = require('../../middlewares/validator')
const { getBlogListStr } = require('../../utils/blog')
const { getHomeBlogList } = require('../../controller/blog-home')

router.prefix('/api/blog')

router.post('/create',loginCheck, genValidator(blogValidate),  async (ctx, next) => {
  const { content, image } = ctx.request.body
  const { id: userId } = ctx.session.userInfo
  ctx.body = await create({userId, content, image})
})


router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
  let { pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex)  // 转换 number 类型
  const { id: userId } = ctx.session.userInfo
  const result = await getHomeBlogList(userId, pageIndex)
  // 渲染模板
  result.data.blogListTpl = getBlogListStr(result.data.blogList)

  ctx.body = result
})



module.exports = router