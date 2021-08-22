const { ErrorModel } = require('../model/ResModel')
const { loginCheckFailInfo } = require('../model/ErrInfo')


async function loginCheck(ctx, next) {
  if(ctx.session && ctx.session.userInfo) {
    await next()
    return 
  }
  ctx.body = new ErrorModel(loginCheckFailInfo)
}

async function loginRedirect(ctx, next) {
  if(ctx.session && ctx.session.userInfo) {
    await next()
    return 
  }
  const url = ctx.url
  ctx.redirect('/login?' + encodeURIComponent(url)) 
}

module.exports = {
  loginCheck,
  loginRedirect
}