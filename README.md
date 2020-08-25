## Back-end
- TypeScript
- Node (Express)
- Mongo (mongoose)
- Graphql

## Front-end
-  <i>front-end doesnt work yet :(</i>


## How to
Create and fill **.env** as **.env.example**

Start mongo in docker container
```sh
docker-compose up -d --build
```

Move to back-end dir
```sh
cd back-end
``` 

Create and fill **.env** as **.env.example**

Start back-end
```
npm i && npm run build && npm run start
```

## Docs
### Get your user
```sh
{
  me {
    login {login pass email{value verified} phone{value}}
  }
}
```

### Create user
```sh
mutation {
  createUser(
    login: "username_value"
    pass: "pass_value"
    email: "email_value@domain.zone"
  )
}
```

### Authenticate user
```sh
mutation {
  authUser(entry:"login | email | phone" pass:"pass_value | recovery_pass")
}
```

### Log out user
*Need being logged in!*
```sh
mutation {
  invalidateTokens
}
```

### Create verify user token
*Need being logged in!*
```sh
mutation {
  createMailTokens
}
```

### Verify user by token
*You dont need to be logged in!*
```sh
mutation {
  verifyByMail(token:"token_value")
}
```

### Password recovery
*You dont need to be logged in!*
```sh
mutation {
  passRecovery(email:"email_value@domain.zone")
}
```

### Add dairy sheet
*Surprise, you need being logged in :)*
```sh
mutation {
  addDairySheet(
    date: "date_to_iso_string_format"
    pressureUp: int
    pressureDown: int 
    glucose: float 
    weight: float
  )
}
```
