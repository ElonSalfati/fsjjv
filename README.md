# FSJJV

FSJJV is an extention of JJV designed to support DocumentReferences from firestore.

Options
```javascript
const options = {
  schemaPath: "<path to schema file>"
}
```

Schema File
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
