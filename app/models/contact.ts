import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Contact extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare location: string | null

  @column()
  declare locationUrl: string | null

  @column()
  declare fixNumber: string | null

  @column()
  declare phoneNumber: string | null

  @column()
  declare email: string | null

  @column()
  declare unities: any | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
