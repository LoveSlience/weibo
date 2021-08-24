const { createBlog } = require('../services/blogs')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { 
  createBlogFailInfo
} = require('../model/Errinfo')


async function create({userId, content, image}) {
  try {
    const blog = await createBlog({userId, content, image})
    return new SuccessModel(blog)
  } catch (error) {
    return new ErrorModel(createBlogFailInfo)   
  }
}


module.exports = {
  create
}