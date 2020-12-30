import React, { useState, useEffect } from 'react';
import { useSession, signin, signout } from 'next-auth/client'
import { Dropdown } from 'react-bootstrap';
import Profile from '../components/Profile'

export default function Auth() {
  const [ session, loading ] = useSession()
  const [profileUrl, setProfileUrl] = useState(null)

  useEffect(() => {
    if (session && !loading && session.user?.username) {
      setProfileUrl(`/${session.user?.username}`)
    } else {
      setProfileUrl(`/settings/account`)
    }
  }, [loading])

  return (
    <>
      {!session && !loading && <>
        <button
          type="button"
          className="btn btn-sm btn-primary"
          onClick={signin}
        >
          <i className="fa fa-user-circle-o mr-2" aria-hidden="true"></i>
          <span>Sign in</span>
        </button>
      </>}
      {session && !loading && <>
        <Dropdown
          alignRight={true}
          className="d-inline-block"
        >
          <Dropdown.Toggle
            variant=""
            bsPrefix="no-caret"
            id="dropdown-basic"
            className="p-0 shadow-none"
          >
            <Profile.Image
              className="rounded-circle"
              width="24"
              height="24"
            />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href={profileUrl}>Profile</Dropdown.Item>
            <Dropdown.Item href="/settings/profile">Settings</Dropdown.Item>
            <Dropdown.Item as="button" onClick={signout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </>}
    </>
  )
}