const makeCityDB = require('./city-db')
const citySchemaModel = require('../../schema-models/city-schema')
function getCityDBProperties (mongoose, logger) {
  var citySchema = new mongoose.Schema(citySchemaModel)

  const CityModel = mongoose.model('cities', citySchema, 'cities')
  return makeCityDB({ CityModel }, logger)
}

module.exports = getCityDBProperties
