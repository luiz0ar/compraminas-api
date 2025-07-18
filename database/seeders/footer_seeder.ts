import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Footer from '#models/footer'

export default class extends BaseSeeder {
  async run() {
     await Footer.truncate()
     await Footer.createMany([
      { key: 'telefone_contato', value: '(35) 99127-6006' },
      { key: 'link_facebook', value: 'https://facebook.com' },
      { key: 'link_instagram', value: 'https://www.instagram.com/minasulcooperativa' },
      { key: 'link_youtube', value: 'https://www.youtube.com/watch?v=yUDKg66JIiw1' },
      { key: 'link_linkedin', value: 'https://www.linkedin.com/company/minasul-cooperativa' },
    ])
  }
}
