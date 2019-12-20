'use strict'

const fs = require('fs')
const path = require('path')
const { Controller } = require('egg')
const { createBundleRenderer } = require('vue-server-renderer')

let serverBundle
let template
let clientManifest

class SsrController extends Controller {
  async index() {
    const { ctx, app } = this
  	if (!template) template = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8')

		if (this.app.config.env === 'local') {
      const serverBundleString = await this.app.memoryFileWorker.requestServerFile('vue-ssr-server-bundle.json')
			const clientBundleString = await this.app.memoryFileWorker.requestClientFile('vue-ssr-client-manifest.json')
      serverBundle = JSON.parse(serverBundleString)
      clientManifest = JSON.parse(clientBundleString)
		} else {
      if (!serverBundle) serverBundle = path.resolve(__dirname, '../public/dist/vue-ssr-server-bundle.json')
  		if (!clientManifest) clientManifest = require(path.resolve(__dirname, '../public/dist/vue-ssr-client-manifest.json'))
		}

		const renderer = createBundleRenderer(serverBundle, {
			runInNewContext: false,
		  template,
		  clientManifest
		});
    global.config = {
      "id":0,
      "name":"demo",
      "theme":"demo",
      "title":"demo",
      "logo": {
        "favicon": "",
        "shortcut": ""
      },
      "slogan":"",
      "domain":"localhost",
      "seo":{"title":"SEO标题","description":"SEO描述","keywords":"关键词"},
      "thirdParty":{"statisticsKey":"","pcStatisticsKey":"","baiduSiteVerification":"verification","QQClientId":"","tencentMapKey":"","aMapKey":""}
    }
    global.theme = {}

		// context for SSR
	  const ssrContext = {
      host: ctx.host,
      url: ctx.url,
      cookies: ctx.cookies,
      userAgent: ctx.ua,
      config: global.config,
      theme: {},
      style: '',
      tenantString: JSON.stringify(global.config),
      themeString: '{}'
	  };

	  this.ctx.body = await renderer.renderToString(ssrContext);
  }
}

module.exports = SsrController;
 