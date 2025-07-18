import type { HttpContext } from '@adonisjs/core/http'
import AboutPage from '#models/about_page'

export default class AboutPagesController {
  async show({ response }: HttpContext) {
    const registro = await AboutPage.query().first()
    if (!registro) {
      return response.ok({
        paragraphs: [],
        informations: '',
      })
    }
    let paragraphs: string[] = []
    try {
      paragraphs = [registro.content]
    } catch (error) {
      console.log(paragraphs)
      console.error('Error converting content from the About page.', error)
    }
    return response.ok({
      paragraphs,
      informations: registro.informations,
    })
  }

  async update({ request, response }: HttpContext) {
    const { paragraphs, informations } = request.only(['paragraphs', 'informations'])
    if (!Array.isArray(paragraphs)) {
      return response.badRequest({ error: 'Paragraphs must be in array format.' })
    }
    const content = JSON.stringify(paragraphs)
    let registro = await AboutPage.query().first()
    if (!registro) {
      registro = await AboutPage.create({ content, informations })
      return response.created({
        message: 'Content created successfully.',
        data: { paragraphs, informations },
      })
    }
    registro.merge({ content, informations })
    await registro.save()
    return response.ok({
      message: 'Information updated successfully.',
      data: { paragraphs, informations },
    })
  }
}
