import type { HttpContext } from '@adonisjs/core/http'
import Setting from '#models/contact_form'
import vine from '@vinejs/vine'
import db from '@adonisjs/lucid/services/db'

export default class ContactSettings {
  async index({ response }: HttpContext) {
    const settingsRaw = await Setting.all()
    const settings = settingsRaw.reduce((acc, setting) => {
      acc[setting.key] = setting.value
      return acc
    }, {} as Record<string, string | null>)
    return response.ok(settings)
  }

  async update({ request, response }: HttpContext) {
    const schema = vine.array(vine.object({
      key: vine.string(),
      value: vine.string().nullable()
    }))
    const payload = await vine.validate({ schema, data: request.all() })

    await db.transaction(async (trx) => {
      for (const setting of payload) {
        await Setting.query({ client: trx })
          .where('key', setting.key)
          .update({ value: setting.value })
      }
    })
    return response.ok({ message: 'Settings saved succesfully!' })
  }
}
