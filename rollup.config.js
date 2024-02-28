import { readdirSync, readFileSync } from 'fs'
import path from 'path'
import url from 'url'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import vue from 'rollup-plugin-vue'
import terser from '@rollup/plugin-terser'
import copy from 'rollup-plugin-copy'
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'
import postcssModules from 'postcss-modules'
// import sass from 'sass'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

const extensions = ['.js', '.jsx', '.ts', '.tsx', '.vue']
const packagesDir = path.resolve(__dirname, 'packages')

// 获取packages目录下的所有目录名称
function getPackageNames() {
  const packageNames = readdirSync(packagesDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)

  return packageNames
}

// 辅助函数：生成 Rollup 输出配置
function generateOutputConfig(packageName, format, packageJson) {
  // 输出目录路径
  const outputDir = path.resolve(packagesDir, packageName, 'dist')
  // 获取 package.json 中的名称字段
  const packagePrefix = packageJson.name || packageName

  return {
    inlineDynamicImports: true,
    extend: true,
    file: `${outputDir}/index.${format}.js`,
    format,
    name: packagePrefix,
    sourcemap: false,
    exports: 'named',
    globals: {
      dayjs: 'dayjs',
      lodash: '_',
      'ant-design-vue': 'antd',
      vue: 'Vue'
    }
  }
}

// 辅助函数：生成 Rollup 配置
function generateRollupConfig(packageName) {
  const packageJsonPath = path.resolve(packagesDir, packageName, 'package.json')
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'))

  const input = path.resolve(packagesDir, packageName, 'src/index.js')

  return {
    treeshake: true,
    input,
    output: [
      generateOutputConfig(packageName, 'es', packageJson),
      generateOutputConfig(packageName, 'umd', packageJson),
      generateOutputConfig(packageName, 'iife', packageJson)
    ],
    plugins: [
      resolve({ extensions }),
      commonjs(),
      babel({
        extensions,
        exclude: 'node_modules/**',
        babelHelpers: 'bundled',
        presets: ['@babel/preset-env'],
        plugins: ['@vue/babel-plugin-jsx']
      }),
      vue({ target: 'browser' }),
      postcss({
        // 修改 extract 选项，将 CSS 提取到单独的文件
        extract: path.resolve(packagesDir, packageName, 'dist/index.css'),
        // extract: path.resolve(packagesDir, packageName, 'dist/index.css'),
        plugins: [autoprefixer()],
        // 压缩
        minimize: true,
        // 加载器
        use: {
          sass: {
            // 类似别名，includePaths 可以为 @import 语句提供省略别名的功能
            // 如 @import 'index' 文件会直接索引到styles/includes/index.scss
            includePaths: [path.resolve(__dirname, './styles/includes')]
          }
        }
      }),
      terser()
    ],
    external: ['vue', 'ant-design-vue', 'lodash', 'dayjs']
  }
}

// function generateEsModule(packageName) {
//   return {
//     input: path.resolve(packagesDir, packageName, 'src/index.js'),
//     output: {
//       dir: path.resolve(packagesDir, packageName, 'dist/es'),
//       format: 'es',
//       // entryFileNames: '[name].js',
//       preserveModules: true // 允许在打包过程中保留各个 ES 模块的独立性
//     },
//     plugins: [
//       // resolve({ extensions }),
//       // commonjs(),
//       babel({
//         extensions,
//         exclude: 'node_modules/**',
//         babelHelpers: 'bundled',
//         presets: ['@babel/preset-env'],
//         plugins: ['@vue/babel-plugin-jsx']
//       }),
//       vue(),
//       postcss({
//         // 修改 extract 选项，将 CSS 提取到单独的文件
//         extract: true,
//         modules: true, // 启用 CSS 模块化
//         // extract: path.resolve(packagesDir, packageName, 'dist/index.css'),
//         plugins: [
//           autoprefixer(),
//           postcssModules({
//             // 配置 postcss-modules
//             generateScopedName: '[name]__[local]___[hash:base64:5]',
//           })
//         ],
//         // modules: (a,b) => {
//         //   console.log(a, b)
//         // },
//         // 加载器
//         use: {
//           sass: {
//             // 类似别名，includePaths 可以为 @import 语句提供省略别名的功能
//             // 如 @import 'index' 文件会直接索引到styles/includes/index.scss
//             includePaths: [path.resolve(__dirname, './styles/includes')],
//             // 指定Sass编译器为node-sass
//             // implementation: sass
//           }
//         },

//         // extensions: ['.scss'],
//       })
//     ],
//     external: ['vue', 'ant-design-vue', 'lodash', 'dayjs']
//   }
// }
// 构建多个包的 Rollup 配置
export default [
  ...getPackageNames().map((packageName) => {
    return generateRollupConfig(packageName)
  })
]
