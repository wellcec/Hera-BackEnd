'use strict'

const Sticky = use('App/Models/Sticky')
const Database = use('Database')

class StickyController {
  async create({ request, auth }) {
    const data = request.only(['title', 'description', 'date', 'hour'])

    if (!data.title || !data.description) {
      return 'Título ou descrição devem ser informadas.'
    }

    const sticky = await Sticky.create({ ...data, user_id: auth.user.id })
    return sticky
  }

  async getAll({ auth }) {
    return await Database
      .from('stickies')
      .where({ user_id: auth.user.id })
      .orderBy('date', 'asc')
      .orderBy('hour', 'asc')
  }
}

module.exports = StickyController
