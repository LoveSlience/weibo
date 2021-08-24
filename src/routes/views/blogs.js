const Router = require('koa-router')
const router = new Router()
const { loginRedirect } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')


router.get('/',loginRedirect, async (ctx, next) => {
  await ctx.render('index', {})
})


router.get('/profile',loginRedirect, async (ctx, next) => {
  const { userName } = ctx.session.userInfo
  await ctx.redirect(`/profile/${userName}`)
})

router.get('/profile/:userName',loginRedirect, async (ctx, next) => {
  const { userName: curUserName } = ctx.params
  const res = await getProfileBlogList(curUserName, 0)
  const { isEmpty, blogList, pageSize, count, pageIndex} = res
  await ctx.render('profile', {
    isEmpty,
    blogList,
    pageSize,
    pageIndex,
    count
  })
})


module.exports = router