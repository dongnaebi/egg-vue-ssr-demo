const mime = require('mime')
const isTextPath = require('is-text-path')

module.exports = (options, app) => {
  return async (ctx, next) => {
    await next()
    const filePath = ctx.request.path
    const inPublicPath = filePath.indexOf(app.config.vueSsrDevServer.publicPath) > -1
    if (inPublicPath && ctx.status === 404 && app.config.env === 'local') {
      const pathArr = filePath.split('/')
      // resolve /public path problem in egg
      const fileName = pathArr[pathArr.length - 1]
      let fileData
      try {
        fileData = await app.memoryFileWorker.requestClientFile(fileName)
        ctx.response.type = mime.getType(fileName)
        if (!isTextPath(fileName)) {
          fileData = Buffer.from(fileData)
        }
      } catch(err) {
        fileData = err
      }
      ctx.body = fileData
    }
  }
}
