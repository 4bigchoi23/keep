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
  const username = user && user.username ? user.username : ''
  const bio = user && user.bio ? user.bio : ''
  const url = user && user.url ? user.url : ''

  const inputs = {
    name,
    email,
    image,
    bio,
    url,
  }

  const [protos, setProtos] = useState(inputs)
  const [values, setValues] = useState(inputs)
  const [errors, setErrors] = useState({})
  const [valids, setValids] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [vitalizing, setVitalizing] = useState(false)

  var timer
  const handleChange = (event) => {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
  }

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitting(true)
    client.query(
      q.Update(
        q.Select([0], q.Paginate(q.Match(q.Index("index_users_id"), id))),
        {
          data: {
            name: values.name.trim(),
            bio: values.bio.trim(),
            url: values.url.trim(),
          }
        }
      )
    )
    .then((res) => {
      // console.log(res)
      setSubmitting(false)
      setVitalizing(false)
      setProtos(values)
    })
    .catch((err) => {
      console.log(err)
      alert('🤷‍♀️')
    })
  }

  useEffect(() => {
    setValues(inputs)
    setProtos(inputs)
  }, [loading])

  useEffect(() => {
    if (JSON.stringify(protos) !== JSON.stringify(values)) {
      setVitalizing(true)
    } else {
      setVitalizing(false)
    }
  }, [values])

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
          disabled={submitting && true}
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
                  disabled={submitting || loading && true}
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
                  disabled={submitting || loading && true}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="">Bio</label>
                <textarea
                  name="bio"
                  className="form-control resize-none"
                  value={values.bio}
                  onChange={handleChange}
                  disabled={submitting || loading && true}
                >
                </textarea>
              </div>
              <div className="form-group">
                <label htmlFor="">Url</label>
                <input
                  type="test"
                  name="url"
                  className="form-control"
                  value={values.url}
                  onChange={handleChange}
                  disabled={submitting || loading && true}
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
            <button
              type="submit"
              className="btn btn-success"
              disabled={submitting || loading || !vitalizing && true}
            >
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
