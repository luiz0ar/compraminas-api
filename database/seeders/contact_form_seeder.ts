import { BaseSeeder } from '@adonisjs/lucid/seeders'
import ContactForm from '#models/contact_form'

export default class extends BaseSeeder {
  async run() {
    await ContactForm.truncate()
    await ContactForm.createMany([
      {
        key: 'contact_form_recipient',
        value: 'email-que-recebe@exemplo.com'
      },
       {
        key: 'smtp_from_email',
        value: 'email-que-envia@exemplo.com.br'
      },
      {
        key: 'recaptcha_site_key',
        value: 'CHAVE_DE_SITE'
      },
      {
        key: 'recaptcha_secret_key',
        value: 'CHAVE_SECRETA'
      },
    ])
  }
}
