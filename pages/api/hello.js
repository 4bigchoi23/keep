// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
var url = require('url')
const request = require('request')
const cheerio = require('cheerio')
const iconv = require('iconv-lite')
const jschardet = require('jschardet')

export default (req, res) => {
  // res.statusCode = 200
  // res.json({ name: 'John Doe' })

  // Testing...
  // req.query.q = encodeURIComponent('https://nodejs.org/dist/latest-v14.x/docs/api/url.html#url_new_url_input_base')
  // req.query.q = encodeURIComponent('https://developer.mozilla.org/ko/docs/Web/HTTP/CORS')
  // req.query.q = encodeURIComponent('https://getbootstrap.com/docs/4.5/components/forms/')
  // req.query.q = encodeURIComponent('https://movie.naver.com/movie/bi/mi/basic.nhn?code=199393')
  // req.query.q = encodeURIComponent('https://news.naver.com/main/read.nhn?mode=LSD&mid=shm&sid1=102&oid=437&aid=0000255040')
  // req.query.q = encodeURIComponent('https://codeigniter.com/user_guide/intro/index.html')

  if (!req.query.q) {
    res.json({})
    return
  }

  const uri = decodeURIComponent(req.query.q.toString())
  const URI = new URL(uri)
  const fav = `${URI.origin}/favicon.ico`
  request(fav, (err, ret) => {
    const f = (ret.statusCode === 200) ? true : false

    request({ uri, encoding: null }, (_error, response, body) => {
      // res.send(body.toString())
      const char = jschardet.detect(body)
      const html = iconv.decode(body, char.encoding).toString()
      const $ = cheerio.load(html)
      const title = $('title').eq(0).text().trim() || ''
      const image = $('meta[property="og:image"]').attr('content') || ''
      const description = $('meta[property="og:description"]').attr('content') || ''

      let icon = ''
      let favicon = ''
      icon = icon ? icon : $('link[rel$="icon"][href*=".ico"]').eq(0).attr('href')
      icon = icon ? icon : $('link[rel$="icon"][href*=".png"]').eq(0).attr('href')
      favicon = icon ? url.resolve(uri, icon) : (f ? fav : '')

      res.json({
        title,
        image,
        description,
        favicon,
      })
    })
  })
}
