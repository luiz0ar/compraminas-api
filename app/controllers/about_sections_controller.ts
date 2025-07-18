import type { HttpContext } from '@adonisjs/core/http'
import AboutSection from '#models/about_section'

export default class AboutSectionsController {
  async show({ response }: HttpContext) {
    const registro = await AboutSection.query().first()
    return response.ok(registro)
  }

  async update({ request, response }: HttpContext) {
    const { content, button_primary_text, button_secondary_text } = request.only([
      'content',
      'button_primary_text',
      'button_secondary_text',
    ])

    let registro = await AboutSection.query().first()
    if (!registro) {
      registro = await AboutSection.create({ content, buttonPrimaryText: button_primary_text, buttonSecondaryText: button_secondary_text })
      return response.created(registro)
    }

    registro.merge({
      content,
      buttonPrimaryText: button_primary_text,
      buttonSecondaryText: button_secondary_text,
    })

    await registro.save()
    return response.ok({ message: 'Information updated successfully.', data: registro })
  }
}
