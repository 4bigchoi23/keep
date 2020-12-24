import Head from 'next/head'
import Link from 'next/link'
import Auth from '../components/Auth'

export default function Layout(props) {
  return (
    <>
      <Head>
        <title>{process.env.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div id="app">
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
              <Auth />
            </div>
          </div>
        </header>

        <main className="main">
          {props.children}
        </main>

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
