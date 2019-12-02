const jjv = require("jjv")
const firebase = require("firebase-admin")

/**
 * Check if the given string v is a valid
 * doc path.
 *
 * @param {String} v - The string to check.
 * @returns {Boolean} - If the string is doc path.
 */
const isDocPath = (v) => (
  (v || {}).constructor === String
  && v.split(/\//g).length % 2 === 0
  && firestore.doc(v)
)

/**
 * Load fsjjv instance.
 *
 * @param {object} options - Options.
 * @param {string} options.serviceAccount - Firestore service account path.
 * @param {string} options.projectId - Project ID name.
 * @param {string} options.schemaPath - Path to schema.
 * @returns {jjv}
 */
module.exports = (options) => {

  // Init firestore app
  const sa = require(options.serviceAccount)
  firebase.initializeApp({
    credential: firebase.credential.cert(sa),
    databaseURL: `https://${options.projectId}.firebaseio.com`
  })
  const firestore = firebase.firestore()

  // Create new JJV env
  const env = jjv()

  // Set defaults
  env.defaultOptions.useCoerce = true
  env.defaultOptions.useDefault = true
  env.defaultOptions.checkRequired = true
  env.defaultOptions.removeAdditional = true

  // Add date type
  env.addType("Date", (v) => ((v || {}).constructor === Date))

  // Define DocumentReference type
  env.addType("DocumentReference", (v) => ((v || {}).constructor === firebase.firestore.DocumentReference || isDocPath(v)))

  // Convert all valid document path into document references
  env.addTypeCoercion("DocumentReference", (v) => {
    return ((v || {}).constructor.name === "DocumentReference") ?
      (v) : (firestore.doc(v))
  })

  // Register schemas
  const schemas = require(options.schemaPath)
  for (let [name, schema] of Object.entries(schemas)) {
    env.addSchema(name, schema)
  }

  return env
}