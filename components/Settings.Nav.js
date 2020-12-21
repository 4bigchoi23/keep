import Link from 'next/link'

export default function SettingsNav(props) {
  const activeStyle = (tab) => {
    return tab === props.active
      ? { width: '3px', backgroundColor: 'var(--primary)' }
      : {}
  }

  return (
    <>
      <ul className="list-group nexongothic">
        <li className="list-group-item">
          <div className="media">
            <img src={props.image} alt="" width="36" height="36" className="rounded-circle mr-3" />
            <div className="media-body">
              <small className="d-block text-break font-weight-bold">{props.email}</small>
              <small className="d-block text-break text-muted">Personal settings</small>
            </div>
          </div>
        </li>
        <li className="list-group-item position-relative">
          <span className="position-absolute d-block top-0 bottom-0 left-0" style={activeStyle('profile')}></span>
          <Link href="/settings/profile"><a>Profile</a></Link>
        </li>
        <li className="list-group-item position-relative">
          <span className="position-absolute d-block top-0 bottom-0 left-0" style={activeStyle('account')}></span>
          <Link href="/settings/account"><a>Account</a></Link>
        </li>
        <li className="list-group-item position-relative">
          <span className="position-absolute d-block top-0 bottom-0 left-0" style={activeStyle('import')}></span>
          <Link href="/settings/import"><a>Import my bookmark</a></Link>
        </li>
        <li className="list-group-item position-relative">
          <span className="position-absolute d-block top-0 bottom-0 left-0" style={activeStyle('export')}></span>
          <Link href="/settings/export"><a>Export my bookmark</a></Link>
        </li>
      </ul>
    </>
  )
}
