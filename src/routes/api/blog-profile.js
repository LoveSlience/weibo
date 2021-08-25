const Router = require('koa-router')
const router = new Router()
const { loginCheck } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
router.prefix('/api/profile')

const { getBlogListStr } = require('../../utils/blog')

// 上传图片
router.get('/loadMore/:userName/:pageIndex', loginCheck, async (ctx, next) => {
  let { userName, pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex)

  const result = await getProfileBlogList(userName, pageIndex)
  result.data.blogListTpl = getBlogListStr(result.data.blogList)

  ctx.body = result
})
 
module.exports = router
 