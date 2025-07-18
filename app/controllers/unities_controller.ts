import type { HttpContext } from '@adonisjs/core/http'
import Unity from '#models/unity'
import vine from '@vinejs/vine'

export default class UnitiesController {

  async index({ response }: HttpContext) {
    const unities = await Unity.query().orderBy('name', 'asc')
    return response.ok(unities)
  }

   async show({ params, response }: HttpContext) {
      const unity = await Unity.findOrFail(params.id)
      return response.ok(unity)
    }

  async store({ request, response }: HttpContext) {
    const schema = vine.object({
      name: vine.string(),
      unityUrl: vine.string().url().nullable(),
    })
    const payload = await vine.validate({ schema, data: request.all() })
    const unity = await Unity.create(payload)
    return response.created(unity)
  }

  async update({ params, request, response }: HttpContext) {
    const unity = await Unity.findOrFail(params.id)
    const schema = vine.object({
      name: vine.string(),
      unityUrl: vine.string().url().nullable(),
    })
    const payload = await vine.validate({ schema, data: request.all() })
    unity.merge(payload)
    await unity.save()
    return response.ok(unity)
  }

  async destroy({ params, response }: HttpContext) {
    const unity = await Unity.findOrFail(params.id)
    await unity.delete()
    return response.noContent()
  }
}
