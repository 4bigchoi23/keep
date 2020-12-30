import Link from 'next/link'
import { useEffect } from 'react';
import { useRouter } from "next/router";
import { useSession } from 'next-auth/client'
import Layout from '../components/Layout'
import Profile from '../components/Profile'

export default function Settings(props) {
  const router = useRouter()
  const [ session, loading ] = useSession()

  const activeTab = (tab) => {
    return tab === props.page
      ? { width: '3px', backgroundColor: 'var(--primary)' }
      : {}
  }

  useEffect(() => {
    if (!session && !loading) {
      router.push('/')
    }
   })

  return (
    <Layout>
      <div className="container-lg py-3">
        <div className="row">
          <div className="col-12 col-sm-3 mb-3 mb-sm-0">
            <ul className="list-group nexongothic">
              <li className="list-group-item">
                <div className="media">
                  <Profile.Image
                    className="rounded-circle mr-3"
                    width="36"
                    height="36"
                  />
                  <div className="media-body">
                    <small className="d-block text-break font-weight-bold"><Profile.Delegate /></small>
                    <small className="d-block text-break text-muted">Personal settings</small>
                  </div>
                </div>
              </li>
              <li className="list-group-item position-relative">
                <span className="position-absolute d-block top-0 bottom-0 left-0" style={activeTab('profile')}></span>
                <Link href="/settings/profile"><a>Profile</a></Link>
              </li>
              <li className="list-group-item position-relative">
                <span className="position-absolute d-block top-0 bottom-0 left-0" style={activeTab('account')}></span>
                <Link href="/settings/account"><a>Account</a></Link>
              </li>
              <li className="list-group-item position-relative">
                <span className="position-absolute d-block top-0 bottom-0 left-0" style={activeTab('security')}></span>
                <Link href="/settings/security"><a>Security</a></Link>
              </li>
              <li className="list-group-item position-relative">
                <span className="position-absolute d-block top-0 bottom-0 left-0" style={activeTab('import')}></span>
                <Link href="/settings/import"><a>Import my bookmark</a></Link>
              </li>
              <li className="list-group-item position-relative">
                <span className="position-absolute d-block top-0 bottom-0 left-0" style={activeTab('export')}></span>
                <Link href="/settings/export"><a>Export my bookmark</a></Link>
              </li>
            </ul>
          </div>
          <div className="col-12 col-sm-9">
            {props.children}
          </div>
        </div>
      </div>
    </Layout>
  )
}
