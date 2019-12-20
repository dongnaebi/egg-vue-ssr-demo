module.exports = (options, app) => {
  return async function (ctx, next) {
    if (ctx.user.authorization) {
      try {
        let decoded = app.jwt.verify(ctx.user.authorization, app.config.jwt.secret)
        if (decoded) {
          ctx.user.id = decoded.userId
          await next(ctx)
        } else {
          ctx.response.needLogin()
        }
      } catch (e) {
        ctx.response.needLogin()
      }
    } else {
      ctx.response.needLogin()
    }
  }
}
