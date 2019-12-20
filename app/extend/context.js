const USER = Symbol('Context#user')

module.exports = {
  get user () {
    // this 就是 ctx 对象，在其中可以调用 ctx 上的其他方法，或访问属性
    if (!this[USER]) {
      // 例如，从 header 中获取，实际情况肯定更复杂
      let host = this.get('Host')
      let authorization = this.get('authorization')
      let UUID = this.get('UUID')
      let ua = this.get('User-Agent')
      this[USER] = {
        id: 0,
        host,
        authorization,
        UUID,
        ua,
        ip: this.ip
      }
    }
    return this[USER]
  }
}
