import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/client'
import faunadb, { query as q } from "faunadb"
import Settings from '../../components/Settings'

export default function SettingsSecurity() {
  const page = 'security'
  const pageName = page.substr(0, 1).toUpperCase() + page.substr(1)
  const client = new faunadb.Client({ secret: process.env.NEXT_PUBLIC_FAUNADB_SECRET });

  const [ session, loading ] = useSession()
  const user = session && session.user ? session.user : process.env.guest
  const id = user && user.id ? user.id : ''
  const name = user && user.name ? user.name : process.env.sneak.name
  const email = user && user.email ? user.email : process.env.sneak.email
  const image = user && user.image ? user.image : process.env.sneak.image
  const username = user && user.username ? user.username : ''
  const user_old_password = ''
  const user_new_password = ''
  const user_cfm_password = ''

  const inputs = {
    user_old_password,
    user_new_password,
    user_cfm_password,
  }

  const [values, setValues] = useState(inputs)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues({ ...values, [name]: value.trim() })
  }

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitting(true)
    console.log(values)
    setSubmitting(false)
  }

  return (
    <Settings
      page={page}
      pageName={pageName}
    >
      <Head>
        <title>Settings / {pageName}</title>
      </Head>
      <div>
        <h2 className="m-0">{pageName}</h2>
        <div>
          <small>Hi, There!</small>
        </div>
        <hr/>
        <form
          onSubmit={handleSubmit}
          disabled={submitting && 'disabled'}
        >
          <div className="form-group">
            <label htmlFor="">Old password</label>
            <input
              type="password"
              name="user_old_password"
              className="form-control"
              value={values.password}
              onChange={handleChange}
              autoComplete="new-password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="">New password</label>
            <input
              type="password"
              name="user_new_password"
              className="form-control"
              value={values.password}
              onChange={handleChange}
              autoComplete="new-password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Confirm new password</label>
            <input
              type="password"
              name="user_cfm_password"
              className="form-control"
              value={values.password}
              onChange={handleChange}
              autoComplete="new-password"
            />
          </div>
          <div className="mt-5">
            <button
              type="submit"
              className="btn btn-success"
            >
              <span>Update password</span>
            </button>
            <button
              type="button"
              className="btn btn-link ml-3"
            >
              <span>I forgot my password</span>
            </button>
          </div>
        </form>
      </div>
    </Settings>
  )
}
