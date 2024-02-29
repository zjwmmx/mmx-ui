
// import fs from 'fs'
// import path from 'path'
// import { fileURLToPath } from 'url'

// const __dirname = path.dirname(fileURLToPath(import.meta.url))

// // 获取项目根目录路径
// const rootDirectory = path.resolve(__dirname, '../')
// const docsPath = path.dirname(rootDirectory) // docs 目录路径
// console.log('__dirname', docsPath)

// function generateSidebarConfig(docsPath, link = '', depth = 0) {
//   const sidebarConfig = depth === 0 ? {} : { items: [] }
//   const files = fs
//     .readdirSync(docsPath)
//     .filter((file) => !file.startsWith('.') && file !== 'public')

//   files.forEach((filename) => {
//     const filepath = path.join(docsPath, filename)
//     const isDir = isDirectory(filepath)
//     if (!isDir && depth === 0) {
//       return
//     }
//     if (isDirectory(filepath)) {
//       handleDirectory(filepath, filename, depth, sidebarConfig, link)
//     } else {
//       handleFile(filepath, filename, depth, sidebarConfig, link)
//     }
//   })

//   return sidebarConfig
// }

// function isDirectory(filepath) {
//   return fs.statSync(filepath).isDirectory()
// }

// function handleDirectory(filepath, filename, depth, sidebarConfig, link) {
//   const newLink = depth === 0 ? `/${filename}/` : `${link}${filename}/`
//   const config = generateSidebarConfig(filepath, newLink, depth + 1)

//   if (depth === 0) {
//     sidebarConfig[newLink] = [config]
//   } else {
//     sidebarConfig.items.push(config)
//   }
// }

// function handleFile(filepath, filename, depth, sidebarConfig, link) {
//   if (filename === 'index.md' && depth > 0) {
//     sidebarConfig.text = path.basename(path.dirname(filepath))
//     sidebarConfig.link = link
//   } else if (path.extname(filename) === '.md' && filename !== 'index.md') {
//     const basename = path.basename(filename, '.md')
//     sidebarConfig.items.push({
//       text: basename,
//       link: `${link}${basename}`
//     })
//   }
// }

// export const sidebar = generateSidebarConfig(docsPath)

export const sidebar = {
  doc: [
    {
      text: '2024',
      items: [
        { text: 'github部署静态站点', link: '/doc/2024/1' }
      ]
    }
  ],
  components: [
    {
      text: '指导',
      items: [
        { text: '安装', link: '/components/guide' },
        { text: '时间段选择器', link: '/components/time-schedule' }
      ]
    }
  ]
}
