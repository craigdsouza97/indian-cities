async function notFound (httpResponse) {
  return {
    headers: {
      'Content-Type': 'application/json'
    },
    body: { error: 'Not found.' },
    statusCode: 404
  }
}
module.exports = notFound
