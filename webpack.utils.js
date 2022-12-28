const path = require('path')
const { readdirSync, statSync } = require('fs')

const recursiveReadDirSync = (dirPath) => {
  let list = []
  const files = readdirSync(dirPath)
  files.forEach(file => {
    const stats = statSync(path.join(dirPath, file))
    if (stats.isDirectory()) {
      list = list.concat(recursiveReadDirSync(path.join(dirPath, file)))
    } else {
      list.push(path.join(dirPath, file))
    }
  })
  return list
}

module.exports = {
  filesToCompileSync(dirPath, expression) {
    const entries = {}
    recursiveReadDirSync(dirPath)
      .filter(file => expression.test(file))
      .forEach(file => {
        const fileName = file.replace(expression, '').replace(`${dirPath}/`, '')
        entries[fileName] = `./${file}`
      })
    return entries
  }
}
