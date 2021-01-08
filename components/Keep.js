import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import faunadb, { query as q } from "faunadb"
import KeepForm from './KeepForm'
import KeepEntry from './KeepEntry'

export default function Keep(props) {
  const router = useRouter()
  const client = new faunadb.Client({ secret: process.env.NEXT_PUBLIC_FAUNADB_SECRET });

  const [ session, loading ] = useSession()
  const isUser = session ? true : false
  const userId = session?.user?.id || ''

  const [docs, setDocs] = useState([])
  const [nums, setNums] = useState(0)
  const [page, setPage] = useState(0)
  const [curr, setCurr] = useState()
  const [prev, setPrev] = useState()
  const [next, setNext] = useState()
  const [fetching, setFetching] = useState(false)

  const pageCount = 5
  const itemCount = 24

  const fetchData = async (direction) => {
    try {
      // 페이지
      if (!direction || !page) {
        setPage(1)
      } else {
        switch (direction) {
          case 'prev': setPage(page - 1); break;
          case 'next': setPage(page + 1); break;
        }
      }

      // 목록
      let paginate = { size: itemCount }
      switch (direction) {
        case 'curr':
          paginate = {
            ...paginate,
            after: [ q.Ref(q.Collection("keeps"), curr) ]
          }
          break

        case 'prev': 
          paginate = {
            ...paginate,
            before: [ q.Ref(q.Collection("keeps"), prev) ]
          }
          break

        case 'next': 
          paginate = {
            ...paginate,
            after: [ q.Ref(q.Collection("keeps"), next) ]
          }
          break

        default:
          paginate = {
            ...paginate,
            after: [ null ]
          }
      }

      // 목록
      setFetching(true)
      const json = await client.query(
        q.Map(
          q.Paginate(
            q.Match(q.Index('all_keeps_desc')),
            paginate
          ),
          q.Lambda(
            ["ref"], 
            // q.Get(q.Var('ref')),
            q.Let(
              {
                instance: q.Get(q.Var('ref')),
                userrefs: q.Select(['data', 'user'], q.Var('instance'), ""),
                userdata: {
                  name: process.env.guest?.name,
                  email: process.env.guest?.email,
                  image: process.env.guest?.image
                },
                userinfo: q.If(
                  q.Equals(q.Var('userrefs'), ""),
                  q.Var('userdata'),
                  q.Let(
                    {
                      i: q.Get(q.Match(q.Index('index_users_id'), q.Var('userrefs'))),
                      j: q.Select(['data'], q.Var('i')),
                    },
                    {
                      name: q.Select('name', q.Var('j'), ""),
                      email: q.Select('email', q.Var('j'), ""),
                      image: q.Select('image', q.Var('j'), ""),
                    }
                  )
                ),
              },
              {
                _id: q.Select(['id'], q.Var('ref'), ""),
                _ts: q.Select(['ts'], q.Var('instance'), 0),
                data: q.Select(['data'], q.Var('instance'), {}),
                info: q.Var('userinfo'),
              }
            )
          )
        )
      )

      // console.log(json?.data)
      setDocs(json?.data)
      setCurr(json?.data?.[0]?._id)

      // console.log('before', json?.before)
      setPrev(json?.before?.[0]?.value?.id)

      // console.log('after', json?.after)
      setNext(json?.after?.[0]?.value?.id)

      setFetching(false)
    } catch (err) {
      // console.error(err)
    }
  }

  const handlePagination = (where) => {
    fetchData(where)
  }

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
            tags: data.tags,
            misc: {
              ogimage: data.misc.ogimage,
              favicon: data.misc.favicon
            }
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
    event.preventDefault()
    event.currentTarget.blur()

    client.query(
      q.Delete(q.Ref(q.Collection('keeps'), data))
    )
    .then((ret) => {
      let array = docs.map( e => e._id )
      array = array.filter((value, index) => value !== data)
      if (array.length > 0) {
        setCurr(array[0])
        fetchData('curr')
      } else {
        setCurr()
        fetchData()
      }
    })
    return
  }

  useEffect(() => {
    if (!docs?.length) {
      fetchData()
    }
  }, [])

  return (
    <div>
      <KeepForm
        isUser={isUser}
        onCreate={(i, e) => createKeep(i, e)}
      />

      <div className="row my-3">
        {!docs?.length ? (
          [...Array(3)].map((entry, index) => {
            return (
              <div
                key={index}
                className="col-12 col-md-6 col-lg-4 my-3"
              >
                <KeepEntry />
              </div>
            )
          })
        ) : (
          docs.map((entry, index, allEntries) => {
            return (
              <div
                key={index}
                className="col-12 col-md-6 col-lg-4 my-3"
              >
                <KeepEntry
                  _id={entry._id}
                  _ts={entry._ts}
                  user={entry.data?.user}
                  name={entry.info?.name}
                  email={entry.info?.email}
                  image={entry.info?.image || (entry.data?.user ? process.env.sneak?.image : process.env.guest?.image)}
                  username={entry.info?.username}
                  keep={entry.data?.keep}
                  slug={entry.data?.slug}
                  note={entry.data?.note}
                  tags={entry.data?.tags}
                  misc={entry.data?.misc}
                  date={entry._ts ? new Date(entry._ts / 1000).toString() : ''}
                  onDelete={(i, e) => deleteKeep(i, e)}
                />
              </div>
            )
          })
        )}
      </div>

      {docs?.length > 0 && (prev || next) && <>
        <div className="my-3 text-center">
          <button
            type="button"
            className="btn btn-secondary mx-1"
            onClick={() => handlePagination('prev')}
            disabled={!prev || fetching}
          >
            Prev
          </button>
          <span className="btn mx-1 cursor-default pointer-events-none">
          {fetching ? (
            <span className="spinner-border spinner-border-sm"></span>
          ) : (
            <span>{page}</span>
          )}
          </span>
          <button
            type="button"
            className="btn btn-secondary mx-1"
            onClick={() => handlePagination('next')}
            disabled={!next || fetching}
          >
            Next
          </button>
        </div>
      </>}
    </div>
  )
}
