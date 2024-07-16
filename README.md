# server-todo

## API Reference

### Task complements

**GET** 🌐

```bash
https://server-todo-list-app.cleverapps.io/user
```
**RESPONSE** ✅
```json
{
    "category": [
        {
            "Category": "Personal",
            "codeCategory": 1
        },
        {
            "Category": "Health",
            "codeCategory": 2
        },
        {
            "Category": "Education",
            "codeCategory": 3
        },
        {
            "Category": "Work",
            "codeCategory": 4
        },
        {
            "Category": "Others",
            "codeCategory": 5
        }
    ],
    "importance": [
        {
            "Importance": "Low",
            "codeImportance": 1
        },
        {
            "Importance": "Medium",
            "codeImportance": 2
        },
        {
            "Importance": "High",
            "codeImportance": 3
        }
    ],
    "status": [
        {
            "Status": "Pending",
            "codeStatus": 1
        },
        {
            "Status": "In Progress",
            "codeStatus": 2
        },
        {
            "Status": "Completed",
            "codeStatus": 3
        }
    ]
}
```
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
    "tasks": [
                {
                    "id":number,
                    "title": "string"
                    "description": "Otra tarea 2",
                    "Category": "...",
                    "Importance": "...",
                    "Status": "...",
                    "archived": number
                }
            ]
}
```
## Important 🛑🤚🏽
*Please save the token in your browser and for the following requests send it in the request headers*

**POST** 🌐
```hash
  https://server-todo-list-app.cleverapps.io/user/newTask/${id_user}
```

*BODY*
```json
    {
        "title":"Example",
        "description": "Example...",
        "category":2,
        "importance": 1,
        "status":1
        "archived": number
    }
```

**DELETE** 🌐
```hash
https://server-todo-list-app.cleverapps.io/user/deleteTask/${user_ref}
```

**PATCH** 🌐
```hash
https://server-todo-list-app.cleverapps.io/user/updateTask/${id_user}
```
*BODY*
```json
    "id": 1,
    "title":"Title",
    "description": "Description task",
    "category":Number,
    "importance": Number,
    "status":Number
```

**PATCH** 🌐
```hash
https://server-todo-list-app.cleverapps.io/user/arcivedTask/${id_task}
```

**RESPONSE** ✅
```json
    {
    "msg": "Task updated successfully",
    "task": {
        "id": number,
        "title": "...",
        "description": "...",
        "Category": "...",
        "Importance": "...",
        "Status": "...",
        "archived": 1 | 0 
        }
    }
````


**PATCH** 🌐
```hash
https://server-todo-list-app.cleverapps.io/user/modify/${id_user}
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
    "user": {
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
https://server-todo-list-app.cleverapps.io/user/delete/${id_user}
```
**RESPONSE** ✅
```json
  "status": 200
  "msg": "User delete successfully"
```

<hr>


**POST**🌐

```hash
https://server-todo-list-app.cleverapps.io/user/image/${id_user}
```


**RESPONSE** ✅
```json
  "status": 200
  "msg": "Image saved successfully"
```

**RESPONSE** ❌
```json
  "status": 404
  "msg": "User not found"
```

**GET**🌐
```hash
https://server-todo-list-app.cleverapps.io/user/image/${id_user}
```


**RESPONSE** ✅
```json
  "status": 200
  "pathFile": pathFile
```


**RESPONSE** ❌
```json
  "status": 404
  "msg": "Image not found"
```
