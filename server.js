/* eslint-disable
    @typescript-eslint/no-var-requires,
    @typescript-eslint/explicit-function-return-type
*/
const { createServer } = require('https')
const { parse } = require('url')
const { readFileSync } = require('fs')
const next = require('next')
const os = require('os')
const iFaces = os.networkInterfaces()

const port = 3333
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

let localIP = ''

const httpsOptions = {
  key: readFileSync('./certificates/localserver-key.pem'),
  cert: readFileSync('./certificates/localserver.pem'),
}

Object.keys(iFaces).forEach(function (iFrame) {
  let alias = 0
  iFaces[iFrame].forEach(function (iFace) {
    if ('IPv4' !== iFace.family || iFace.internal !== false) {
      return
    }
    if (alias >= 1) {
      localIP = iFace.address
    } else {
      localIP = iFace.address
    }
    ++alias
  })
})

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on \u001b[35mhttps://localhost:${port}\u001b[0m`)
    console.log(`> Ready on \u001b[35mhttps://${localIP}:${port}\u001b[0m`)
  })
})
