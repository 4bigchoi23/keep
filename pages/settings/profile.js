import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/client'
import faunadb, { query as q } from "faunadb"
import Settings from '../../components/Settings'

export default function SettingsProfile() {
  const page = 'profile'
  const pageName = page.substr(0, 1).toUpperCase() + page.substr(1)
  const client = new faunadb.Client({ secret: process.env.NEXT_PUBLIC_FAUNADB_SECRET });

  const [ session, loading ] = useSession()
  const user = session && session.user ? session.user : process.env.guest
  const id = user && user.id ? user.id : ''
  const name = user && user.name ? user.name : process.env.sneak.name
  const email = user && user.email ? user.email : process.env.sneak.email
  const image = user && user.image ? user.image : process.env.sneak.image
  const username = user && user.username ? user.username : id

  const inputs = {
    name,
    email,
    image,
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

  useEffect(() => {
    setValues(inputs)
  }, [loading])

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
          <div className="row">
            <div className="col-12 col-sm-9">
              <div className="form-group">
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={values.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={values.email}
                  onChange={handleChange}
                  readOnly
                />
              </div>
            </div>
            <div className="col-12 col-sm-3">
              <div className="mb-2">{pageName} picture</div>
              <div className="d-flex justify-content-center">
                <div className="position-relative mx-auto w-100 pi-edit">
                  <img src={image} alt="" className="rounded-circle w-100" />
                  <button type="button" className="btn btn-sm btn-secondary position-absolute pi-edit-btn">
                    <i className="fa fa-pencil mr-2" aria-hidden="true"></i>
                    <span>Edit</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <button type="submit" className="btn btn-success">
              <span>Update profile</span>
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .pi-edit {
          max-width: 200px;
        }
        .pi-edit-btn {
          left: 0;
          bottom: 0.5rem;
        }
      `}</style>
    </Settings>
  )
}
