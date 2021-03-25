function makeCityDB ({ CityModel }, logger) {
  return Object.freeze({
    listCities
  })

  async function listCities (startIndex, limit) {
    logger.info('Listing cities')
    const [current, totalCount] = await Promise.all([
      CityModel.find({}, { name: 1, state: 1 }).skip(startIndex).limit(limit),
      CityModel.estimatedDocumentCount({ })
    ])
    return {
      totalPages: parseInt(totalCount / limit),
      current
    }
  }
}
module.exports = makeCityDB
