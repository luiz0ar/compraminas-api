import type { HttpContext } from '@adonisjs/core/http'
import AboutPage from '#models/about_page'
import vine from '@vinejs/vine'

export default class AboutPagesController {

  // Apenas busca o registro e o retorna como está
  async show({ response }: HttpContext) {
    const record = await AboutPage.firstOrCreate({}, {})
    return response.ok(record)
  }

  // Recebe e salva o 'content' como um texto simples
  async update({ request, response }: HttpContext) {
    const schema = vine.object({
      content: vine.string().nullable(),
      informations: vine.string().nullable(),
    })

    try {
      const payload = await vine.validate({ schema, data: request.all() })
      const record = await AboutPage.firstOrFail()

      // Converte 'null' em uma string vazia para ser compatível com o Model
      const contentToSave = payload.content ?? ''
      const informationsToSave = payload.informations ?? ''

      record.merge({
        content: contentToSave,
        informations: informationsToSave,
      })
      await record.save()

      return response.ok({ message: 'Página Sobre atualizada com sucesso!' })
    } catch (error) {
      return response.badRequest({ message: 'Erro ao salvar os dados.', errors: error.messages })
    }
  }
}
