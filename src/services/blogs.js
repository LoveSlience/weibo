const { Blog } = require('../db/model/index')

async function createBlog({userId, content, image}) {
  const res = Blog.create({
    userId,
    content, 
    image 
  })
  return res.dataValues
}


module.exports = {
  createBlog
}