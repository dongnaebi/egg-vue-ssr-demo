export default {
  namespaced: true,
  state () {
    return {
      list: []
    }
  },
  getters: {},
  mutations: {
    setList (state, data) {
      state.list = data
    }
  },
  actions: {
    async getList ({ commit }, categoryId) {
      const { data = [] } = await this.fetch('/api/getList', { categoryId })
      commit('setList', data)
    }
  }
}
