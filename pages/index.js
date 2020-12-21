import Head from 'next/head'
import Layout from '../components/Layout'
import Keep from '../components/Keep'

export default function Index() {
  return (
    <Layout>
      <div className="container-lg py-3">
        <div className="row">
          <div className="col">
            <Keep />
          </div>
        </div>
      </div>
    </Layout>
  )
}
