import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import faunadb, { query as q } from "faunadb"
import KeepForm from './KeepForm'
import KeepEntry from './KeepEntry'
import PageNav from './PageNav'

export default function Keep(props) {
  const router = useRouter()
  const client = new faunadb.Client({ secret: process.env.NEXT_PUBLIC_FAUNADB_SECRET });

  const [ session, loading ] = useSession()
  const isUser = session ? true : false
  const userId = session?.user?.id || ''

  // if (router.query.page === undefined) {
  //   router.query.page = 1
  // }

  const [docs, setDocs] = useState([])
  const [nums, setNums] = useState(0)
  const [page, setPage] = useState(0)
  const [curr, setCurr] = useState()
  const [prev, setPrev] = useState()
  const [next, setNext] = useState()
  const [fetching, setFetching] = useState(false)

  const pageCount = 5
  const itemCount = 12

  const fetchData = async (direction) => {
    try {
      // 전체 갯수 
      // <PageNav />와 함께 사용
      // FaunaDB Offset 쿼리를 지원하지 않아서... 주석
      // const rows = await client.query(
      //   q.Map(
      //     q.Paginate(q.Match(q.Index('all_keeps'))),
      //     q.Lambda(['ref'], q.Var('ref'))
      //   )
      // )
      // console.log(rows.data)
      // setNums(rows.data?.length)

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

      // console.log(json?.data)
      setDocs(json?.data)
      // setCurr(json?.data?.[0]?._id)

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
    client.query(
      q.Delete(q.Ref(q.Collection('keeps'), data))
    )
    .then((ret) => {
      fetchData()
    })
    return
  }

  useEffect(() => {
    if (!docs?.length) {
      fetchData()
    }
  }, [])

  // useEffect(() => {
  //   const p = parseInt(router.query?.page)
  //   if (p > 0) {
  //     setPage(p)
  //   }
  // }, [router.query?.page])

  // useEffect(() => {
  //   if (page > 0) {
  //     fetchData()
  //   }
  // }, [page])

  return (
    <div>
      <KeepForm
        isUser={isUser}
        onCreate={(i, e) => createKeep(i, e)}
      />

      <div className="row my-3">
        {!docs?.length ? (
          <div className="col justify-content-center text-center">
            <div className="spinner-border text-info" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          docs.map((entry, index, allEntries) => {
            return (
              <div
                key={entry._id}
                className="col-12 col-md-6 col-lg-4 my-3"
              >
                <KeepEntry
                  _id={entry._id}
                  _ts={entry._ts}
                  user={entry.data?.user}
                  name={entry.info?.name ? entry.info.name : process.env.sneak?.name}
                  email={entry.info?.email ? entry.info.email : process.env.sneak?.email}
                  image={entry.info?.image ? entry.info.image : process.env.sneak?.image}
                  keep={entry.data.keep}
                  slug={entry.data.slug}
                  note={entry.data.note}
                  tags={entry.data.tags}
                  misc={entry.data.misc}
                  date={new Date(entry._ts / 1000).toString()}
                  onDelete={(i, e) => deleteKeep(i, e)}
                />
              </div>
            )
          })
        )}
      </div>

      {/*
      <div>
        <PageNav
          pageCount={pageCount}
          itemCount={itemCount}
          totalItem={nums}
        />
      </div>
      */}

      <div className="my-3 text-center">
        <button
          type="button"
          className="btn btn-secondary mx-1"
          onClick={() => handlePagination('prev')}
          disabled={!prev || fetching}
        >
          Prev
        </button>
        <span className="btn mx-1 cursor-default" aria-pressed="false">
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
    </div>
  )
}
