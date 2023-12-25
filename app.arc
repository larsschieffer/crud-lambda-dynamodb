@app
crud-lambda-dynamodb

@aws
runtime typescript
region eu-central-1
architecture arm64

@plugins
architect/plugin-typescript

@typescript
base-runtime nodejs18.x

@http
get /users
post /users
get /users/:id
put /users/:id
delete /users/:id

@tables
users
  id *String
  name String
