const fse = require('fs-extra')
const path = require('path')
const { ErrorModel, SuccessModel } = require('../model/ResModel')
const {uploadFileSizeFailInfo } = require('../model/Errinfo')


const MAX_SIZE = 1024 * 1024 * 1024
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles')


fse.pathExists(DIST_FOLDER_PATH).then(exist => {
  if (!exist) {
    fse.ensureDir(DIST_FOLDER_PATH)
  }
})
 


async function saveFile({ name, type, size, filePath }) {
  if(size > MAX_SIZE) {
    await fse.remove(filePath)
    return new ErrorModel(uploadFileSizeFailInfo)
  }

  //移动文件
  const fileName = Date.now() + '.' + name
  const distFilePath = path.join(DIST_FOLDER_PATH, fileName)
  await fse.move(filePath, distFilePath)

  //返回信息
  return new SuccessModel({
    url: fileName
  })
}

module.exports = {
  saveFile
}