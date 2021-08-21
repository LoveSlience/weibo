
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const {isProd} = require('./utils/env')

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
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

//路由
const jsonRouterView = require('./routes/views/json')
const errorViewRouter = require('./routes/views/error')
const userViewRouter = require('./routes/views/user')
const userApiRouter = require('./routes/api/user')

app.use(jsonRouterView.routes(), jsonRouterView.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(userApiRouter.routes(), userApiRouter.allowedMethods())
//404路由注册到最下面
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())

app.on('error', (err, ctx) => {
  console.log('error', err, ctx)
})

module.exports = app
