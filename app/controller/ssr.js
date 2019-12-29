'use strict'

const fs = require('fs')
const path = require('path')
const { Controller } = require('egg')
const { createBundleRenderer } = require('vue-server-renderer')
const kebabCase = require('kebab-case')

let serverBundle
let template
let clientManifest

class SsrController extends Controller {
  async index () {
    const { ctx, app } = this
    if (!template) template = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8')

    if (app.config.env === 'local') {
      const serverBundleString = await app.memoryFileWorker.requestServerFile('vue-ssr-server-bundle.json')
      const clientBundleString = await app.memoryFileWorker.requestClientFile('vue-ssr-client-manifest.json')
      serverBundle = JSON.parse(serverBundleString)
      clientManifest = JSON.parse(clientBundleString)
    } else {
      if (!serverBundle) serverBundle = path.resolve(__dirname, '../public/dist/vue-ssr-server-bundle.json')
      if (!clientManifest) clientManifest = require(path.resolve(__dirname, '../public/dist/vue-ssr-client-manifest.json'))
    }

    const renderer = createBundleRenderer(serverBundle, {
      runInNewContext: false,
      template,
      clientManifest,
      shouldPreload: (file, type) => {
        return false
      },
      shouldPrefetch: (file, type) => {
        return false
      }
    })

    const generateStyle = theme => {
      let style = ':root{'
      for (const c in theme.color) {
        style += `--color-${kebabCase(c)}:${theme.color[c]};`
      }
      for (const g in theme.gradient) {
        style += `--gradient-${kebabCase(g)}:${theme.gradient[g]};`
      }
      style += '}'
      return style
    }

    // context for SSR
    const ssrContext = {
      host: ctx.host,
      url: ctx.url,
      userAgent: ctx.ua,
      site: app.config.site,
      theme: app.config.theme,
      style: generateStyle(app.config.theme),
      siteString: JSON.stringify(app.config.site),
      themeString: JSON.stringify(app.config.theme)
    }

    let html = ''
    try {
      html = await renderer.renderToString(ssrContext)
    } catch (err) {
      if (err.code === 301 || err.code === 302) {
        ctx.status = err.code
        ctx.redirect(err.url)
      } else if (err.code === 404) {
        ctx.status = 404
        html = '404 Not Found'
      } else {
        ctx.status = 500
        if (app.config.env === 'local') {
          html = err.stack
        } else {
          html = `500 | SSR Render Error`
        }
        console.error(`error during render : ${ctx.url}`)
        console.error(err.stack)
      }
    }
    // status 200 will be cache by cdn, so we set 202 when api error
    if (html.indexOf('errData:') > -1) {
      ctx.status = 202
    }
    ctx.body = html
  }
}

module.exports = SsrController
