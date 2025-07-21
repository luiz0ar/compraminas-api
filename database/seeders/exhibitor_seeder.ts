import Exhibitor from '#models/exhibitor'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Exhibitor.truncate()
    await Exhibitor.createMany([
      {
        name: 'Mahindra Tratores',
        logoUrl: '/uploads/exhibitors/MahindraRise.png',
        websiteUrl: 'https://www.mahindrabrasil.com.br',
        contact: '(35) 3229-3030',
        visible: true
      },
      {
        name: 'Syngenta',
        logoUrl: '/uploads/exhibitors/logo-Placeholder.jpg',
        websiteUrl: 'https://www.syngenta.com.br',
        contact: '0800 704 4304',
        visible: true
      },
      {
        name: 'Café Brasil',
        logoUrl: '/uploads/exhibitors/logo-Placeholder.jpg',
        websiteUrl: 'https://www.cafebrasil.com.br',
        contact: '(35) 3219-1900',
        visible: true
      },
    ])
  }
}
