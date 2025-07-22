import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'starts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.text('first_message').notNullable()
      table.string('link_button').notNullable()
      table.string('text_button').notNullable()
      table.string('banner').notNullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
