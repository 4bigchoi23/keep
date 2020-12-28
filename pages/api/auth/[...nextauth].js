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
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        const user = (credentials) => {
          // You need to provide your own logic here that takes the credentials
          // submitted and returns either a object representing a user or value
          // that is false/null if the credentials are invalid.
          // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
          return null
        }
        if (user) {
          // Any user object returned here will be saved in the JSON Web Token
          return Promise.resolve(user)
        } else {
          return Promise.resolve(null)
        }
      }
    }),
  ],

  // A database is optional, but required to persist accounts in a database
  // database: process.env.DATABASE_URL,

  callbacks: {
    session: async (session, user) => {
      session.user.id = user.id;
      session.user.username = user.username;
      session.user.password = user.password;
      session.user.bio = user.bio;
      session.user.url = user.url;
      return Promise.resolve(session)
    },
    jwt: async (token, user, account, profile, isNewUser) => {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.password = user.password;
        token.bio = user.bio;
        token.url = user.url;
      }
      return Promise.resolve(token)
    },
  },
  session: {
    jwt: false,
  },
  jwt: { secret: process.env.JWT_SECRET },
  adapter: faunaAdapter.Adapter(null, {}),
  debug: false,
}

export default (req, res) => NextAuth(req, res, options)
