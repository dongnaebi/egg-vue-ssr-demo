const MemoryFileAgent = require('./lib/memory-file-agent')

module.exports = agent => {
	agent.messenger.on('egg-ready', () => {
		if (agent.config.env === 'local') {
			agent.memoryFileAgent = new MemoryFileAgent(agent)
		}
	})
}