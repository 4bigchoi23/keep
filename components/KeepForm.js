import { useState, useEffect } from 'react'
import TextareaAutosize from 'react-textarea-autosize';

export default function KeepForm(props) {
  const inputs = {
    keep: '',
    slug: '',
    note: '',
    tags: '',
    misc: {
      ogimage: '',
      favicon: ''
    }
  }
  const [values, setValues] = useState(inputs)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [pastedKeep, setPastedKeep] = useState(false)

  useEffect(() => {
    if (pastedKeep) {
      const uri = values.keep
      if (uri && uri.indexOf('http') === 0) {
        setSubmitting(true)
        fetch(`/api/hello?q=${encodeURIComponent(uri)}`).then((response) => {
          response.json().then((res) => {
            let update = {}
            if (res.title !== undefined) {
              update.slug = res.title
            }
            if (res.description !== undefined) {
              update.note = res.description
            }
            if (res.image !== undefined || res.favicon !== undefined) {
              update.misc = {}
              if (res.image !== undefined) {
                update.misc.ogimage = res.image
              }
              if (res.favicon !== undefined) {
                update.misc.favicon = res.favicon
              }
            }
            setValues({ ...values, ...update })
          })
          setSubmitting(false)
        })
      }
      setPastedKeep(false)
    }
  }, [values.keep])

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (values.keep.length === 0) {
      alert('Please provide a valid keep handle!')
      return
    }
    setSubmitting(true)
    props.onCreate({ ...values }, event)
    setValues(inputs)
    setSubmitting(false)
    return
  }
  
  function handleKeepPaste(event) {
    setPastedKeep(true)
  }
 
  function handleFormReset(event) {
    event.preventDefault()
    setValues(inputs)
    return
  }

  return (
    <>
    {props.isUser ? (
      <div>
        <form onSubmit={handleSubmit}>
          <fieldset
            disabled={submitting && 'disabled'}
          >
            <legend className="sr-only">Keep Your Bookmark!</legend>
            <div className="form-group mb-2">
              <label
                htmlFor="handleKeep"
                className="sr-only"
              >keep</label>
              <input
                type="text"
                name="keep"
                placeholder="http:// or https://"
                onPaste={handleKeepPaste}
                onChange={handleChange}
                value={values.keep}
                className="form-control"
                id="handleKeep"
                required
              />
            </div>

            <div className="form-group mb-2">
              <label
                htmlFor="handleSlug"
                className="sr-only"
              >slug</label>
              <input
                type="text"
                name="slug"
                placeholder="slug"
                onChange={handleChange}
                value={values.slug}
                className="form-control"
                id="handleSlug"
                required
              />
            </div>

            <div className="form-group mb-2">
              <label
                htmlFor="handleNote"
                className="sr-only"
              >note</label>
              <TextareaAutosize
                name="note"
                placeholder="note"
                onChange={handleChange}
                value={values.note}
                className="form-control resize-none"
                id="handleNote"
              />
            </div>

            <div className="form-group mb-2 sr-only">
              <label
                htmlFor="handleMiscOgimage"
                className="sr-only"
              >misc.ogimage</label>
              <input
                type="hidden"
                name="misc.ogimage"
                placeholder=""
                onChange={handleChange}
                value={values.misc.ogimage}
                className="form-control"
                id="handleMiscOgimage"
              />
            </div>

            <div className="form-group mb-2 sr-only">
              <label
                htmlFor="handleMiscFavicon"
                className="sr-only"
              >misc.favicon</label>
              <input
                type="hidden"
                name="misc.favicon"
                placeholder=""
                onChange={handleChange}
                value={values.misc.favicon}
                className="form-control"
                id="handleMiscFavicon"
              />
            </div>

            <div className="d-flex justify-content-between">
              <button
                type="submit"
                className="btn btn-primary"
                accessKey="s"
              >
                Keep Your Bookmark!
                ( <kbd>Alt</kbd> + <kbd>S</kbd> )
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary ml-3"
                onClick={handleFormReset}
              >
                Reset
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    ) : (
      <div>
        
      </div>
    )}
    </>
  )
}
