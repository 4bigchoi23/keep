import Head from 'next/head'
import Link from 'next/link'
import { useSession, signin, signout } from 'next-auth/client'
import { Dropdown } from 'react-bootstrap';

export default function Layout(props) {
  const [ session, loading ] = useSession()
  const image = session
    ? (session.user.image ? session.user.image : process.env.sneak.image)
    : process.env.guest.image

  return (
    <>
      <Head>
        <title>{process.env.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div id="app">
        {session && <>
        </>}
        <header className="header">
          <div className="container-lg d-flex justify-content-between align-items-center">
            <h1 className="brand">
              <Link href="/">
                <a>
                  <span className="brand-logo"></span>
                  {process.env.title}
                </a>
              </Link>
            </h1>
            <div>
              {!session && <>
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  onClick={signin}
                >
                  <i className="fa fa-user-circle-o mr-2" aria-hidden="true"></i>
                  <span>Sign in</span>
                </button>
              </>}
              {session && <>
                <div className="d-inline-block">
                  <Dropdown>
                    <Dropdown.Toggle variant="" bsPrefix="no-caret" id="dropdown-basic" className="p-0 shadow-none">
                      <img src={image} className="rounded-circle" width="24" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="/settings/profile">Settings</Dropdown.Item>
                      <Dropdown.Item as="button" onClick={signout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </>}
            </div>
          </div>
        </header>

        <main className={session ? 'main' : ''}>
          {props.children}
        </main>

        {session && <>
        </>}
        <footer className="footer">
          <div className="container-lg">
            <div className="text-center p-3">&copy; {(new Date().getFullYear())}. {process.env.title}. All rights reserved.</div>
          </div>
        </footer>
      </div>
      {/* <style jsx>{``}</style> */}
    </>
  )
}
