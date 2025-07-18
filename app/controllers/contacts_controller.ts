import type { HttpContext } from '@adonisjs/core/http'
import Contact from '#models/contact'
import vine from '@vinejs/vine'

export default class ContactsController {
  async show({ response }: HttpContext) {
    const contactInfo = await Contact.firstOrCreate({}, {})
    return response.ok(contactInfo)
  }

  async update({ request, response }: HttpContext) {
    const schema = vine.object({
      location: vine.string().nullable(),
      locationUrl: vine.string().url().nullable(),
      fixNumber: vine.string().nullable(),
      phoneNumber: vine.string().nullable(),
      email: vine.string().nullable(),
    })
    try {
      const payload = await vine.validate({ schema, data: request.all() })
      const contactInfo = await Contact.firstOrFail()
      contactInfo.merge(payload)
      await contactInfo.save()
      return response.ok({ message: 'Informações de contato atualizadas!', content: contactInfo })
    } catch (error) {
      return response.badRequest({ message: 'Erro ao salvar os dados.', errors: error.messages })
    }
  }
}
