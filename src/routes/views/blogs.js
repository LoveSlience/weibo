const Router = require('koa-router')
const router = new Router()
const { loginRedirect } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getSquareBlogList } = require('../../controller/blog-square')


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
  const { isEmpty, blogList, pageSize, count, pageIndex} = res.data
  await ctx.render('profile', {
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count
    },
    userData: {
      userInfo: ctx.session.userInfo
    }
  })
})


router.get('/square',loginRedirect, async (ctx, next) => {
  const res = await getSquareBlogList(0)
  const { isEmpty, blogList, pageSize, count, pageIndex} = res.data || {}
  console.log('sqaure')
  // ctx.render('square')
  await ctx.render('square', {
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count
    }
  })
})


module.exports = router