const {DEFAULT_IMG} = require('../conf/const')

function _formatUserPicture(obj) {
  if(obj.picture === null) {
    obj.picture = DEFAULT_IMG
  }
  return obj
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
  formatUser
}