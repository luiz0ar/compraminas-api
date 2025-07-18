import { BaseSeeder } from '@adonisjs/lucid/seeders'
import ContactForm from '#models/contact_form'

export default class extends BaseSeeder {
  async run() {
    await ContactForm.truncate()
    await ContactForm.createMany([
      {
        key: 'contact_form_recipient',
        value: 'ti@minasul.com.br'
      },
       {
        key: 'smtp_from_email',
        value: 'faleconosco@cooperativaminasul.com.br'
      },
      {
        key: 'recaptcha_site_key',
        value: '6LesyX4rAAAAAA9J0AzxCYvIdST7GxPxg1_PGgbY'
      },
      {
        key: 'recaptcha_secret_key',
        value: '6LesyX4rAAAAAEyEZCKpz1CQUWJyEPXQ0YsnTH_E'
      },
    ])
  }
}
