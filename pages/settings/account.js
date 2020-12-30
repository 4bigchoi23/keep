import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/client'
import faunadb, { query as q } from "faunadb"
import Settings from '../../components/Settings'

export default function SettingsAccount() {
  const page = 'account'
  const pageName = page.substr(0, 1).toUpperCase() + page.substr(1)
  const client = new faunadb.Client({ secret: process.env.NEXT_PUBLIC_FAUNADB_SECRET, });

  const [ session, loading ] = useSession()
  const user = session && session.user ? session.user : process.env.guest
  const id = user && user.id ? user.id : ''
  const name = user && user.name ? user.name : process.env.sneak?.name
  const email = user && user.email ? user.email : process.env.sneak?.email
  const image = user && user.image ? user.image : process.env.sneak?.image
  const username = user && user.username ? user.username : ''

  const inputs = {
    username,
  }

  const [protos, setProtos] = useState(inputs)
  const [values, setValues] = useState(inputs)
  const [errors, setErrors] = useState({})
  const [valids, setValids] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [vitalizing, setVitalizing] = useState(false)
  const [config, setConfig] = useState({reservedUsername: []})

  const swapUsername = (str) => {
    return str?.replace(/[^A-Za-z0-9_]/g, '')?.replace(/^[_]+/g, '')?.trim()?.substr(0, 20)
  }

  var timer
  const handleChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target

    if (name === 'username') {
      const un = swapUsername(value)
      const rs = config.reservedUsername || []
      setValues({ ...values, [name]: un })

      if (un.length === 0 || un.length > 2) {
        if (protos.username !== values.username) {
          if (!rs.length || rs.includes(un) === false) {
            setVitalizing(true)
            setErrors({ ...errors, username: '' })
          } else {
            // 예약어로 사용할 수 없음
            setVitalizing(false)
            setErrors({ ...errors, username: '예약어로 사용할 수 없습니다.' })
          }
        } else {
          // 변경되지 않은 초기값
          setVitalizing(false)
          setErrors({ ...errors, username: '현재 사용하고 계신 USERNAME입니다.' })
        }
      } else {
        // 형식에 맞지 않음
        setVitalizing(false)
        setErrors({ ...errors, username: '형식에 맞지 않습니다.'})
      }
    } else {
      setValues({ ...values, [name]: value })
    }
  }
  
  function handleSubmit(event) {
    event.preventDefault()
    setSubmitting(true)
    client.query(
      q.Update(
        q.Select([0], q.Paginate(q.Match(q.Index("index_users_id"), id))),
        {
          data: {
            username: values.username,
          }
        }
      )
    )
    .then((res) => {
      // console.log(res)
      setProtos({ ...protos, username: res.data.username })
      setSubmitting(false)
      setVitalizing(false)
    })
    .catch((err) => {
      console.log(err)
      alert('🤷‍♀️')
    })
  }

  useEffect(() => {
    setValues(inputs)
    setProtos(inputs)
    client.query(
      q.Get(q.Select([0], q.Paginate(q.Documents(q.Collection('config')))))
    )
    .then((res) => {
      // console.log(res.data.reservedUsername)
      setConfig({...config, reservedUsername: res.data.reservedUsername})
    })
    .catch((err) => {
      console.log(err)
    })
  }, [loading])

  useEffect(() => {
    if (values.username && vitalizing) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        client.query(
          q.Map(
            q.Paginate(q.Match(q.Index("index_users_username"), values.username)),
            q.Lambda("X", q.Get(q.Var("X")))
          )
        )
        .then((res) => {
          // console.log(res.data)
          if (res.data.length > 0) {
            setVitalizing(false)
            setErrors({ ...errors, username: '이미 사용중인 USERNAME입니다.'})
          }
        })
        .catch((err) => {
          console.log(err)
        })
      }, 1000)
    }
  }, [values.username])

  return (
    <Settings
      page={page}
      pageName={pageName}
    >
      <Head>
        <title>Settings / {pageName}</title>
      </Head>

      <div>
        <h2 className="m-0">Change username</h2>
        <div>
          <small>Hi, There!</small>
        </div>
        <hr/>
        <form
          onSubmit={handleSubmit}
          disabled={submitting && true}
        >
          <div className="form-group">
            <label htmlFor="">username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder=""
              value={values.username}
              onChange={handleChange}
              disabled={submitting || loading && true}
            />
            <small className="d-block form-text text-danger">{errors.username}</small>
            <small className="d-block form-text text-muted">
              <span>Your profile url is </span>
              {values.username && <>
                <a href={`${process.env.NEXT_PUBLIC_URL}/${values.username}`}>{process.env.NEXT_PUBLIC_URL}/{values.username}</a>.
              </>}
              {!values.username && <>
                not set.
              </>}
            </small>
            <small className="d-block form-text text-muted">
              Make sure it's at least <b>3</b> characters and at most <b>20</b> characters 
              including a number and a upper/lower case letter and a underscore. 
              However, do not start the first character with an underscore.
            </small>
          </div>
          <div>
          <button
            type="submit"
            className="btn btn-success"
            disabled={submitting || loading || !vitalizing && true}
          >
            <span>Update username</span>
          </button>
        </div>
        </form>
      </div>

      <div className="mt-5">
        <h2 className="m-0 text-danger">Delete account</h2>
        <div>
          <small>Once you delete your account, there is no going back. Please be certain.</small>
        </div>
        <hr/>
        <div>
          <button
            type="button"
            className="btn btn-danger"
          >
            <span>Delete your account</span>
          </button>
        </div>
      </div>
    </Settings>
  )
}
