# MOCK-JSON-SERVER

- Basic Auth
- JWT Auth

```bash
# launch the server
npm run server
```

<br />

<h2>Auth</h2>
<details>
  <summary> POST /users/login </summary>
  POST /api/v1/users/login
</details>

<h2>profiles</h2>
<details>
  <summary> GET /profiles/{profileId} (authOnly) </summary>
  GET /api/v1/profiles/{profileId}
</details>

<details>
  <summary> PUT /profiles/{profileId} (authOnly) </summary>
  PUT /api/v1/profiles/{profileId}
</details>

<h2>Books</h2>
<details>
  <summary> GET /books (NOT_authOnly) </summary>
  GET /api/v1/books
</details>

<details>
  <summary> GET /books/{id} (NOT_authOnly) </summary>
  GET /api/v1/books/{id}
</details>

<h2>comments</h2>
<details>
  <summary> GET /comments/{bookId} (NOT_authOnly) </summary>
  GET /api/v1/comments/{bookId}
</details>

<details>
  <summary> POST /comments (NOT_authOnly) </summary>
  POST /api/v1/comments
</details>

<br />

<details>
<summary> launch the server </summary>

</details>
