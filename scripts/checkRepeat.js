const fs = require('fs')
const path = require('path')

const args = process.argv.slice(2)
const filePath = args[0].split('locales')

const lang = filePath[1].split(path.sep)[1]
const fileName = filePath[1].split(path.sep)[2]
var repeatArr = []
const files = fs.readdirSync(`locales/${lang}`)
const allKeyArr = []
const thisFileObj = require(`../locales/${lang}/${fileName}`)

files.forEach(file => {
  if (file === 'index.js' || file === fileName) {
    return
  }
  const fileObj = require(`../locales/${lang}/${file}`)
  Object.keys(fileObj).forEach(key => {
    allKeyArr.push(key)
  })
})

Object.keys(thisFileObj).forEach(key => {
  if (allKeyArr.indexOf(key) > -1) {
    repeatArr.push(key)
  }
})
  
if(repeatArr.length>0) {
  let errMessage  = `/locales/${lang}/${fileName}文件中存在以下重复UI词条：`+repeatArr
  throw errMessage
}
