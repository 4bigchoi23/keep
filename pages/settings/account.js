import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import { useSession, getSession, signIn } from 'next-auth/client'
import faunadb, { query as q } from "faunadb"
import Settings from '../../components/Settings'

export default function SettingsAccount() {
  const page = 'account'
  const pageName = page.substr(0, 1).toUpperCase() + page.substr(1)
  const client = new faunadb.Client({ secret: process.env.NEXT_PUBLIC_FAUNADB_SECRET });

  const [ session, loading ] = useSession()
  const user = session && session.user ? session.user : process.env.guest
  const id = user && user.id ? user.id : ''
  const name = user && user.name ? user.name : process.env.sneak.name
  const email = user && user.email ? user.email : process.env.sneak.email
  const image = user && user.image ? user.image : process.env.sneak.image
  const username = user && user.username ? user.username : ''

  const inputs = {
    username,
  }
  const [values, setValues] = useState(inputs)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [vitalizing, setVitalizing] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues({ ...values, [name]: value.trim() })
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
      console.log(res)
      // session.user.username = res.data.username
      // getSession()
      // signIn()
    })
    .catch((err) => {
      console.log(`${err}`)
      alert('🤷‍♀️')
    })
    setSubmitting(false)
  }

  useEffect(() => {
    setValues(inputs)
  }, [loading])

  useEffect(() => {
    if (inputs.username !== values.username && values.username.length > 2) {
      setVitalizing(true)
    } else {
      setVitalizing(false)
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
          disabled={submitting && 'disabled'}
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
            />
            <small className="form-text text-muted">
              <span>Your profile url. </span>
              {values.username && <>
                <a href={`${process.env.NEXT_PUBLIC_URL}/${values.username}`}>{process.env.NEXT_PUBLIC_URL}/{values.username}</a>
              </>}
            </small>
          </div>
          <div>
          <button
            type="submit"
            className="btn btn-success"
            disabled={!vitalizing}
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
