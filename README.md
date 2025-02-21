# STORED AUDIO BOOKS

## Страница доступного списка книг

(только для авторизированных пользователей)

<img src="./.github/projectDescription/images/bookList.png" width="104px">

## Страницы профиля пользователя и о книге подробнее с комментариями

(только для авторизированных пользователей)

<img src="./.github/projectDescription/images/userProfile.png" width="104px"><img src="./.github/projectDescription/images/bookDescription.png" width="104px">

## Basic и JSON Web Token аутентификация

<img src="./.github/projectDescription/images/basicAuth.png" width="104px">

## Различные темы и интернационализация (RU, EN)

<img src="./.github/projectDescription/images/darkBlue.png" width="104px"><img src="./.github/projectDescription/images/dark.png" width="104px"><img src="./.github/projectDescription/images/lightBlue.png" width="104px">

<br><br>

# Технологический стек FRONT:

Typescript, React, Redux Toolkit, Thunk (async), Webpack, FSD;
<br>
jest, integration, ui, screenshot tests, ts lint, style lint; Storybook;

# Технологический стек BACK:

Dev: Nodejs json-mock-server (смотри папку mock-server)
<br>
Prod: Java Spring Boot + (H2 | postgresql | mysql...) (смотри sb-lab-api repo)

<br>

# Install APP

### разрабатывалось с node version: v16.14.0

clone the repo then (sudo)

```bash
npm install
```

build storybook: (sudo)

```bash
npm run sb:build
```

в node_modules/entities удалил поля "module" и "exports" и всё заработало

# Запуск App:

```bash
npm start
```

# Запуск Mock-Server:

#### и просматривать его изменения в папке ./mock-server/db.json

```bash
npm run server
```

# Запуск Storybook:

```bash
npm run sb
```

# ТEST:

```bash
npm run lint
npm run stylelint
npm run test
```

# Loki (screenshot test):

### убедиться, что Docker и Storybook запущен и подключен инет

```bash
npm run loki
```

### если всё устраивает:

```bash
npm run loki:ok
```
