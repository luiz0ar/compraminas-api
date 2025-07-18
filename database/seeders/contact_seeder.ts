import Contact from '#models/contact'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Contact.truncate()
    await Contact.firstOrCreate({}, {
      location: 'Complexo Minasul, Av. Dinamarca, Nº 1, Industrial JK, Varginha - MG',
      locationUrl: 'https://maps.app.goo.gl/hFiaiBZf5DBxCKh38',
      fixNumber: '(35) 3219-3001',
      phoneNumber: '(35) 99127-6006',
      email: 'vendas@minasul.com.br; comunicacao@minasul.com.br',
    })
  }
}
