const { User } = require('../db/model/index')
const {formatUser} = require('./_format')
const { addFollower } = require('./user-relation')


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
  const data = res.dataValues
  
  addFollower(data.id, data.id)

  return  data
}

async function updateUser({ newPassword, newNickName, newPicture, newCity}, {userName, password}) {
  const updateDate = {}
  if(newPassword) {
    updateDate.password = newPassword
  }
  if(newNickName) {
    updateDate.nickName = newNickName
  }
  if(newPicture) {
    updateDate.picture = newPicture
  }
  if(newCity) {
    updateDate.newCity = newCity
  }
  const whereData = {
    userName
  }
  if(password) {
    whereData.password = password
  }
  const res = await User.update(updateDate, {
    where: whereData
  })
  return  res[0] > 0
}


module.exports = {
  getUserInfo,
  createUser,
  updateUser
}