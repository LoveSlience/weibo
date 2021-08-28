const {DEFAULT_IMG, REG_FOR_AT_WHO} = require('../conf/const')

function _formatUserPicture(obj) {
  if(obj.picture === null) {
    obj.picture = DEFAULT_IMG
  }
  return obj
}

function _formatContent(obj) {
  obj.contentFormat = obj.content

  // 格式化 @
  // from '哈喽 @张三 - zhangsan 你好'
  // to '哈喽 <a href="/profile/zhangsan">张三</a> 你好'
  obj.contentFormat = obj.contentFormat.replace(
    REG_FOR_AT_WHO,
    (matchStr, nickName, userName) => {
      return `<a href="/profile/${userName}">@${nickName}</a>`
    }
  )

  return obj
}

function formatBlog(list) {
  if (list == null) {
    return list
  }

  if (list instanceof Array) {
    // 数组
    return list.map(_formatContent)
  }
  // 对象
  let result = list
  result = _formatContent(result)
  return result
}

function formatUser(list) {
  if(!list) {
    return list
  }
  if(Array.isArray(list)) {
    return list.map(_formatUserPicture)
  }
  return _formatUserPicture(list)
  
}

module.exports = {
  formatUser,
  formatBlog
}