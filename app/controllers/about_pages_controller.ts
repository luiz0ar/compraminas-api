import type { HttpContext } from '@adonisjs/core/http'
import AboutPage from '#models/about_page'

export default class AboutPagesController {
   async show({ response }: HttpContext) {
    const record = await AboutPage.first()
    if (!record) {
      return response.ok({
        paragraphs: [],
        informations: '',
      })
    }
    let paragraphs: string[] = []
    try {
      paragraphs = JSON.parse(record.content)
    } catch (error) {
      console.error('Erro ao fazer parse do conteúdo da página Sobre:', error)
    }
    return response.ok({
      paragraphs: paragraphs,
      informations: record.informations,
    })
  }

    async update({ request, response }: HttpContext) {
    const { paragraphs, informations } = request.only(['paragraphs', 'informations'])
    if (!Array.isArray(paragraphs)) {
      return response.badRequest({ error: 'Parágrafos devem estar em formato de array.' })
    }
    const content = JSON.stringify(paragraphs)
    const record = await AboutPage.first()
    if (record) {
      record.merge({ content, informations })
      await record.save()
    } else {
      await AboutPage.create({ content, informations })
    }
    return response.ok({
      message: 'Informações atualizadas com sucesso',
    })
  }
}
