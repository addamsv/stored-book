# SIMPLE VERCEL NODEJS SERVER

</br>

# DEPLOY:

https://mock-server-gules.vercel.app/api/v1/books/

</br>

# INSTALL:

## обязательно создать файлик .env

```bash
IS_PROD=false

SMTP_USER=mail@gmail.com
SMTP_PASS=upjq
MAIL_TO=receivemail@mail.ru

SHOP_SECRET_KEY=test_1
SHOP_ID=10

SECRET_KEY=L16wsS
DB_NAME=sb-data
DATABASE_URL=postgres://postgres:@localhost:5432/postgres
```

## ЗАПУСК:

```bash
# launch the nodemon server
npm start

# launch the original server
npm run server

# build the server for prod
npm run build

# deploy the server to vercel
npm run deploy
```

<br>

## ДЕПЛОЙ ПРИЛОЖЕНИЯ НА VERCEL:

```bash
# build the server for prod
npm run build

# deploy to the vercel
npm run deploy
```

<a href=".github/VERCEL_DEPLOY.md">see more...</a>

<br />

## РЕАЛИЗОВАННЫЕ ФИЧИ:

- Basic Auth
- JWT Auth
- Roles
- ...

<br /><br />

## ЭНДПОИНТЫ:

<br />

### USERS API CRUD:

OAUTH2 JWT API

<!-- <details> -->
  <summary> POST Authentication of user by login and password </summary>

```bash
  curl -X POST localhost:8000/api/v1/users/login -u user:123 -v
```

получить токен через браузер:

```html
<script>
  fetch("http://localhost:8000/api/v1/users/login", {
    method: "POST",
    headers: {
      Authorization: "Basic " + btoa("Sergey:Sergey"),
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
</script>
```

RESP 200:

```json
{
  "isSuccess": true,
  "statusCode": 200,
  "message": "Login user info and JWT",
  "data": {
    "user": {
      "id": 1,
      "iat": "01-12-25",
      "name": "admin",
      "roles": "ROLE_ADMIN",
      "enabled": true
    },
    "token": "eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJzZWxmIiwic3ViIjoiYWRtaW4iLCJleHAiOjE3NDc1NTg4MTMsImlhdCI6MTc0NzU1NTIxMywiYXV0aG9yaXRpZXMiOiJST0xFX0FETUlOIn0=.991b4db01922388e3faeed030375880d8155b9874f8224137323ea1eae3c4214",
    "avatar": "/images/img.jpg"
  }
}
```

<!-- </details> -->

<br>

## PROFILES API CRUD:

<!-- <details> -->
  <summary> GET PROFILE BY ID </summary>

- GET /api/v1/profiles/{profileId}

require: auth

```bash
  curl -X GET http://localhost:8000/api/v1/profiles/1 -H "Content-Type: application/json" -H "Accept: application/json" -H "Authorization: Bearer eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJzZWxmIiwic3ViIjoiYWRtaW4iLCJleHAiOjE3NDc1NTg4MTMsImlhdCI6MTc0NzU1NTIxMywiYXV0aG9yaXRpZXMiOiJST0xFX0FETUlOIn0=.991b4db01922388e3faeed030375880d8155b9874f8224137323ea1eae3c4214" -v
```

RESPONSE 200:

```json
{
  "isSuccess": true,
  "statusCode": 200,
  "message": "Profile info for User: 1",
  "data": {
    "id": 1,
    "owner": 1,
    "firstname": "John",
    "lastname": "Smith",
    "age": 21,
    "country": "Belarus",
    "city": "Minsk",
    "address": "Chyrlenisa 14-22",
    "image": "/images/img.jpg",
    "currency": "BYN"
  }
}
```

<!-- </details> -->
<br>

<!-- <details> -->
  <summary> UPDATE PROFILE BY ID </summary>

- PUT /api/v1/profiles/{profileId}

require auth & body:

```json
{ "firstname": "newman" }
```

```bash
  curl -X PUT http://localhost:8000/api/v1/profiles/1 -d '{"name": "newman"}' -H "Content-Type: application/json" -H "Accept: application/json" -H "Authorization: Bearer eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJzZWxmIiwic3ViIjoiYWRtaW4iLCJleHAiOjE3NDc1NTg4MTMsImlhdCI6MTc0NzU1NTIxMywiYXV0aG9yaXRpZXMiOiJST0xFX0FETUlOIn0=.991b4db01922388e3faeed030375880d8155b9874f8224137323ea1eae3c4214" -v
```

<!-- </details> -->

<br>

## BOOKS API CRUD

<!-- <details> -->
<summary> GET FIRST 10 BOOKS </summary>

- GET /api/v1/books

```bash
  curl -X GET http://localhost:8000/api/v1/books -H "Content-Type: application/json" -H "Accept: application/json" -v
```

RESPONSE 200:

```json
{
  "isSuccess": true,
  "statusCode": 200,
  "message": "All books limit:10, page:1",
  "data": [
    {
      "id": 1,
      "owner": 1,
      "Title": "We Would Never",
      "Series": "",
      "Author": ["Tova Mirvis"],
      "Narrated": ["Rachel F.", "Hirsch"],
      "Translator": [],
      "Language": "English",
      "Format": "Unabridged Audiobook | Podcast | Audio Drama",
      "Publisher": "Recorded Books",
      "Length": "11 hrs and 38 mins",
      "ReleaseDate": "02-11-25",
      "PublicationDate": "02-11-25",
      "link": "https://uploda.sh/link",
      "linkEx": "",
      "img": "https://i.ibb.co/7tYwctKy/91-Q2r-Xd5ft-L-SL1500.jpg",
      "views": 101,
      "Genres": ["Literature & Fiction"],
      "blocks": [
        {
          "id": "1",
          "type": "TEXT",
          "title": "",
          "paragraphs": [
            "Blake Porter is riding high, until he's not. Fired abruptly from his job as a VP of marketing and unable to make the mortgage payments on the new brownstone he shares with his fiancée, he's desperate to make ends meet."
          ]
        }
      ]
    }
  ]
}
```

<!-- </details> -->

<!-- <details> -->
<summary> GET BOOK BY ID </summary>

- GET /api/v1/books/{id}

```bash
  curl -X GET http://localhost:8000/api/v1/books/1 -H "Content-Type: application/json" -H "Accept: application/json" -v
```

<!-- </details> -->

<br>

## COMMENTS API CRUD

<!-- <details> -->
<summary> GET COMMENT BY BOOK ID </summary>

- GET /api/v1/comments/{bookId}

```bash
  curl -X GET http://localhost:8000/api/v1/comments/1 -H "Content-Type: application/json" -H "Accept: application/json" -v
```

<!-- </details> -->

<!-- <details> -->
<summary> CREATE A COMMENT </summary>

- POST /api/v1/comments

require auth & body:

```json
{ "bookId": "1", "text": "new comment" }
```

```bash
  curl -X POST http://localhost:8000/api/v1/comments -d '{"bookId": "1", "text": "new comment"}' -H "Content-Type: application/json" -H "Accept: application/json" -H "Authorization: Bearer eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJzZWxmIiwic3ViIjoiYWRtaW4iLCJleHAiOjE3NDc1NTg4MTMsImlhdCI6MTc0NzU1NTIxMywiYXV0aG9yaXRpZXMiOiJST0xFX0FETUlOIn0=.991b4db01922388e3faeed030375880d8155b9874f8224137323ea1eae3c4214 -v
```

<!-- </details> -->

<!-- <details> -->
<summary> HELP API </summary>

- GET /api/v1/helpSteps

```bash
  curl -X GET http://localhost:8000/api/v1/helpSteps -H "Content-Type: application/json" -H "Accept: application/json" -v
```

RESPONSE 200:

```json
{
  "isSuccess": true,
  "statusCode": 200,
  "message": "Help Steps",
  "data": [
    {
      "id": 1,
      "link": "/helpImages/step_1.jpg",
      "title": "step 1",
      "description": ""
    },
    {
      "id": 2,
      "link": "/helpImages/step_2.jpg",
      "title": "step 2",
      "description": ""
    },
    {
      "id": 3,
      "link": "/helpImages/step_3.jpg",
      "title": "step 3",
      "description": ""
    },
    {
      "id": 4,
      "link": "/helpImages/step_4.jpg",
      "title": "step 4",
      "description": ""
    },
    {
      "id": 5,
      "link": "/helpImages/step_5.jpg",
      "title": "step 5",
      "description": ""
    },
    {
      "id": 6,
      "link": "/helpImages/step_6.jpg",
      "title": "step 6",
      "description": ""
    },
    {
      "id": 7,
      "link": "/helpImages/step_7.jpg",
      "title": "step 7",
      "description": ""
    },
    {
      "id": 8,
      "link": "/helpImages/step_8.jpg",
      "title": "step 8",
      "description": ""
    },
    {
      "id": 9,
      "link": "/helpImages/step_9.jpg",
      "title": "step 9",
      "description": ""
    },
    {
      "id": 10,
      "link": "/helpImages/step_10.jpg",
      "title": "step 10",
      "description": ""
    },
    {
      "id": 11,
      "link": "/helpImages/step_11.jpg",
      "title": "step 11",
      "description": ""
    }
  ]
}
```

<!-- </details> -->

<br>

## PRODUCTS API CRUD

<!-- <details> -->
<summary> GET FIRST 10 GOODS </summary>

- GET /api/v1/products

```bash
  curl -X GET http://localhost:8000/api/v1/products -H "Content-Type: application/json" -H "Accept: application/json" -v
```

<!-- </details> -->

<br>

<!-- <details> -->
<summary> GET PRODUCT BY ID </summary>

- GET /api/v1/products

```bash
  curl -X GET http://localhost:8000/api/v1/products/1 -H "Content-Type: application/json" -H "Accept: application/json" -v
```

<!-- </details> -->

<br>

<!-- <details> -->
<summary> MAKE </summary>

- POST /api/v1/pay

```bash
  curl -X POST http://localhost:8000/api/v1/pay -H "Content-Type: application/json" -H "Accept: application/json" -v
```

<!-- </details> -->
<br>

<!-- <details> -->
<summary> MAIL </summary>

- POST /api/v1/mail

```bash
  curl -X POST http://localhost:8000/api/v1/mail -H "Content-Type: application/json" -H "Accept: application/json" -v
```

<!-- </details> -->
