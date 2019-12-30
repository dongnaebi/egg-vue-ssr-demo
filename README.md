# egg-vue-ssr-demo
Demo of eggjs plugin [egg-vue-ssr-dev-server](https://github.com/dongnaebi/egg-vue-ssr-dev-server)

`vue-hackernews-2.0 + eggjs = egg-vue-ssr-demo`, it can be simply understood as use eggjs replace the `server.js`

you can also use it as a webpack 4.x upgrade reference

## Why use egg to serve SSR?
1. one project to write front-end and back-end
2. egg-cluster is convenient
3. use egg's plugin and middleware in project

## Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

## Deploy

```bash
$ npm run build
$ npm start
$ npm stop
```

## Features
#### Site info and theme in config.default.js will be inject to index.html
1. in egg context, you can use it by `app.config.site.xxx` and `app.config.theme.color.primary`
2. in vue component, you can use it by `this.$site.xxx` and `this.$tehem.color.primary`
3. in css you can use it by css var, like:`.button{background:var(--color-primary)}`
3. in other client js file, you can use it by `window.site.xxx` and `window.tehem.color.primary`

#### API cache and error handle
cached the data use LRU, see https://github.com/dongnaebi/egg-vue-ssr-demo/blob/master/src/api/index.js#L51

API error tips in html and not cached by CDN(response 202 HTTP status)

#### Fetch API in vuex store's action

#### Elegant async/await error handle

## Dependencies
- eggjs
- vue/vue-router/vuex/vue-server-renderer/vue-meta
- axios
- webpack 4.x
- egg-vue-ssr-dev-server
- eslint standard syle
- ant-design-vue

## Dev server (hot-reload)
[egg-vue-ssr-dev-server](https://github.com/dongnaebi/egg-vue-ssr-dev-server) a plugin of egg let us enjoy hot-reload in local development, it's powered by [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) [webpack-hot-client](https://github.com/webpack-contrib/webpack-hot-client) and [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware)

## Structure
1. vue app dir: `src`
2. webpack config file: `build`
3. html template: `app/index.html`

So we just publish `app`, `config`, `node_modules` and `package.json` to the server

## Bunlde size too large
It's because of ant-design-vue(svg icon and moment.js), you can remove it any way, see https://github.com/vueComponent/ant-design-vue/issues/325

## You can optimistic to use it in production

