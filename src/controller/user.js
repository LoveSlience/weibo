const { getUserInfo, createUser, updateUser } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { 
  registerUserNameNotExistInfo, 
  registerUserNameExistInfo, 
  registerFailInfo, 
  loginFailInfo, 
  changeInfoFailInfo,
  changePasswordFailInfo
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
  return new SuccessModel()
}

async function changeInfo(ctx, {nickName, city, picture}) {
  const userName = ctx.session.userInfo.userName
  if(!nickName) {
    nickName = userName
  }
  const res = await updateUser({
    newNickName: nickName,
    newCity: city,
    newPicture: picture
  }, {
    userName
  })

  if(res) {
    Object.assign(ctx.session.userInfo, {
      userName,
      city,
      picture
    })
    return new SuccessModel()
  }

  return new ErrorModel(changeInfoFailInfo)
}

async function changePassword(userName, password, newPassword) {
  console.log(userName, password, newPassword, 'userName, password, newPassword')
  const res = await updateUser({newPassword: doCrypto(newPassword)}, {userName, password: doCrypto(password)})
  if(res) {
    return new SuccessModel()
  }
  return new ErrorModel(changePasswordFailInfo)
}

async function logout(ctx) {
  delete ctx.session.userInfo
  return new SuccessModel()
}


module.exports = {
  isExist,
  register,
  login,
  changeInfo,
  changePassword,
  logout
}