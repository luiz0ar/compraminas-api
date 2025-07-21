import type { HttpContext } from '@adonisjs/core/http'
import AboutSection from '#models/about_section'
import vine from '@vinejs/vine'

export default class AboutSectionsController {
   async show({ response }: HttpContext) {
    const record = await AboutSection.firstOrCreate({}, {})
    let paragraphs: string[] = []
    try {
      paragraphs = JSON.parse(record.content || '[]')
    } catch (error) {
      console.error('Erro ao fazer parse do conteúdo da Seção Sobre:', error)
    }
    return response.ok({
      paragraphs: paragraphs,
      buttonPrimaryText: record.buttonPrimaryText,
      buttonSecondaryText: record.buttonSecondaryText,
    })
  }

   async update({ request, response }: HttpContext) {
    const schema = vine.object({
      paragraphs: vine.array(vine.string()),
      buttonPrimaryText: vine.string(),
      buttonSecondaryText: vine.string(),
    })
    const payload = await vine.validate({ schema, data: request.all() })
    const content = JSON.stringify(payload.paragraphs)
    const record = await AboutSection.firstOrFail()
    record.merge({
      content: content,
      buttonPrimaryText: payload.buttonPrimaryText,
      buttonSecondaryText: payload.buttonSecondaryText,
    })
    await record.save()
    return response.ok({ message: 'Seção atualizada com sucesso!' })
  }
}
