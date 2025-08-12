import type { HttpContext } from '@adonisjs/core/http'
import Start from '#models/start'
import vine from '@vinejs/vine'
import app from '@adonisjs/core/services/app'
import fs from 'node:fs/promises'
import CacheService from '#services/cache'

export default class StartsController {

   async show({ response }: HttpContext) {
    const record = await CacheService.getOrSet(
      'start_record',
      60,
      () => Start.firstOrCreate({}, {})
    )
    return response.ok(record)
  }

  async uploadImage({ request, response }: HttpContext) {
    const schema = vine.object({
      banner: vine.file({ size: '20mb', extnames: ['jpg', 'png', 'webp'] })
    })
    try {
      const payload = await vine.validate({ schema, data: request.all() })
      const startContent = await Start.first()
      if (startContent?.banner) {
        await fs.unlink(app.makePath(startContent.banner.substring(1))).catch(() => {})
      }
      await payload.banner.move(app.makePath('uploads/banner'))
      const bannerUrl = `/uploads/banner/${payload.banner.fileName}`
      return response.ok({ bannerUrl })
    } catch (error) {
      return response.badRequest({ message: 'Erro no upload do arquivo.', errors: error.messages })
    }
  }

  async update({ request, response }: HttpContext) {
    const schema = vine.object({
      firstMessage: vine.string().nullable(),
      textButton: vine.string().nullable(),
      linkButton: vine.string().url().nullable(),
      banner: vine.string().nullable(),
    })

    try {
      const payload = await vine.validate({ schema, data: request.all() })
      const record = await Start.firstOrFail()
      record.merge(payload)
      await record.save()
      return response.ok({ message: 'Seção atualizada!', content: record })
    } catch (error) {
      return response.badRequest({ message: 'Erro ao salvar.', errors: error.messages })
    }
  }
}
