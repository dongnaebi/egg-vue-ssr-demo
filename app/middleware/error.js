module.exports = (options, app) => {
  return async function (ctx, next) {
    try {
      await next()
    } catch (err) {
      // ctx.response.error(err)
    }
  }
}
