const Router = require('koa-router')
const router = new Router()
const { loginCheck } = require('../../middlewares/loginChecks')
const { getProfileBlogList, } = require('../../controller/blog-profile')
const { follow, unFollow } = require('../../controller/user-relation')
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

router.post('/follow', loginCheck, async (ctx, next) => {
  const  { id: myUserId } = ctx.session.userInfo
  const { userId: curUserId } = ctx.request.body
  ctx.body = await follow(myUserId, curUserId)
})


router.post('/unfollow', loginCheck, async (ctx, next) => {
  const  { id: myUserId } = ctx.session.userInfo
  const { userId: curUserId } = ctx.request.body
  ctx.body = await unFollow(myUserId, curUserId)
})
 
module.exports = router
 