const Router = require('koa-router')
const router = new Router()
const {loginRedirect} = require('../middlewares/loginChecks')


router.get('/', loginRedirect,  async (ctx, next) => {
  await ctx.render('index', {
    title: 'hello koa 2',
    isMe: true,
    blogData: {
      isEmpty:true
    },
    userData: {
      userInfo: {
        picture: ''
      },
      fansData: {
        userList: []
      },
      followersData: {
        userList: []
      }
    },
   
  })
})

module.exports = router