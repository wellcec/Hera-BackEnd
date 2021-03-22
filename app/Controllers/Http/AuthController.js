'use strict'

const User = use('App/Models/User')

class AuthController {
    async register({ request }) {
        const data = request.only(['username', 'email', 'password'])
        const user = await User.create(data)
        return user
    }

    async authenticate({ request, response, auth }) {
        const { email, password } = request.all()

        const login = await auth.attempt(email, password)

        if (login) return login

        response.unauthorized('Login Inválido!')
    }

    async user({ auth }) {
        const { username, email, created_at, updated_at } = auth.user

        return {
            username,
            email,
            created_at,
            updated_at,
        }
    }
}

module.exports = AuthController
