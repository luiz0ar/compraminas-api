import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Start extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'first_message' })
  declare firstMessage: string

  @column({ columnName: 'link_button' })
  declare linkButton: string

  @column({ columnName: 'text_button' })
  declare textButton: string

  @column.dateTime({ columnName: 'created_at', autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ columnName: 'updated_at', autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
