'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StickySchema extends Schema {
  up () {
    this.create('stickies', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('title', 80).notNullable()
      table.string('description', 300).notNullable()
      table.date('date').notNullable()
      table.time('hour', { precision: 6 }).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('stickies')
  }
}

module.exports = StickySchema
