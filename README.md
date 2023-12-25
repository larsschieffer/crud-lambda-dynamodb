# A template to build a serverless layered architecture
> **Hint:** Not to be confused with AWS Lambda layers

A small template project to set up AWS API Gateway, AWS Lambda & AWS DynamoDB project using a layered architecture with separation of concerns.

## Installation
```shell
$ pnpm install
```

## Local Development
The following command will start an in memory [Dynalite (DynamoDB)](https://github.com/architect/dynalite) database on port 5555. And all the defined lambda functions on port 3333.
```shell
$ pnpm run start

> crud-lambda-dynamodb@0.0.0 start /Users/lars/Projects/crud-lambda-dynamodb
> arc sandbox

         App ⌁ crud-lambda-dynamodb
      Region ⌁ eu-central-1
     Profile ⌁ default
     Version ⌁ Architect 10.16.3

✓ Sandbox @tables created in local database
✓ Sandbox @http (HTTP API mode / Lambda proxy v2.0 format / live reload) routes
    get /users/:id ........................ src/http/get-users-000id
    get /users ............................ src/http/get-users
    get /* ................................ public/
   post /users ............................ src/http/post-users
    put /users/:id ........................ src/http/put-users-000id
 delete /users/:id ........................ src/http/delete-users-000id

    http://localhost:3333

✓ Sandbox Started in 28ms
❤︎ Local environment ready!

⚬ Sandbox Running 1 Sandbox startup plugin
Compiling TypeScript
Compiled project in 0.456s
✓ Sandbox Ran Sandbox startup plugin in 456ms
✓ Sandbox Seeded 1 table with 1 row from sandbox-seed.json in 5ms
✓ Sandbox File watcher now looking for project changes
```

## Example Requests
The following requests are performed with the help of the [HTTPie](https://httpie.io/) package.
### Get all users
```shell
$ http GET http://localhost:3333/users
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 65
Keep-Alive: timeout=5
content-type: application/json

[
    {
        "id": "f763c471-aba3-413a-a0fb-186b11651b39",
        "name": "TestUser"
    }
]
```
### Get user
```shell
$ http GET http://localhost:3333/users/f763c471-aba3-413a-a0fb-186b11651b39
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 63
Keep-Alive: timeout=5
content-type: application/json

{
    "id": "f763c471-aba3-413a-a0fb-186b11651b39",
    "name": "TestUser"
}
```

### Create user
```shell
$ http POST localhost:3333/users name="My awesome name"
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 70
Keep-Alive: timeout=5
content-type: application/json

{
    "id": "47b30aa4-e2be-4962-acad-d3c68f62e244",
    "name": "My awesome name"
}
```

### Update user
```shell
$ http PUT localhost:3333/users/47b30aa4-e2be-4962-acad-d3c68f62e244 name='My cool name' id='47b30aa4-e2be-4962-acad-d3c68f62e244'
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 67
Keep-Alive: timeout=5
content-type: application/json

{
    "id": "47b30aa4-e2be-4962-acad-d3c68f62e244",
    "name": "My cool name"
}

```

### Delete user
```shell
$ http DELETE http://localhost:3333/users/47b30aa4-e2be-4962-acad-d3c68f62e244
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 36
Keep-Alive: timeout=5
content-type: application/json

47b30aa4-e2be-4962-acad-d3c68f62e244
```

## Tests
```shell
$ pnpm run test

> crud-lambda-dynamodb@0.0.0 test
> jest --runInBand --silent

 PASS  src/shared/user/user-service.test.ts
 PASS  src/shared/user/user-repository.test.ts
 PASS  src/shared/common/error.test.ts

Test Suites: 3 passed, 3 total
Tests:       14 passed, 14 total
Snapshots:   0 total
Time:        4.324 s, estimated 5 s
```
