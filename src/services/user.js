const { User } = require('../db/model/index')
const {formatUser} = require('./_format')


async function getUserInfo(userName, password) {
  const whereOpt = {
    userName
  }
  if(password) {
    Object.assign(whereOpt, {password})
  }
  const res = await User.findOne({
    attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
    where: whereOpt
  })
  if(res === null) {
    return res
  }
  return formatUser(res.dataValues)
}

async function createUser({userName, password, gender = 3, nickName}) {
  const res = await User.create({
    userName,
    password,
    gender,
    nickName: nickName ? nickName : userName
  })
  return  res.dataValues
}


module.exports = {
  getUserInfo,
  createUser
}