import { useSession } from 'next-auth/client'

export default function KeepEntry(props) {
  const [ session, loading ] = useSession()
  const userId = session ? session.user.id : ''
    
  const onDelete = (i, e) => {
    e.preventDefault()
    if (confirm("Really Delete?")) {
      props.onDelete(i)
    }
  }
  return (
    <div className="card my-3">
      <div className="card-body">
        <div className="row">
          <div className="col-12 col-sm-auto">
            <div
              className="rounded-circle overflow-hidden bg-no-repeat bg-cover bg-center bg-light"
              style={{width: '64px', height: '64px', backgroundImage: `url(${props.image})`}}
            >
              <img
                src={props.image}
                className="invisible"
              />
            </div>
          </div>
          <div className="col-12 col-sm my-3 my-sm-0">
            <code className="text-dark">
              <div>_id: {props._id}</div>
              <div>_ts: {props._ts}</div>
              <div>data.user: {props.user}</div>
              <div>user.info: {props.name} &lt;{props.email}&gt;</div>
              <div>data.keep: {props.keep}</div>
              <div>data.slug: {props.slug}</div>
              <div>data.note: {props.note}</div>
              <div>data.tags: {props.tags}</div>
              <div>data.date: {props.date}</div>
              <div>data.misc.ogimage: {props.misc.ogimage}</div>
              <div>data.misc.favicon: {props.misc.favicon}</div>
            </code>
          </div>
          <div className="col-12 col-sm-auto">
            <button
              className={`btn btn-sm ${props.user !== userId ? 'btn-outline-silver' : 'btn-outline-danger'}`}
              onClick={(e) => onDelete(props._id, e)}
              disabled={props.user !== userId}
            >
              <i className="fa fa-trash-o mr-2"></i>
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
