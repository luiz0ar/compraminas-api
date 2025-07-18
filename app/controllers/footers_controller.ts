import type { HttpContext } from '@adonisjs/core/http'
import Footer from '#models/footer'
import vine from '@vinejs/vine'

export default class FootersController {
  async index({ response }: HttpContext) {
    const settings = await Footer.all()
    const formattedSettings = settings.reduce((acc, setting) => {
      acc[setting.key] = setting.value
      return acc
    }, {} as Record<string, string | null>)
    return response.ok(formattedSettings)
  }

  async show({ params, response }: HttpContext) {
    const key = params.key
    const setting = await Footer.findBy('key', key)
    if (!setting) {
      return response.notFound({ message: `Configuration with key '${key}' not found.` })
    }
    return response.ok(setting)
  }

  async update({ request, response }: HttpContext) {
  const settingsSchema = vine.array(
    vine.object({
      key: vine.string(),
      value: vine.string().nullable(),
    })
  )
  try {
    const payload = await vine.validate({
      schema: settingsSchema,
      data: request.body(),
    });

    for (const setting of payload) {
      await Footer.query()
        .where('key', setting.key)
        .update({ value: setting.value });
    }

    return response.ok({ message: 'Footer settings saved successfully!' });
  } catch (error) {
    return response.badRequest({
      message: 'Invalid data or error saving.',
      errors: error.messages,
    });
  }
}


}
