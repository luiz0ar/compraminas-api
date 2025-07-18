import type { HttpContext } from '@adonisjs/core/http'
import mail from '@adonisjs/mail/services/main'
import vine from '@vinejs/vine'
import axios from 'axios'
import Setting from '#models/contact_form'

export default class ContactFormsController {
  async send({ request, response }: HttpContext) {
    const schema = vine.object({
      name: vine.string(),
      email: vine.string().email(),
      subject: vine.string(),
      message: vine.string(),
      phone: vine.string().optional(),
      recaptchaToken: vine.string(),
    })

    try {
      const payload = await vine.validate({ schema, data: request.all() })
      const settingsRaw = await Setting.all()
      const settings = settingsRaw.reduce((acc, setting) => {
        acc[setting.key] = setting.value
        return acc
      }, {} as Record<string, string | null>)
      const recaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${settings.recaptcha_secret_key}&response=${payload.recaptchaToken}`;
      const recaptchaRes = await axios.post(recaptchaUrl);

      if (!recaptchaRes.data.success) {
        return response.badRequest({ message: 'Falha na verificação do reCAPTCHA.' })
      }
      await mail.send((message) => {
        message
          .to(settings.contact_form_recipient!)
          .from(settings.smtp_from_email!, settings.smtp_from_name!)
          .replyTo(payload.email, payload.name)
          .subject(`Contato do Site: ${payload.subject}`)
          .htmlView('emails/contact_notification', { ...payload })
      })

      return response.ok({ message: 'E-mail enviado com sucesso!' })

    } catch (error) {
      console.error(error);
      return response.badRequest({ message: 'Erro de validação ou envio.', errors: error.messages })
    }
  }
}
