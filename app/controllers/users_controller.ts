import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class UsersController {
   async login({ request, response }: HttpContext) {
    const { username, password } = request.only(['username', 'password'])
    const user = await User.query()
      .where('username', username)
      .orWhere('email', username)
      .first()
    if (!user) {
      return response.unauthorized({ message: 'Invalid username or password.' })
    }
    const passwordVerified = await hash.verify(user.password, password)
    if (!passwordVerified) {
      return response.unauthorized({ message: 'Invalid username or password.' })
    }
    const token = await User.accessTokens.create(user)
    return response.ok({
      user: user,
      token: token.value!.release(),
    })
  }

   async store({ request, response }: HttpContext) {
    const data = request.only(['username', 'email', 'password'])
    const user = await User.create(data)
    return response.created(user)
  }
}
