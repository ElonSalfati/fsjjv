const jjv = require("jjv")

/**
 * Check if the given string v is a valid
 * doc path.
 *
 * @param {String} v - The string to check.
 * @param {object} options - Options.
 * @returns {Boolean} - If the string is doc path.
 */
const isDocPath = (v, options) => (
  (v || {}).constructor === String
  && v.split(/\//g).length % 2 === 0
  && options.fs.doc(v)
)

/**
 * Load fsjjv instance.
 *
 * @param {object} options - Options.
 * @param {string} options.fs - Firestore instance.
 * @param {string} options.schemaPath - Path to schema.
 * @returns {jjv}
 */
module.exports = (options) => {

  // Create new JJV env
  const env = jjv()

  // Set defaults
  env.defaultOptions.useCoerce = true
  env.defaultOptions.useDefault = true
  env.defaultOptions.checkRequired = true
  env.defaultOptions.removeAdditional = true

  // Add date type
  env.addType("Date", (v) => (v instanceof Date && !isNaN(v))

  // Convert string date to date
  env.addTypeCoercion("Date", (v) => new Date(v))

  // Define DocumentReference type
  env.addType("DocumentReference", (v) => ((v || {}).constructor.name === "DocumentReference" || isDocPath(v, options)))

  // Convert all valid document path into document references
  env.addTypeCoercion("DocumentReference", (v) => {
    return ((v || {}).constructor.name === "DocumentReference") ?
      (v) : (options.fs.doc(v))
  })

  // Register schemas
  const schemas = require(options.schemaPath)
  for (let [name, schema] of Object.entries(schemas)) {
    env.addSchema(name, schema)
  }

  return env
}