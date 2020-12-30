import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import faunadb, { query as q } from "faunadb"
import faunaAdapter from '../../../lib/faunaAdapter'
import Crypto from '../../../lib/cryptoHelper'

const options = {
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: "Email or Username", type: "text", value: "noisypasta@naver.com" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        let user = null
        const client = new faunadb.Client({ secret: process.env.NEXT_PUBLIC_FAUNADB_SECRET })
        const isEmail = credentials.username.indexOf('@') !== -1 ? true : false
        const credentialsIndex = isEmail ? 'index_users_email' : 'index_users_username'

        return await client.query(
          q.Get(q.Select([0], q.Paginate(q.Match(q.Index(credentialsIndex), credentials.username))))
        ).then((res) => {
          // console.log(res.data)
          const pass = credentials.password
            ? Crypto.getPass(credentials.password, res.data.passsalt)
            : ''
          if (pass && res.data.password && pass === res.data.password) {
            user = res.data
          }
          return Promise.resolve(user)
        })
      }
    }),
  ],

  // A database is optional, but required to persist accounts in a database
  // database: process.env.DATABASE_URL,

  callbacks: {
    session: async (session, user) => {
      session.user = user
      return Promise.resolve(session)
    },
    jwt: async (token, user, account, profile, isNewUser) => {
      user && (token.user = user)
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
