'use strict'

class MemoryFileWorker {
	constructor(app) {
		this.app = app
		this.filePromise = {}

		this.app.messenger.on('file-found', ({ filePath, fileData}) => {
			this.filePromise[filePath].resolve(fileData)
		})
		this.app.messenger.on('file-not-found', ({ filePath }) => {
			this.filePromise[filePath].reject(new Error(`${filePath} not exists in webpack memory`))
		})
	}
	requestClientFile(filePath) {
		this.app.messenger.sendToAgent('request-client-file', filePath)
		return new Promise((resolve, reject) => {
			this.filePromise[filePath] = { resolve, reject }
		})
	}
	requestServerFile(filePath) {
		this.app.messenger.sendToAgent('request-server-file', filePath)
		return new Promise((resolve, reject) => {
			this.filePromise[filePath] = { resolve, reject }
		})
	}
}

module.exports = MemoryFileWorker
