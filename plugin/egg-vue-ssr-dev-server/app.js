const MemoryFileWorker = require('./lib/memory-file-worker')

module.exports = app => {
	const index = app.config.coreMiddleware.length
	app.config.coreMiddleware.splice(index, 0, 'memoryFile')
	app.messenger.on('egg-ready', () => {
		if (app.config.env === 'local') {
			app.memoryFileWorker = new MemoryFileWorker(app)
		}
	})
}