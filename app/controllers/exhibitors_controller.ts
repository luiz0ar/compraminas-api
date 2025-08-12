import type { HttpContext } from '@adonisjs/core/http'
import Exhibitor from '#models/exhibitor'
import vine from '@vinejs/vine'
import app from '@adonisjs/core/services/app'
import fs from 'node:fs/promises'
import CacheService from '#services/cache'

export default class ExhibitorsController {
   async index({ response }: HttpContext) {
    const exhibitors = await CacheService.getOrSet(
      'exhibitors',
      60,
      () => Exhibitor.query().where('visible', true).orderBy('name', 'asc')
    )
    return response.ok(exhibitors)
  }

    async indexAdmin({ response }: HttpContext) {
    const exhibitors = await CacheService.getOrSet(
      'exhibitors_admin',
      60,
      () => Exhibitor.query().orderBy('name', 'asc')
    )
    return response.ok(exhibitors)
  }

  async show({ params, response }: HttpContext) {
    const exhibitor = await CacheService.getOrSet(
      `exhibitor_${params.id}`,
      60,
      () => Exhibitor.findOrFail(params.id)
    )
    return response.ok(exhibitor)
  }

  async upload({ request, response }: HttpContext) {
    const schema = vine.object({
      logo: vine.file({
        size: '20mb',
        extnames: ['jpg', 'png', 'jpeg', 'webp'],
      }),
    })
    try {
      const payload = await vine.validate({ schema, data: request.all() })
      await payload.logo.move(app.makePath('uploads/exhibitors'))
      const logoUrl = `/uploads/exhibitors/${payload.logo.fileName}`

      return response.created({ logoUrl })
    } catch (error) {
      return response.badRequest({ errors: error.messages })
    }
  }

    async toggleVisibility({ params, response }: HttpContext) {
    const exhibitor = await Exhibitor.findOrFail(params.id)
    exhibitor.visible = !exhibitor.visible
    await exhibitor.save()
    return response.ok(exhibitor)
  }

  async store({ request, response }: HttpContext) {
    const schema = vine.object({
      name: vine.string().trim(),
      contact: vine.string().optional(),
      websiteUrl: vine.string().url().optional(),
      logoUrl: vine.string().optional(),
      visible: vine.boolean().optional(),
    })
    const payload = await vine.validate({ schema, data: request.all() })
    const exhibitor = await Exhibitor.create(payload)
    return response.created(exhibitor)
  }

  async update({ params, request, response }: HttpContext) {
    const exhibitor = await Exhibitor.findOrFail(params.id)
    const schema = vine.object({
      name: vine.string().trim().optional(),
      contact: vine.string().optional(),
      websiteUrl: vine.string().url().optional(),
      logoUrl: vine.string().optional(),
      visible: vine.boolean().optional(),
    })
    const payload = await vine.validate({ schema, data: request.all() })
    exhibitor.merge(payload)
    await exhibitor.save()
    return response.ok(exhibitor)
  }

  async destroy({ params, response }: HttpContext) {
    const exhibitor = await Exhibitor.findOrFail(params.id)
    if (exhibitor.logoUrl) {
      await fs.unlink(app.makePath(exhibitor.logoUrl.substring(1))).catch(() => {})
    }
    await exhibitor.delete()
    return response.noContent()
  }
}
