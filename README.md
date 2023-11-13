# server-todo

## API Reference

### User registration 

**POST** 🌐

```bash
https://server-todo-list-app.cleverapps.io/user/register
```
*BODY*
```json
{
    "name": "Your name",
    "lastName": "Your lastName",
    "password": "MinimumEightCharacters",
    "email": "youremail@example.com",
    "location": "OptionalData"
}
```
**RESPONSE** ✅
```json
{
    "status": 200
    "resultCreated": {
        "id": 2,
        "name": "Your name",
        "lastName": "Your lastName",
        "password": "encrypted_password",
        "email": "youremail@example.com",
        "user_id": "Crypto: randomUUID()",
        "location": "Location" ?? null,
        "updatedAt": "updatedAt",
        "createdAt": "createdAtZ"
    },
    "token": "Access_token"
}
```

### User Login

**POST** 🌐

```bash
https://server-todo-list-app.cleverapps.io/user/login
```
*BODY*
```json
{
    "email": "youremail@example.com",
    "password": "MinimumEightCharacters"
}
```

**RESPONSE** ✅
```json
{
     "status": 200
    "dataUser": {
        "id": 2,
        "name": "Your name",
        "lastName": "Your lastName",
        "password": "encrypted_password",
        "email": "youremail@example.com",
        "user_id": "Crypto: randomUUID()",
        "location": "Location" ?? null,
        "updatedAt": "updatedAt",
        "createdAt": "createdAtZ"
    },
    "token": "Access_token"
    "tasks": []
}
```
## Important 🛑🤚🏽
*Please save the token in your browser and for the following requests send it in the request headers*

**POST** 🌐
```hash
  https://server-todo-list-app.cleverapps.io/user/newTask/${idUser}
```

*BODY*
{
    "title":"Example",
    "description": "Example...",
    "category":2,
    "importance": 1,
    "status":1
}

**DELETE** 🌐
```hash
https://server-todo-list-app.cleverapps.io/user/deleteTask/${idTask}
```

**PATCH** 🌐
```hash
https://server-todo-list-app.cleverapps.io/user/updateTask/${iduser}
```
*BODY*
```json
    "id": 2,
    "title":"Title",
    "description": "Description task",
    "category":Number,
    "importance": Number,
    "status":Number
```

**PATCH** 🌐
```hash
https://server-todo-list-app.cleverapps.io/user/modify/${idUser}
```
*BODY*
```json
{
    "name": "Name",
    "lastName": "LastName",
    "password": "password",
    "newPassword": "NewPassword",
    "email": "example@example.com",
    "location": "Barcelona" ?? null
}
```
**RESPONSE** ✅
```json
{
    "status": 200
    "dataUser": {
        "id": 2,
        "name": "Your name",
        "lastName": "Your lastName",
        "password": "encrypted_password",
        "email": "youremail@example.com",
        "user_id": "Crypto: randomUUID()",
        "location": "Location" ?? null,
        "updatedAt": "updatedAt",
        "createdAt": "createdAtZ"
    },
    "token": "Access_token"
    "tasks": []
}
```

**DELETE** 🌐
```hash
https://server-todo-list-app.cleverapps.io/user/delete/${idUser}
```
**RESPONSE** ✅
```json
  "status": 200
  "msg": "User delete successfully"
```
