import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';
import faunadb, { query as q } from "faunadb"
import ErrorPage from 'next/error'
import Layout from '../components/Layout'
import KeepEntry from '../components/KeepEntry'

export default function Username() {
  const router = useRouter()
  const client = new faunadb.Client({ secret: process.env.NEXT_PUBLIC_FAUNADB_SECRET, });

  const { username } = router.query
  const [userinfo, setUserinfo] = useState({})
  const [notfound, setNotfound] = useState(false)

  const [docs, setDocs] = useState([])
  const [nums, setNums] = useState(0)
  const [page, setPage] = useState(0)
  const [more, setMore] = useState()
  const [fetching, setFetching] = useState(false)
  const [infinite, setInfinite] = useState(false);

  const pageCount = 5
  const itemCount = 24

  const fetchData = async () => {
    if (userinfo.id) {
      setFetching(true)
      const json = await client.query(
        q.Map(
          q.Paginate(
            q.Match(q.Index('keeps_by_user_desc'), userinfo.id),
            {
              size: itemCount,
              after: [ more ? q.Ref(q.Collection("keeps"), more) : null ]
            }
          ),
          q.Lambda(
            ['ref'], 
            //q.Get(q.Var('ref')),
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
      setDocs(docs.concat(json?.data))
      setMore(json?.after?.[0]?.value?.id)
      setPage(page + 1)
      setFetching(false)
      setInfinite(false)
    }
  }

  const handlePagination = () => {
    fetchData()
  }

  const infiniteScroll = () => {
    const scrollTop = (document.documentElement
      && document.documentElement.scrollTop)
      || document.body.scrollTop;
    const scrollHeight = (document.documentElement
      && document.documentElement.scrollHeight)
      || document.body.scrollHeight;
    if (scrollTop + window.innerHeight + 50 >= scrollHeight){
      setInfinite(true)
    }
  }

  const createKeep = (data, event) => {
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
      const $this = event.currentTarget
      const $card = $this.closest('.card')
      $card.style.opacity = 0.25
      $card.style.pointerEvents = 'none'
    })
    return
  }

  useEffect(() => {
    // console.log(username)
    if (username) {
      client.query(
        q.Get(q.Select([0], q.Paginate(q.Match(q.Index('index_users_username'), username))))
      )
      .then((res) => {
        // console.log(res.data)
        if (res.data.id) {
          setUserinfo({
            id: res.data.id,
            name: res.data.name || process.env.sneak?.name,
            email: res.data.email || process.env.sneak?.email,
            image: res.data.image || process.env.sneak?.image,
            bio: res.data.bio || '',
            url: res.data.url || '',
          })
        } else {
          setNotfound(true)
        }
      })
      .catch((err) => {
        console.log(err)
        setNotfound(true)
      })

    }
  }, [username])

  useEffect(() => {
    if (!docs.length) {
      fetchData()
    }
  }, [userinfo.id])

  useEffect(() => {
    window.addEventListener('scroll', infiniteScroll);
    return () => window.removeEventListener('scroll', infiniteScroll);
  }, [])
  useEffect(() => {
    if (infinite && more) {
      fetchData()
      console.log('infiniteScroll fetchData', more, page)
    }
  }, [infinite])

  return notfound ? (
    <ErrorPage statusCode="404" />
  ) : (
    <Layout>
      <Head>
        <title>{username ? username : 'username'}'s profile</title>
      </Head>
      <div className="jumbotron rounded-0 m-0 text-break">
        <div className="container-lg">
          <h2 className="display-4">{username}'s profile</h2>
          <p className="lead">{userinfo.bio}</p>
          <hr />
          <div className="row mx-n2 align-items-center">
            <div className="col-12 col-sm-auto px-2 align-items-center">
              <i className="fa fa-fw fa-user-circle-o" aria-hidden="true"></i>
              <span className="ml-1">{userinfo.name}</span>
            </div>
            <div className="col-12 col-sm-auto px-2 align-items-center">
              <i className="fa fa-fw fa-envelope" aria-hidden="true"></i>
              <span className="ml-1">{userinfo.email}</span>
            </div>
            <div className="col-12 col-sm-auto px-2 align-items-center">
              <i className="fa fa-fw fa-globe" aria-hidden="true"></i>
              <span className="ml-1">{userinfo.url}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="container-lg py-3">
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
          {fetching && <>
            <div className="col-12 justify-content-center py-3">
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            </div>
          </>}
        </div>
      </div>
      <style jsx>{`
        .jumbotron {
          background: linear-gradient(70deg, var(--major), var(--minor));
          color: var(--white)
        }
        .jumbotron hr {
          border-color: var(--white);
          opacity: 0.1;
        }
      `}</style>
    </Layout>
  )
}
