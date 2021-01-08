import { useSession } from 'next-auth/client'

export default function KeepEntry(props) {
  const [ session, loading ] = useSession()
  const userId = session?.user?.id || ''

  const onDelete = (i, e) => {
    e.preventDefault()
    if (confirm("Really Delete?")) {
      props.onDelete(i, e)
    }
  }

  const name = props.name || props.username || props.email
  const date = props.date?.replace(/ \([^\)]+\)/g, '') || ''
  const dfim = 'https://via.placeholder.com/320x180/444/222?text=...'
  const ogim = props.misc?.ogimage?.replace(/[\s\t\r\n]/g, '\\ ') || dfim

  const handleOpen = (url, e) => {
    e.preventDefault()
    if (!url) {
      return null
    }
    window.open(url)
  }

  return (
    <div className="card h-100">
      <div
        className="card-img-top position-relative overflow-hidden bg-no-repeat bg-cover bg-center"
        style={{backgroundImage: `url(${ogim})`}}
      >
        <img
          src={ogim}
          alt={props.slug}
          className="position-absolute top-0 bottom-0 left-0 invisible"
        />
      </div>
      <div className="card-body">
        <h6 className={`card-title m-0 ${props._id ? 'text-major font-weight-normal' : 'dummy dummy-slug'}`}>{props.slug}</h6>
        <div className="text-truncate">
          {!props._id && <>
            <small className="dummy dummy-favicon mr-2"></small>
          </>}
          {props.misc?.favicon && <>
            <img src={props.misc?.favicon} alt={props.keep} className="favicon mr-2" />
          </>}
          <small
            className={`${props._id ? 'card-url cursor-pointer' : 'dummy dummy-keep'}`}
            onClick={(e) => handleOpen(props.keep, e)}
          >
            {props.keep}
          </small>
        </div>
        {!props._id && <>
          <small className="d-block text-muted line-height-125 mt-2">
            <small className="d-block dummy dummy-note"></small>
            <small className="d-block dummy dummy-note"></small>
            <small className="d-block dummy dummy-note"></small>
          </small>
        </>}
        {props.note && <>
          <small className="d-block text-muted line-height-125 mt-2">{props.note}</small>
        </>}

        <div className="card-user">
          <hr />
          <div className="media">
            <div
              className="media-img rounded-circle overflow-hidden bg-no-repeat bg-cover bg-center bg-light mr-2 d-block"
              style={{backgroundImage: `url(${props.image})`}}
            >
              <img
                src={props.image}
                alt={name}
                className="invisible"
              />
            </div>
            <div className="media-body">
              <small className={`d-block line-height-125 text-truncate ${!props._id && 'dummy dummy-name'}`}>{name}</small>
              <small className={`d-block line-height-125 text-truncate text-muted ${!props._id && 'dummy dummy-date'}`}>{date}</small>
            </div>
          </div>
          {props.user && props.user === userId && <>
            <div className="card-action">
              <button
                className={`btn btn-sm`}
                onClick={(e) => onDelete(props._id, e)}
                disabled={props.user && props.user !== userId}
              >
                <i className="fa fa-trash-o fa-lg text-danger"></i>
                <span className="sr-only">Delete</span>
              </button>
            </div>
          </>}
        </div>
      </div>
      <style jsx>{`
        .card {
          padding-bottom: 4.25rem;
          transition: all 0.25s ease-in-out;
        }
        .card:hover {
          box-shadow: 0 0 16px rgba(0,0,0,.5);
        }
        .card-img-top {
          padding-top: 56.25%;
        }
        .card-img-top img {
          width: 100%;
          height: auto;
        }
        .card-url:hover {
          text-decoration: underline;
          color: var(--minor)
        }
        .favicon {
          width: 16px;
          height: 16px;
        }
        .media-img {
          width: 32px;
          height: 32px;
        }
        .card-user {
          position: absolute;
          left: 1.25rem;
          right: 1.25rem;
          bottom: 1.25rem;
        }
        .card-action {
          position: absolute;
          bottom: 0;
          right: 0;
        }
        .dummy {
          display: inline-block;
          background: var(--light);
          width: 100%;
          height: 1em;
          border-radius: 0.5em;
        }
        .dummy-slug {
        }
        .dummy-favicon {
          width: 1em;
          height: 1em;
        }
        .dummy-keep {
          width: calc(100% - 0.5rem - 1em);
        }
        .dummy-note {
          margin: 0.5rem 0;
          height: 0.25rem;
          opacity: 0.5;
        }
        .dummy-note:last-child {
          width: 75%;
        }
        .dummy-name,
        .dummy-date {
          margin: 0.375rem 0;
          height: 0.5rem;
        }
        .dummy-name {
          width: 50%;
        }
      `}</style>
    </div>
  )
}
