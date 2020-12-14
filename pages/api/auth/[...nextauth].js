import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import faunaAdapter from '../../../lib/faunaAdapter'

const options = {
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
  ],

  // A database is optional, but required to persist accounts in a database
  // database: process.env.DATABASE_URL,

  callbacks: {
    session: async (session, user) => {
      session.user.id = user.id;
      return Promise.resolve(session)
    },
    jwt: async (token, user, account, profile, isNewUser) => {
      if (user) {
        token.id = user.id;
      }
      return Promise.resolve(token)
    },
  },
  session: {
    jwt: true,
  },
  jwt: { secret: process.env.JWT_SECRET },
  adapter: faunaAdapter.Adapter(null, {}),
  debug: false,
}

export default (req, res) => NextAuth(req, res, options)
