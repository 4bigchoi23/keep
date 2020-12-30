import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/client'
import faunadb, { query as q } from "faunadb"
import Settings from '../../components/Settings'
import Crypto from '../../lib/cryptoHelper'

export default function SettingsSecurity() {
  const page = 'security'
  const pageName = page.substr(0, 1).toUpperCase() + page.substr(1)
  const client = new faunadb.Client({ secret: process.env.NEXT_PUBLIC_FAUNADB_SECRET });

  const [ session, loading ] = useSession()
  const user = session && session.user ? session.user : process.env.guest
  const id = user && user.id ? user.id : ''
  const name = user && user.name ? user.name : process.env.sneak?.name
  const email = user && user.email ? user.email : process.env.sneak?.email
  const image = user && user.image ? user.image : process.env.sneak?.image
  const username = user && user.username ? user.username : ''
  const password = user && user.password ? user.password : ''
  const passsalt = user && user.passsalt ? user.passsalt : ''
  const user_old_password = ''
  const user_new_password = ''
  const user_cfm_password = ''
  const passwordMinLength = 8

  const inputs = {
    password,
    passsalt,
    user_old_password,
    user_new_password,
    user_cfm_password,
  }

  const [protos, setProtos] = useState(inputs)
  const [values, setValues] = useState(inputs)
  const [errors, setErrors] = useState({})
  const [valids, setValids] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [vitalizing, setVitalizing] = useState(false)

  var timer
  const handleChange = (event) => {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
  }

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitting(true)

    clearTimeout(timer)
    timer = setTimeout(() => {
      // 기존 비밀번호 체크
      let chkPass = false
      if (!values.password) {
        chkPass = true
      } else {
        const enc = Crypto.getPass(values.user_old_password, values.passsalt)
        if (values.password === enc) {
          chkPass = true
        }
      }

      if (chkPass) {
        // 비밀번호 업데이트
        const newPass = Crypto.genPass(values.user_new_password)
        client.query(
          q.Update(
            q.Select([0], q.Paginate(q.Match(q.Index("index_users_id"), id))),
            {
              data: {
                password: newPass.pass,
                passsalt: newPass.salt,
              }
            }
          )
        )
        .then((res) => {
          // console.log(res)
          const i = {
            password: newPass.pass,
            passsalt: newPass.salt,
            user_old_password: '',
            user_new_password: '',
            user_cfm_password: '',
          }
          setValues(i)
          setProtos(i)
          setValids({})
          setErrors({})
          setSubmitting(false)
          setVitalizing(false)
        })
        .catch((err) => {
          console.log(err)
          alert('🤷‍♀️')
        })
      } else {
        // 기존 비밀번호가 일치하지 않습니다.
        alert('현재 사용하시는 비밀번호를 올바로 입력하세요!')
        setSubmitting(false)
      }
    }, 100)
  }

  useEffect(() => {
    setValues(inputs)
    setProtos(inputs)
  }, [loading])

  useEffect(() => {
    let vit = false
    let val = { newpass: '', confirm: '' }
    let err = { newpass: '', confirm: '' }

    const nb = values.user_new_password.match(/[0-9]/g) || []
    const cl = values.user_new_password.match(/[a-z]/g) || []
    const cu = values.user_new_password.match(/[A-Z]/g) || []

    if (JSON.stringify(protos) !== JSON.stringify(values)) {
      if (values.user_new_password.length < passwordMinLength) {
        vit = false
        val.newpass = 'is-invalid'
        err.newpass = passwordMinLength + '자 이상 입력하세요.'
      } else {
        if (nb.length && cl.length) {
          vit = true
          val.newpass = 'is-valid'
          err.newpass = ''
        } else {
          vit = false
          val.newpass = 'is-invalid'
          err.newpass = '숫자와 영문자가 각각 하나 이상 포함되어야 합니다.'
        }
      }
      if (values.user_new_password === values.user_cfm_password) {
        vit = true
        val.confirm = 'is-valid'
        err.confirm = ''
      } else {
        vit = false
        val.confirm = 'is-invalid'
        err.confirm = '비밀번호 확인이 일치하지 않습니다.'
      }
    }

    setVitalizing(vit)
    setValids({ ...valids, ...val })
    setErrors({ ...errors, ...err })
  }, [values.user_new_password, values.user_cfm_password])

  return (
    <Settings
      page={page}
      pageName={pageName}
    >
      <Head>
        <title>Settings / {pageName}</title>
      </Head>
      <div>
        <h2 className="m-0">{pageName}</h2>
        <div>
          <small>Hi, There!</small>
        </div>
        <hr/>
        <form
          onSubmit={handleSubmit}
          disabled={submitting && true}
          autoComplete="off"
        >
          <div className="form-group">
            <label htmlFor="">Old password</label>
            <input
              type="password"
              name="user_old_password"
              className="form-control"
              value={values.user_old_password}
              onChange={handleChange}
              autoComplete="new-password"
              disabled={submitting || loading || !values.password && true}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">New password</label>
            <input
              type="password"
              name="user_new_password"
              className={`form-control ${valids.newpass}`}
              value={values.user_new_password}
              onChange={handleChange}
              autoComplete="new-password"
              disabled={submitting || loading && true}
            />
            <small className="d-block form-text text-danger">{errors.newpass}</small>
          </div>
          <div className="form-group">
            <label htmlFor="">Confirm new password</label>
            <input
              type="password"
              name="user_cfm_password"
              className={`form-control ${valids.confirm}`}
              value={values.user_cfm_password}
              onChange={handleChange}
              autoComplete="new-password"
              disabled={submitting || loading || values.user_new_password.length < passwordMinLength && true}
            />
            <small className="d-block form-text text-danger">{errors.confirm}</small>
          </div>
          <div className="mt-5">
            <button
              type="submit"
              className="btn btn-success"
              disabled={submitting || loading || !vitalizing && true}
            >
              {submitting && <i className="mr-2 spinner-border spinner-border-sm" role="status"></i>}
              <span>Update password</span>
            </button>
            <button
              type="button"
              className="btn btn-link ml-3"
            >
              <span>I forgot my password</span>
            </button>
          </div>
        </form>
      </div>
    </Settings>
  )
}
