import type { HttpContext } from '@adonisjs/core/http'
import Start from '#models/start'

export default class StartsController {
  async show({ response }: HttpContext) {
    const registro = await Start.query().first()
    return response.ok(registro)
  }

 async update({ request, response }: HttpContext) {
  const { firstMessage, linkButton, textButton } = request.only([
    'firstMessage',
    'linkButton',
    'textButton',
  ])

  let registro = await Start.query().first()

  if (!registro) {
    registro = await Start.create({ firstMessage, linkButton, textButton })
    return response.created({ message: 'Created succesfullly.', data: registro })
  }

  registro.firstMessage = firstMessage
  registro.linkButton = linkButton
  registro.textButton = textButton
  await registro.save()

  return response.ok({ message: 'Updated succesfully.', data: registro })
}
}
