import { exec } from 'child_process'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 获取项目根目录路径
const rootDirectory = path.resolve(__dirname, '../')

const packagesDir = path.join(rootDirectory, 'packages')

fs.readdir(packagesDir, (err, files) => {
  if (err) {
    console.error('Error reading packages directory:', err)
    return
  }

  files.forEach((file) => {
    const packagePath = path.join(packagesDir, file)
    fs.stat(packagePath, (err, stats) => {
      if (err) {
        console.error(`Error stating file ${file}:`, err)
        return
      }

      if (stats.isDirectory()) {
        const packageJsonPath = path.join(packagePath, 'package.json')
        fs.readFile(packageJsonPath, 'utf8', (err, data) => {
          if (err) {
            console.error(`读取package.json错误: ${file}:`, err)
            return
          }

          const packageJson = JSON.parse(data)
          const versionParts = packageJson.version.split('.')
          // 版本加1
          versionParts[2] = parseInt(versionParts[2]) + 1
          packageJson.version = versionParts.join('.')

          fs.writeFile(
            packageJsonPath,
            JSON.stringify(packageJson, null, 2),
            (err) => {
              if (err) {
                console.error(`写入错误: ${file}:`, err)
                return
              }

              console.log(`发布目录包: ${file}`)
              const publishCommand = `cd ${packagePath} && npm publish`
              exec(publishCommand, (error, stdout, stderr) => {
                if (error) {
                  console.error(`发布错误: ${file}:`, error)
                  return
                }
                console.log(`包： ${file} 发布成功.`)
              })
            }
          )
        })
      }
    })
  })
})
