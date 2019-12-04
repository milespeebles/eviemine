import * as functions from 'firebase-functions'

const foo = functions.https.onRequest (
  (request, response) => response.send ('foo')
)

export default foo
