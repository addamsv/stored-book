# SIMPLE VERCEL NODEJS SERVER

</br>

# DEPLOY:

### API example: get all books:

https://mock-server-gules.vercel.app/api/v1/books/

</br>

# INSTALL:

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

<a href=".github/INSTALL.md">see more...</a>

<br />

## РЕАЛИЗОВАННЫЕ ФИЧИ:

- Basic Auth
- JWT Auth

<br />

## РЕАЛИЗОВАННЫЕ ЭНДПОИНТЫ:

## Auth

- POST /api/v1/users/login

## profiles

- GET /api/v1/profiles/{profileId} (authOnly)
- PUT /api/v1/profiles/{profileId} (authOnly)

## Books

- GET /api/v1/books
- GET /api/v1/books/{id}

## comments

- GET /api/v1/comments/{bookId}
- POST /api/v1/comments
