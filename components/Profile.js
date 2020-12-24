import { session, useSession } from 'next-auth/client'

const ProfileID = (props) => {
  const [ session, loading ] = useSession()
  const ID = props.value !== undefined
    ? props.value
    : (session && !loading
        ? session.user?.id || ''
        : ''
      )
  return ID
}

const ProfileName = (props) => {
  const [ session, loading ] = useSession()
  const name = props.value !== undefined
    ? props.value
    : (session && !loading
        ? session.user?.name || process.env.sneak?.name || ''
        : process.env.guest?.name || ''
      )
  return name
}

const ProfileEmail = (props) => {
  const [ session, loading ] = useSession()
  const email = props.value !== undefined
    ? props.value
    : (session && !loading
        ? session.user?.email || process.env.sneak?.email || ''
        : process.env.guest?.email || ''
      )
  return email
}

const ProfileImage = (props) => {
  const [ session, loading ] = useSession()
  const src = props.src
    ? props.src
    : (session && !loading 
        ? session.user?.image || process.env.sneak?.image || process.env.guest?.image || null
        : process.env.guest?.image
      )
  const alt = props.alt
    ? props.alt.trim()
    : (session && !loading && !props.src
        ? `${session.user.name}`
        : null
      )
  const handleError = (e) => {
    e.target.onerror = null
    e.target.src = process.env.guest?.image || null
  }

  return (
    <img
      src={src}
      alt={alt}
      title={props.title ? props.title : null}
      className={props.className ? props.className : null}
      width={props.width ? props.width : null}
      height={props.height ? props.height : null}
      style={props.style ? props.style : null}
      onError={handleError}
    />
  )
}

const ProfileUsername = (props) => {
  const [ session, loading ] = useSession()
  const username = props.value !== undefined
    ? props.value
    : (session && !loading
        ? (session.user?.username || '')
        : ''
      )
  return username
}

const ProfilePassword = (props) => {
  const [ session, loading ] = useSession()
  const password = ''
  return password
}

const ProfileDelegate = (props) => {
  const [ session, loading ] = useSession()
  const delegate = props.value !== undefined
    ? props.value
    : (session && !loading
        ? session.user?.username || session.user?.name || session.user?.email || process.sneak?.name || ''
        : process.env.guest?.name || ''
      )
  return delegate
}

const ProfileMedia = (props) => {
  const [ session, loading ] = useSession()
  const heading = props.heading
    ? props.heading
    : (session && !loading 
        ? session.user?.username || session.user?.name || session.user?.email
        : 'Profile'
      )
  const description = props.description
    ? props.description
    : `Hi, ${heading}. This is profile media.`
  const imageWidth = props.img.width
    ? props.img.width
    : '36px'
  const imageHeight = props.img.height
    ? props.img.height
    : '36px'
  return (
    <div className={`media${props.className ? ' ' + props.className : ''}`}>
      <ProfileImage
        src={props.img?.src}
        className={`mr-3 ${props.img?.className}`}
        width={imageWidth}
        height={imageHeight}
      />
      <div className="media-body">
        <small className="d-block font-weight-bold line-height-125">{heading}</small>
        <small className="d-block text-muted line-height-125 mt-1">{description}</small>
      </div>
    </div>
  )
}

const Profile = {
  ID: ProfileID,
  Name: ProfileName,
  Email: ProfileEmail,
  Image: ProfileImage,
  Username: ProfileUsername,
  Password: ProfilePassword,
  Delegate: ProfileDelegate,
}
export default Profile
export {
  ProfileMedia,
}
