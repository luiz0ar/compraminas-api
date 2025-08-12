import type { HttpContext } from '@adonisjs/core/http'
import PressArticle from '#models/press_article'
import vine from '@vinejs/vine'
import app from '@adonisjs/core/services/app'
import fs from 'node:fs/promises'
import CacheService from '#services/cache'

export default class PressContentsController {

  async show({ response }: HttpContext) {
    const article = await CacheService.getOrSet(
      'press_article',
      60,
      () => PressArticle.firstOrCreate({}, {})
    )
    return response.ok(article)
  }

  async uploadImage({ request, response }: HttpContext) {
    const schema = vine.object({
      image: vine.file({ size: '20mb', extnames: ['jpg', 'png', 'webp'] })
    })
    try {
      const payload = await vine.validate({ schema, data: request.all() })
      const article = await PressArticle.first()
      if (article?.image) {
        await fs.unlink(app.makePath(article.image.substring(1))).catch(() => { })
      }
      await payload.image.move(app.makePath('uploads/press'))
      const imageUrl = `/uploads/press/${payload.image.fileName}`
      return response.ok({ imageUrl })
    } catch (error) {
      return response.badRequest({ message: 'Erro no upload do arquivo.', errors: error.messages })
    }
  }

   async update({ request, response }: HttpContext) {
    const schema = vine.object({
      title: vine.string(),
      content: vine.string(),
      image: vine.string().nullable(),
      mapsUrl: vine.string().url().nullable(),
    })
    try {
      const payload = await vine.validate({ schema, data: request.all() })
      const article = await PressArticle.firstOrFail()
      article.merge(payload)
      await article.save()
      return response.ok({ message: 'Página de imprensa atualizada!', content: article })
    } catch (error) {
      return response.badRequest({ message: 'Erro ao salvar os dados.', errors: error.messages })
    }
  }
}

