import { useState, useEffect } from 'react'

export default function KeepForm(props) {
  const [keepHandle, setKeepHandle] = useState('')
  const [slugHandle, setSlugHandle] = useState('')
  const [noteHandle, setNoteHandle] = useState('')
  const [tagsHandle, setTagsHandle] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    if (keepHandle.trim().length === 0) {
      alert('Please provide a valid keep handle!')
      return
    }
    setSubmitting(true)
    const data = {
      keep: keepHandle.trim(),
      slug: slugHandle.trim(),
      note: noteHandle.trim(),
      tags: tagsHandle.trim()
    }
    props.onCreate(data, event)
    setKeepHandle('')
    setSlugHandle('')
    setNoteHandle('')
    setSubmitting(false)
    return
  }

  function handleKeepChange(event) {
    setKeepHandle(event.target.value)
  }
  function handleSlugChange(event) {
    setSlugHandle(event.target.value)
  }
  function handleNoteChange(event) {
    setNoteHandle(event.target.value)
  }
  function handleTagsChange(event) {
    setTagsHandle(event.target.value)
  }

  function resetHandle(event) {
    event.preventDefault()
    setKeepHandle('')
    setSlugHandle('')
    setNoteHandle('')
    setTagsHandle('')
    return
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset
          disabled={submitting && 'disabled'}
        >
          <legend>Keep Your Bookmark!</legend>
          <div className="form-group">
            <label htmlFor="handleKeep">주소</label>
            <input
              type="text"
              name="keep"
              placeholder="http:// or https://"
              onChange={handleKeepChange}
              value={keepHandle}
              className="form-control"
              id="handleKeep"
              required
            />
          </div>

          <div className="form-group">
            <label>제목</label>
            <input
              type="text"
              name="slug"
              placeholder=""
              onChange={handleSlugChange}
              value={slugHandle}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label>메모</label>
            <textarea
              rows="5"
              cols="50"
              name="note"
              placeholder=""
              onChange={handleNoteChange}
              value={noteHandle}
              className="form-control"
            />
          </div>

          <div>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Keep Your Bookmark!
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary ml-3"
              onClick={resetHandle}
            >
              Reset
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  )
}
