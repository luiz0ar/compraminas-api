import type { HttpContext } from '@adonisjs/core/http'
import AboutPage from '#models/about_page'
import vine from '@vinejs/vine'
import app from '@adonisjs/core/services/app'
import fs from 'node:fs/promises'

export default class AboutPagesController {

  async show({ response }: HttpContext) {
    const record = await AboutPage.firstOrCreate({}, {})
    return response.ok(record)
  }

  async uploadImage({ request, response }: HttpContext) {
    const schema = vine.object({
      image: vine.file({ size: '20mb', extnames: ['jpg', 'jpeg', 'png', 'webp'] })
    })
    try {
      const payload = await vine.validate({ schema, data: request.all() })
      const aboutPage = await AboutPage.first()
      if (aboutPage?.image) {
        await fs.unlink(app.makePath(aboutPage.image.substring(1))).catch(() => {})
      }
      await payload.image.move(app.makePath('uploads/about'))
      const imageUrl = `/uploads/about/${payload.image.fileName}`
      return response.ok({ imageUrl })
    } catch (error) {
      return response.badRequest({ message: 'Erro no upload do arquivo.', errors: error.messages })
    }
  }

  async update({ request, response }: HttpContext) {
    // Validação correta que espera os campos do frontend
    const schema = vine.object({
      content: vine.string().nullable(),
      informations: vine.string().nullable(),
      image: vine.string().nullable(),
    })

    try {
      const payload = await vine.validate({ schema, data: request.all() })
      const record = await AboutPage.firstOrFail()

      record.merge(payload)
      await record.save()

      return response.ok({ message: 'Informações atualizadas com sucesso', content: record })
    } catch (error) {
      return response.badRequest({ message: 'Erro ao salvar os dados.', errors: error.messages })
    }
  }
}
