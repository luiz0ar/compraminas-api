import { BaseSeeder } from '@adonisjs/lucid/seeders'
import PressArticle from '#models/press_article'

export default class extends BaseSeeder {
  async run() {
    await PressArticle.truncate()
    await PressArticle.create({
      title: 'Compra Minas, da Minasul, apresenta soluções para sua lavoura',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in neque quam. Quisque a fermentum neque. Nullam orci mauris, tempus nec sagittis gravida, dictum non eros...',
      image: '/uploads/press/1000x667.png',
      mapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4434.756974360143!2d-45.44841312403223!3d-21.581102580210054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ca9269aaaaaaab%3A0x698b1eed06b27907!2sMINASUL!5e1!3m2!1spt-BR!2sbr!4v1752506858634!5m2!1spt-BR!2sbr'
    })
  }
}
