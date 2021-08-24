const { Blog, User } = require('../db/model/index')
const { formatUser } = require('./_format')

async function createBlog({userId, content, image}) {
  const res = Blog.create({
    userId,
    content, 
    image 
  })
  return res.dataValues
}

async function getBlogListByUser({userName, pageIndex = 0, pageSize = 10}) {
  const userWhereOpt = {}
  if(userName) {
    userWhereOpt.userName = userName
  }

  const res = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageSize * pageIndex,
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture'],
        where: userWhereOpt
      }
    ]
  })

  let blogList = res.rows.map(row => row.dataValues)
  blogList = blogList.map(item => {
    const user = item.user.dataValues
    item.user = formatUser(user)
    return item
  })
  return {
    count: res.count,
    blogList
  }
}


module.exports = {
  createBlog,
  getBlogListByUser
}