import Head from 'next/head'
import Link from 'next/link'
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/client'
import Layout from '../../components/Layout'
import SettingsNav from '../../components/Settings.Nav'

export default function SettingsExport() {
  const page = 'export'
  const pageName = page.substr(0, 1).toUpperCase() + page.substr(1)

  const [ session, loading ] = useSession()
  const user  = session && session.user ? session.user : process.env.guest
  const id    = user && user.id     ? user.id : ''
  const name  = user && user.name   ? user.name   : process.env.sneak.name
  const email = user && user.email  ? user.email  : process.env.sneak.email
  const image = user && user.image  ? user.image  : process.env.sneak.image
  const username = ''
  const password = ''

  const [nameHandle, setNameHandle] = useState('')
  const [emailHandle, setEmailHandle] = useState('')
  
  function handleSubmit(event) {
    event.preventDefault()
  }
  function handleNameChange(event) {
    setNameHandle(event.target.value)
  }
  function handleEmailChange(event) {
    setEmailHandle(event.target.value)
  }

  useEffect(() => {
    setNameHandle(name)
    setEmailHandle(email)
  }, [name, email])

  return (
    <Layout>
      <Head>
        <title>Settings / {pageName}</title>
      </Head>
      <div className="container-lg py-3">
        <div className="row">
          <div className="col-12 col-sm-3 mb-3 mb-sm-0">
            <SettingsNav
              name={name}
              email={email}
              image={image}
              active={page}
            />
          </div>
          <div className="col-12 col-sm-9">
            <h2>{pageName}</h2>
            <div>
              Hi, There!
            </div>
            <hr/>
            <form action="">
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}
