const Router = require('koa-router')
const router = new Router()


router.get('/json', async (ctx, next) => {
  throw Error()
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router