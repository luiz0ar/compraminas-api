import AboutPage from '#models/about_page'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await AboutPage.truncate()
    await AboutPage.create({
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet mauris quis neque feugiat mattis condimentum in felis...',
          informations: '20ª Edição do Compra Minas Data: 12 a 14 de Março Horário: das 7h às 18h Local: Complexo Operacional Minasul'
        })
  }
}
