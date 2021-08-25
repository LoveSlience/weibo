const { getBlogListByUser } = require('../services/blogs')
const { PAGE_SIZE } = require('../conf/const')
const { SuccessModel } = require('../model/ResModel')


async function getProfileBlogList(userName, pageIndex = 0) {
  const res = await getBlogListByUser({userName, pageIndex, pageSize: PAGE_SIZE})
  const blogList = res.blogList
  return  new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count: res.count
  })
}


module.exports = {
  getProfileBlogList
}