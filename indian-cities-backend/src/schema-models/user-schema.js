const userSchemaModel = {
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, index: true, unique: true, required: true, trim: true },
  password: { type: String, select: false, required: true }
}
module.exports = userSchemaModel
