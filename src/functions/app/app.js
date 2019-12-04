import * as functions from 'firebase-functions'
import next from 'next'
import fs from 'fs'

const dev = process.env.NODE_ENV !== 'production'
const distDir = fs.existsSync ('next') ? 'next' : 'dist/functions/next'
const appConfig = {
  dev,
  conf: { distDir },
}

const app = next (appConfig)
const handle = app.getRequestHandler ()

const nextApp = functions.https.onRequest (
  (request, response) => app.prepare ()
    .then (() => handle (request, response))
)

export { nextApp }
