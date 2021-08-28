const xss = require('xss')
const { createBlog, getFollowersBlogList } = require('../services/blogs')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { PAGE_SIZE } = require('../conf/const')
const { 
  createBlogFailInfo
} = require('../model/Errinfo')


async function create({userId, content, image}) {
  try {
    const blog = await createBlog({userId, content: xss(content), image})
    return new SuccessModel(blog)
  } catch (error) {
    return new ErrorModel(createBlogFailInfo)   
  }
}

async function getHomeBlogList(userId, pageIndex = 0) {
  const res = await getFollowersBlogList({userId, pageIndex, pageSize: PAGE_SIZE})
  const { count, blogList } = res
  return  new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count
  })
}


module.exports = {
  create,
  getHomeBlogList
}