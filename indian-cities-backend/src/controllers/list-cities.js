function makeListCities (listCitiesFromDB, logger) {
  return async function listCities (httpRequest) {
    try {
      logger.info('In List Cities Controller')

      const page = httpRequest.query.page === undefined ? 1 : httpRequest.query.page
      var startIndex = (parseInt(page) - 1) * parseInt(process.env.QUERY_LIMIT)
      const result = await listCitiesFromDB(startIndex, parseInt(process.env.QUERY_LIMIT))
      const pageDetail = {}
      pageDetail.startPage = page < 3 ? 1 : parseInt(page) - 2
      pageDetail.endPage = pageDetail.startPage + 5 <= result.totalPages ? pageDetail.startPage + 5 : result.totalPages
      pageDetail.skipAhead = result.totalPages - page > 5
      pageDetail.skipBehind = page > 5

      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 201,
        body: { result, ...pageDetail }
      }
    } catch (e) {
      logger.warn(e.message)
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 400,
        body: {
          error: e.message
        }
      }
    }
  }
}
module.exports = makeListCities
