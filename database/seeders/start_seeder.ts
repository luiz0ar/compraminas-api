import Start from '#models/start'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class StartSeeder extends BaseSeeder {
  async run() {
    await Start.truncate()
    await Start.create({
      firstMessage: 'De 12 a 14 de Março, das 7h às 18h, no Complexo Operacional Minasul!',
      linkButton: 'https://www.instagram.com/minasulcooperativa/',
      textButton: 'CLIQUE AQUI E ACOMPANHE AS NOVIDADES',
      banner: '/uploads/start/1920x895-banner-inicio-desktop-1.png'
    })
  }
}
