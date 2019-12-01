# FSJJV

FSJJV is an extention of JJV designed to support DocumentReferences from firestore.

### Installation
```shell
npm install git+https://github.com/ElonSalfati/fsjjv.git
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
