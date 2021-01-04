import { useSession } from 'next-auth/client'

export default function KeepEntry(props) {
  const [ session, loading ] = useSession()
  const userId = session?.user?.id || ''

  const onDelete = (i, e) => {
    e.preventDefault()
    if (confirm("Really Delete?")) {
      props.onDelete(i)
    }
  }

  const img = props.misc?.ogimage || 'https://via.placeholder.com/320x180?text=...'

  return (
    <div className={`card h-100 ${props.user === userId && 'card-o'}`}>
      <div
        className="card-img-top position-relative overflow-hidden bg-no-repeat bg-cover bg-center"
        style={{backgroundImage: `url(${img})`}}
      >
        <img
          src={img}
          alt={props.slug}
          className="position-absolute top-0 bottom-0 left-0 invisible"
        />
      </div>
      <div className="card-body">
        <h6 className="card-title text-major font-weight-normal m-0">{props.slug}</h6>
        <div className="text-truncate">
          <img src={props.misc?.favicon} alt="" className="favicon mr-2" />
          <small className="card-url cursor-pointer" onClick={() => window.open(props.keep)}>{props.keep}</small>
        </div>
        {props.note && <>
          <small className="d-block text-muted line-height-125 mt-2">
            {props.note}
          </small>
        </>}
        <hr className="my-2" />
        <div className="media">
          <div
            className="media-img rounded-circle overflow-hidden bg-no-repeat bg-cover bg-center bg-light mr-3 d-block"
            style={{backgroundImage: `url(${props.image})`}}
          >
            <img
              src={props.image}
              className="invisible"
            />
          </div>
          <div className="media-body">
            <small className="d-block line-height-125 text-truncate">{props.name}</small>
            <small className="d-block line-height-125 text-truncate text-muted">{props.date.replace(/ \([^\)]+\)/g, '')}</small>
          </div>
        </div>
      </div>
      {props.user === userId && <>
        <div className="card-action">
          <button
            className={`btn btn-sm ${props.user !== userId ? 'btn-outline-silver' : 'btn-outline-danger'}`}
            onClick={(e) => onDelete(props._id, e)}
            disabled={props.user !== userId}
          >
            <i className="fa fa-trash-o mr-2"></i>
            <span>Delete</span>
          </button>
        </div>
      </>}
      <style jsx>{`
        .card-o {
          padding-bottom: 2.75rem;
        }
        .card:hover {
          box-shadow: 0 0 10px rgba(0,0,0,.5);
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
        .card-action {
          position: absolute;
          left: 1.25rem;
          right: 1.25rem;
          bottom: 1.25rem;
        }
      `}</style>
    </div>
  )
}
