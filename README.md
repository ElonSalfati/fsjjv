# FSJJV

FSJJV is an extention of JJV designed to support DocumentReferences from firestore.

### Installation
```shell
npm install git+https://github.com/ElonSalfati/fsjjv.git
```

### Usage
```javascript
import * as firebase from "firebase-admin"
import serviceAccount from "/path/to/service/account.json"

// Initialize firestore application
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: `https://${ process.env.GCLOUD_PROJECT_ID }.firebaseio.com`
})

const firestore = firebase.firestore()

// Init fsjjv validator
const validator = fsjjv({
  schemaPath: "/path/to/json/schema.json",
  fs: firestore
})

// Validation of schema
const errors = validator.validate("schema_name", { "object": "to_test" })
```

### Options
```javascript
const options = {
  schemaPath: "<path to schema file>"
}
```

### Schema File
```json
{
  "schema_name": {
    // schema
    "type": "object",
    "properties": {
      "example": {
        "type": "string"
      }
    }
  }
}
```
