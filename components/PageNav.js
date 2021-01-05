import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function PageNav(props) {
  const router = useRouter()
  const [page, setPage] = useState(1)

  // Triggers fetch for new page
  const handlePagination = (page) => {
    if (!page || typeof page !== 'number' || page < 1) {
      return
    }
    const path = router.pathname
    const query = router.query
    query.page = page < 1 ? 1 : page
    setPage(query.page)
    router.push({
      pathname: path,
      query: query,
    })
  }

  useEffect(() => {
    const path = router.pathname
    const query = router.query
    let p = parseInt(router.query?.page) || 1
    if (p < 1) {
      p = 1
      router.push({
        pathname: path,
        query: { ...query, page: p },
      })
    }
    setPage(p)
  })

  const itemCount = props.itemCount || 15; // 페이지당 목록 수
  const totalItem = props.totalItem || 0; // 전체 목록 수
  const totalPage = Math.ceil(totalItem / itemCount) || 1; // 전체 페이지 수

  if (totalItem <= 0) {
    return null
  }

  let pageCount = props.pageCount || 5; // 페이지 수
  let startPage = ( ( Math.floor( (page - 1) / pageCount ) ) * pageCount ) + 1
  let endPage = startPage + pageCount - 1
  if (endPage >= totalPage) {
    endPage = totalPage
    pageCount = totalPage
  }

  const numbers = [...Array(pageCount).keys()].map(i => i + startPage)
  const pageItems = numbers.map((number) =>
    <li className={`page-item ${page === number ? 'active' : ''}`} key={number}>
      <a
        className="page-link cursor-pointer"
        onClick={() => handlePagination(number)}
      >{number}</a>
    </li>
  )

  return (
    <ul className="pagination justify-content-center">
      <li className="page-item">
        <a
          className="page-link cursor-pointer"
          onClick={() => handlePagination(page === 1 ? null : 1)}
        >
          <i className="fa fa-fw fa-angle-double-left" aria-hidden="true"></i>
          <span className="sr-only">First</span>
        </a>
      </li>
      <li className="page-item">
        <a
          className="page-link cursor-pointer"
          onClick={() => handlePagination(startPage <= 1 ? null : startPage - 1)}
        >
          <i className="fa fa-fw fa-angle-left" aria-hidden="true"></i>
          <span className="sr-only">Prev</span>
        </a>
      </li>

      {pageItems}

      <li className="page-item">
        <a
          className="page-link cursor-pointer"
          onClick={() => handlePagination(endPage >= totalPage ? null : endPage + 1)}
        >
          <i className="fa fa-fw fa-angle-right" aria-hidden="true"></i>
          <span className="sr-only">Next</span>
        </a>
      </li>
      <li className="page-item">
        <a
          className="page-link cursor-pointer"
          onClick={() => handlePagination(page === totalPage ? null : totalPage)}
        >
          <i className="fa fa-fw fa-angle-double-right" aria-hidden="true"></i>
          <span className="sr-only">Last</span>
        </a>
      </li>
    </ul>
  )
}
