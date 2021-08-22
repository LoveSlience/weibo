const { getUserInfo, createUser } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { 
  registerUserNameNotExistInfo, 
  registerUserNameExistInfo, 
  registerFailInfo, 
  loginFailInfo 
} = require('../model/Errinfo')
const { doCrypto } = require('../utils/cryp')


async function isExist(userName) {
  const userInfo = await getUserInfo(userName) 
  if(userInfo) {
    return new SuccessModel(userInfo)  
  }else {
    return new ErrorModel(registerUserNameNotExistInfo)   
  }
}

async function register({userName, password, gender}) {
  const userInfo = await getUserInfo(userName) 
  if(userInfo) {
    return new ErrorModel(registerUserNameExistInfo)   
  }
  try {
    await createUser({
      userName,
      password: doCrypto(password),
      gender
    })
    return new SuccessModel()
  } catch (error) {
    return new ErrorModel(registerFailInfo)
  }
}

async function login(ctx,userName, password) {
  const userInfo = await getUserInfo(userName, doCrypto(password))
  if(!userInfo) {
    return new ErrorModel(loginFailInfo)
  }
  if(!ctx.session.userInfo) {
    ctx.session.userInfo = userInfo
  }
  console.log(ctx.session.userInfo, 'ctx.session.userInfo')
  return new SuccessModel()
}


module.exports = {
  isExist,
  register,
  login
}