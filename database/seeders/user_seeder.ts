import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    await User.create({
      email: 'comunicacao@minasul.com.br',
      password: 'comunicacao@Compra6912',
      username: 'comunicacao',
    })
  }
}
