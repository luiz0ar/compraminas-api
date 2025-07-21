import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class AboutSection extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare content: string | null

  @column({ columnName: 'button_primary_text' })
  declare buttonPrimaryText: string

  @column({ columnName: 'button_secondary_text' })
  declare buttonSecondaryText: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
