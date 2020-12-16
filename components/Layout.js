import Head from 'next/head'
import Link from 'next/link'
import { useSession, signin, signout } from 'next-auth/client'

export default function Layout(props) {
  const [ session, loading ] = useSession()

  return (
    <>
      <Head>
        <title>Keep</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="app">
        <header>
          <div className="container d-flex justify-content-between">
            <h1><Link href="/"><a>Keep</a></Link></h1>
            <div>
              {!session && <>
                Not signed in <br/>
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  onClick={signin}
                >
                  <i className="fa fa-user-circle-o mr-2"></i>
                  <span>Sign in</span>
                </button>
              </>}
              {session && <>
                Signed in as {session.user.email} <br/>
                {session.user.id} <br/>
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  onClick={signout}
                >
                  <i className="fa fa-lock mr-2" aria-hidden="true"></i>
                  <span>Sign out</span>
                </button>
              </>}
            </div>
          </div>
        </header>
        <main>
          {props.children}
        </main>
        <footer>
          <div className="container">
            <div className="text-center p-3">&copy; 2020. All rights reserved.</div>
          </div>
        </footer>
      </div>
    </>
  )
}
