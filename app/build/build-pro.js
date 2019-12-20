/**
 * Created by luoyang on 2019-10-14
 */
const { execSync } = require('child_process')
var env = Object.create(process.env)
env.NODE_ENV = 'production'
const shell = process.platform === 'win32'
// 执行检查
execSync('npm run lint', {
  stdio: 'inherit',
  shell
})
// 删除dist
execSync('rimraf public/dist', {
  stdio: 'inherit',
  shell
})

// 构建client
execSync('webpack --config build/webpack.client.config.js --progress --hide-modules', {
  stdio: 'inherit',
  shell,
  env
})
// 构建server
execSync('webpack --config build/webpack.server.config.js --progress --hide-modules', {
  stdio: 'inherit',
  shell,
  env
})
