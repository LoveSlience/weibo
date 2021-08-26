const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { addFollowerFailInfo, deleteFollowerFailInfo } = require('../model/Errinfo')
const {getUsersByFollower, addFollower, deleteFollower} = require('../services/user-relation')

async function getFuns(userId) {
  const { count, userList } = await getUsersByFollower(userId)

  // 返回
  return new SuccessModel({
    count,
    fansList: userList
  })
}

async function follow(myUserId, curUserId) {
  try {
    await addFollower(myUserId, curUserId)
    return new SuccessModel()
  } catch (error) {
    console.log(error)
    return new ErrorModel(addFollowerFailInfo)
  }
}


async function unFollow(myUserId, curUserId) {
  const res = await deleteFollower(myUserId, curUserId)
  if(res) {
    return new SuccessModel()
  }

  new ErrorModel(deleteFollowerFailInfo)
  
}

module.exports = {
  getFuns,
  follow,
  unFollow
}