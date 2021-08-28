const Router = require('koa-router')
const router = new Router()
const {isExist, register, login, changeInfo, changePassword, logout} = require('../../controller/user')
const userValidate = require('../../validator/user')
const { genValidator } = require('../../middlewares/validator')
const { loginCheck } = require('../../middlewares/loginChecks')
const {getFollowers} = require('../../controller/user-relation')

router.prefix('/api/user')

router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  ctx.body = await isExist(userName)
})

router.post('/register',genValidator(userValidate), async (ctx, next) => {
  const {userName, password, gender} = ctx.request.body
  ctx.body = await register({userName, password, gender})
})

router.post('/login', async (ctx, next) => {
  const {userName, password} = ctx.request.body
  ctx.body = await login(ctx, userName, password)
})

router.patch('/changeInfo', loginCheck, genValidator(userValidate), async (ctx, next) => {
  const {nickName, city, picture} = ctx.request.body
  ctx.body = await changeInfo(ctx, {nickName, city, picture})
})

router.patch('/changePassword', loginCheck, genValidator(userValidate), async (ctx, next) => {
  const {password, newPassword} = ctx.request.body
  const {userName} = ctx.session.userInfo
  ctx.body = await changePassword(userName, password, newPassword)
})

router.post('/logout', loginCheck, async (ctx, next) => {
  ctx.body = await logout(ctx)
})


router.get('/getAtList', loginCheck, async (ctx, next) => {
  try {
    const {id: userId} = ctx.session.userInfo
    const res = await getFollowers(userId)
    const {followersList} = res.data
    const list = followersList.map(user => {
      return `${user.nickName} - ${user.userName}`
    })

    console.log(list, 'list')

    ctx.body = list
  } catch (error) {
    console.log(error, 'error')
  }
})



module.exports = router