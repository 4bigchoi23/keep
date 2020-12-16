import { useSession } from 'next-auth/client'

export default function KeepEntry(props) {
  const [ session, loading ] = useSession()
  const userId = session ? session.user.id : ''

  const profileImage = props.image
    ? props.image
    : 'https://via.placeholder.com/96x96?text=...'
    
  const onDelete = (i, e) => {
    e.preventDefault()
    if (confirm("Really Delete?")) {
      props.onDelete(i)
    }
  }
  return (
    <div className="row">
      <div className="col-auto">
        <img src={profileImage} className="rounded-circle" />
      </div>
      <div className="col">
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
        </code>
      </div>
      <div className="col-auto">
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
  )
}
