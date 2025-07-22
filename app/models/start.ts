import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Start extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'first_message' })
  declare firstMessage: string | null

  @column({ columnName: 'link_button' })
  declare linkButton: string | null

  @column({ columnName: 'text_button' })
  declare textButton: string | null

  @column()
  declare banner: string | null

  @column.dateTime({ columnName: 'created_at', autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ columnName: 'updated_at', autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
