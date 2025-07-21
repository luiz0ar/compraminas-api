import type { HttpContext } from '@adonisjs/core/http'
import AboutSection from '#models/about_section'
import vine from '@vinejs/vine'

export default class AboutSectionsController {

  async show({ response }: HttpContext) {
    const record = await AboutSection.firstOrCreate({}, {})
    return response.ok(record)
  }

  async update({ request, response }: HttpContext) {
    const schema = vine.object({
      content: vine.string().nullable(),
      buttonPrimaryText: vine.string(),
      buttonSecondaryText: vine.string(),
    })

    try {
      const payload = await vine.validate({ schema, data: request.all() })
      const record = await AboutSection.firstOrFail()
      const contentToSave = payload.content ?? ''
      record.merge({
        buttonPrimaryText: payload.buttonPrimaryText,
        buttonSecondaryText: payload.buttonSecondaryText,
        content: contentToSave,
      })
      await record.save()
      return response.ok({ message: 'Seção atualizada com sucesso!' })
    } catch (error) {
      return response.badRequest({ message: 'Erro ao salvar os dados.', errors: error.messages })
    }
  }
}
