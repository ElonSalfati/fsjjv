# FSJJV

FSJJV is an extention of JJV designed to support DocumentReferences from firestore.

### Installation
```shell
npm install git+https://github.com/ElonSalfati/fsjjv.git
```

### Usage
```javascript
// Init fsjjv validator
const validator = fsjjv({ schemaPath: "/path/to/json/schema.json" })

// Validation of schema
validator.validate("schema_name", { "object": "to_test" })
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
