
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const session = require('koa-generic-session')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const redisStore = require('koa-redis')
const koaStatic = require('koa-static')
const logger = require('koa-logger')
const path = require('path')
const {isProd} = require('./utils/env')
const { SESSION_SECRET_KEY } = require('./conf/secretKeys')


const { REDIS_CONF } = require('./conf/db')
// error handler
let onErrorConfig = {

}
if (isProd) {
  onErrorConfig = {
    redirect: '/error'
  }
}

onerror(app, onErrorConfig)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(koaStatic(__dirname + '/public'))
app.use(koaStatic(path.join(__dirname, '..', 'uploadFiles')))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// session 配置
app.keys = [SESSION_SECRET_KEY]
app.use(session({
  key: 'weibo.sid', // cookie name 默认是 `koa.sid`
  prefix: 'weibo:sess:', // redis key 的前缀，默认是 `koa:sess:`
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000  // 单位 ms
  },
  store: redisStore({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))

//路由
const jsonRouterView = require('./routes/views/json')
const errorViewRouter = require('./routes/views/error')
const userViewRouter = require('./routes/views/user')
const userApiRouter = require('./routes/api/user')
const utilsApiRouter = require('./routes/api/utils')
const blogViewRouter = require('./routes/views/blogs')
const blogHomeApiRouter = require('./routes/api/blog-home')
const profileApiRouter = require('./routes/api/blog-profile')

app.use(jsonRouterView.routes(), jsonRouterView.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(userApiRouter.routes(), userApiRouter.allowedMethods())
app.use(utilsApiRouter.routes(), utilsApiRouter.allowedMethods())
app.use(blogViewRouter.routes(), blogViewRouter.allowedMethods())
app.use(blogHomeApiRouter.routes(), blogHomeApiRouter.allowedMethods())
app.use(profileApiRouter.routes(), profileApiRouter.allowedMethods())
//404路由注册到最下面
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())

app.on('error', (err, ctx) => {
  console.log('error', err, ctx)
})

module.exports = app
