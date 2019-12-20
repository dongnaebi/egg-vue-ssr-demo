const { Service } = require('egg')

class ADService extends Service {
  async save (records) {
    const { ctx } = this
    const add = records.filter(r => r.id === 0 || !r.id)
    const update = records.filter(r => r.id !== 0)
    try {
      let addResult = null
      await ctx.model.transaction(async t => {
        addResult = await ctx.model.Ad.bulkCreate(add)
        let action = []
        update.forEach(item => {
          action.push(ctx.model.Ad.update(item, { where: { id: item.id } }, { transaction: t }))
        })
        await Promise.all(action)
      })
      console.log(JSON.parse(JSON.stringify(addResult)))
      addResult = JSON.parse(JSON.stringify(addResult))
      let result = [...update, ...addResult]
      return [null, result]
    } catch (e) {
      return [e, null]
    }
  }
  async destroy (id) {
    const { ctx } = this
    try {
      const result = await ctx.model.Ad.destroy({ where: { id } })
      return [null, result]
    } catch (e) {
      return [e, null]
    }
  }
  async findAll (params) {
    const { ctx, app } = this
    const page = params.page ? Number(params.page) : 1
    const count = params.count ? Number(params.count) : 10
    console.error(ctx.model.Ad)
    let where = {}
    if (params.name) {
      where.name = { [app.Sequelize.Op.like]: `%${params.name}` }
    }
    try {
      const result = await ctx.model.Ad.findAndCountAll({
        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
        where,
        limit: count,
        offset: count * (page - 1)
      })
      let res = {
        currentPage: page,
        totalPage: Math.ceil(result.count / count),
        totalCount: result.count,
        list: result.rows
      }
      return [null, res]
    } catch (e) {
      return [e, null]
    }
  }
  async findById (id) {
    const { ctx } = this
    try {
      const result = await ctx.model.Ad.findByPk(id)
      return [null, result]
    } catch (e) {
      return [e, null]
    }
  }
}

module.exports = ADService
