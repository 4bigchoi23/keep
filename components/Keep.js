import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'
import faunadb, { query as q } from "faunadb"
import KeepForm from './KeepForm'
import KeepEntry from './KeepEntry'

export default function Keep(props) {
  const client = new faunadb.Client({ secret: process.env.NEXT_PUBLIC_FAUNADB_SECRET });

  const [ session, loading ] = useSession()
  const isUser = session ? true : false
  const userId = session ? session.user.id : ''
  
  const [docs, setDocs] = useState([])

  const fetchData = async () => {
    try {
      const json = await client.query(
        q.Reverse(
          q.Map(
            q.Paginate(
              q.Match(q.Index('all_keeps')),
              { size: 100 }
            ),
            q.Lambda(
              ['ref'], 
              //q.Get(q.Var('ref')),
              q.Let(
                {
                  instance: q.Get(q.Var('ref')),
                  userrefs: q.Select(['data', 'user'], q.Var('instance'), ""),
                  userdata: {
                    name: process.env.guest.name,
                    email: process.env.guest.email,
                    image: process.env.guest.image
                  }
                },
                {
                  _id: q.Select(['id'], q.Var('ref')),
                  _ts: q.Select(['ts'], q.Var('instance')),
                  data: q.Select(['data'], q.Var('instance')),
                  info: q.If(
                    q.Equals(q.Var('userrefs'), ""), 
                    q.Var('userdata'), 
                    q.Select(['data'], q.Get(q.Match(q.Index('index_users_id'), q.Var('userrefs'))))
                  ),
                }
              )
            )
          )
        )
      )
      // console.log(json.data)
      setDocs(json.data)
    } catch (err) {
      // console.error(err)
    }
  }
  // fetchData()

  const createKeep = (data, event) => {
    client.query(
      q.Create(
        q.Collection('keeps'),
        {
          data: {
            user: userId,
            keep: data.keep,
            slug: data.slug,
            note: data.note,
            tags: data.tags
          }
        },
      )
    )
    .then((ret) => {
      // console.log(ret)
      fetchData()
    })
    .catch((err) => {
      console.log(`boo :( ${err}`)
      alert('🤷‍♀️')
    })
    return
  }

  const updateKeep = (data, event) => {
    return
  }
  const deleteKeep = (data, event) => {
    client.query(
      q.Delete(q.Ref(q.Collection('keeps'), data))
    )
    .then((ret) => {
      fetchData()
    })
    return
  }

  useEffect(() => {
    if (!docs.length) {
      fetchData()
    }
  })

  return (
    <div>
      <KeepForm
        isUser={isUser}
        onCreate={(i, e) => createKeep(i, e)}
      />

      <div>
        {!docs ? (
          <p>Loading...</p>
        ) : (
          docs.map((entry, index, allEntries) => {
            return (
              <div key={entry._id}>
                <KeepEntry
                  _id={entry._id}
                  _ts={entry._ts}
                  user={entry.data.user}
                  name={entry.info.name ? entry.info.name : process.env.sneak.name}
                  email={entry.info.email ? entry.info.email : process.env.sneak.email}
                  image={entry.info.image ? entry.info.image : process.env.sneak.image}
                  keep={entry.data.keep}
                  slug={entry.data.slug}
                  note={entry.data.note}
                  tags={entry.data.tags}
                  date={new Date(entry._ts / 1000).toString()}
                  onDelete={(i, e) => deleteKeep(i, e)}
                />
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
