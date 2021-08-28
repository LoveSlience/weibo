const Router = require('koa-router')
const router = new Router()
const { loginRedirect } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getSquareBlogList } = require('../../controller/blog-square')
const { getFans, getFollowers } = require('../../controller/user-relation')
const { getHomeBlogList } = require('../../controller/blog-home')
const { isExist } = require('../../controller/user')


router.get('/',loginRedirect, async (ctx, next) => {
  const userInfo = ctx.session.userInfo
  const { id: userId } = userInfo

  const result = await getHomeBlogList(userId)
  const { isEmpty, blogList, pageSize, pageIndex, count } = result.data
  // 获取粉丝
  const fansResult = await getFans(userId)
  const { count: fansCount, fansList } = fansResult.data

  // 获取关注人列表
  const followersResult = await getFollowers(userId)
  const { count: followersCount, followersList } = followersResult.data

  await ctx.render('index', {
    userData: {
      userInfo,
      fansData: {
        count: fansCount,
        list: fansList
      },
      followersData: {
        count: followersCount,
        list: followersList
      }
    },
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count
    }
  })
})


router.get('/profile',loginRedirect, async (ctx, next) => {
  const { userName } = ctx.session.userInfo
  await ctx.redirect(`/profile/${userName}`)
})

router.get('/profile/:userName',loginRedirect, async (ctx, next) => {

  const myUserInfo = ctx.session.userInfo
  const myUserName = myUserInfo.userName

  let curUserInfo
  const { userName: curUserName } = ctx.params
  const isMe = myUserName === curUserName
  if(isMe) {
    curUserInfo = myUserInfo
  }else {
    const existResult = await isExist(curUserName)
    if (existResult.errno !== 0) {
      // 用户名不存在
      return
    }
    // 用户名存在
    curUserInfo = existResult.data
  }

  const res = await getProfileBlogList(curUserName, 0)
  const { isEmpty, blogList, pageSize, count, pageIndex} = res.data

  //获取粉丝
  const fansRes  = await getFans(curUserInfo.id)
  const {count: fansCount, fansList} = fansRes.data

  const amIFollowed = fansList.some(item => item.userName === myUserName)

  // 获取关注人
  const followerRes  = await getFollowers(curUserInfo.id)
  const {count: followersCount,  followersList } = followerRes.data


  await ctx.render('profile', {
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count
    },
    userData: {
      userInfo: curUserInfo,
      isMe,
      amIFollowed,
      fansData: {
        count: fansCount,
        list: fansList
      },
      followersData: {
        count: followersCount,
        list: followersList
      }
    }
  })
})


router.get('/square',loginRedirect, async (ctx, next) => {
  const res = await getSquareBlogList(0)
  const { isEmpty, blogList, pageSize, count, pageIndex} = res.data || {}
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