const { User, UserRelation } = require('../db/model/index')
const { formatUser } = require('./_format')
const Sequelize = require('sequelize')



async function getUsersByFollower(followerId) {
  const result = await User.findAndCountAll({
    attributes: ['id', 'userName', 'nickName', 'picture'],
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: UserRelation,
        where: {
          followerId,
          userId: {
            [Sequelize.Op.ne]: followerId
          }
        }
      }
    ]
  })
  // result.count 总数
  // result.rows 查询结果，数组

  // 格式化
  let userList = result.rows.map(row => row.dataValues)
  userList = formatUser(userList)

  return {
    count: result.count,
    userList
  }
}



async function addFollower(userId, followerId) {
  const res = await UserRelation.create({
    userId,
    followerId
  })
  return res.dataValues
}

async function deleteFollower(userId, followerId) {
  const res = await UserRelation.destroy({
    where: {
      userId,
      followerId
    }
  })
  return res.dataValues
}

module.exports = {
  getUsersByFollower,
  addFollower,
  deleteFollower
}
