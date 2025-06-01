![GitHub tag check runs](https://img.shields.io/github/check-runs/addamsv/stored-book/dev-front)
![Netlify](https://img.shields.io/netlify/ea40207c-2101-4923-bb84-1b6983cf3cfd)

# STORED AUDIO BOOKS

ссылки на аудиокниги на английском языке
<br><br>

## Пример Опубликован:

https://stored-books.netlify.app/

<img src="./.github/projectDescription/images/app.png">

<br><br>

## доступно в Google:

<img src="./.github/projectDescription/images/SearchEngineGoogle.png">

## проиндексировано несмотря на то, что сделано на React

<img src="./.github/projectDescription/images/EmailSearchEngineGoogle.png">

<br><br><br>

# КРАТКО О ПРИЛОЖЕНИИ:

## Есть Progressive Web App (WPA)

<img src="./.github/projectDescription/images/wpa.jpg" width="394px" height="250px">

## Страница доступного списка книг

<img src="./.github/projectDescription/images/bookList.png" width="300px">

## о книге подробнее с комментариями

<img src="./.github/projectDescription/images/bookDescription.png" width="300px">

## Страницы профиля пользователя

(только для авторизированных пользователей)

<img src="./.github/projectDescription/images/userProfile.png" width="300px">

## Basic и JSON Web Token аутентификация

<img src="./.github/projectDescription/images/basicAuth.png" width="300px">

## Различные темы и интернационализация (RU, EN)

<img src="./.github/projectDescription/images/darkBlue.png" width="100px"><img src="./.github/projectDescription/images/dark.png" width="100px"><img src="./.github/projectDescription/images/lightBlue.png" width="100px">

<br><br>

# Технологический стек

## FRONT:

Typescript, React, Thunk (async), RTK query, Webpack, FSD, Redux Toolkit;
<br>
jest, integration, ui, screenshot tests, ts lint, style lint; Storybook;
<br>
CI/CD

## BACK:

Dev: Nodejs json-mock-server (смотри папку mock-server)
<br>
Prod: Java Spring Boot + (H2 | postgresql | mysql...) (смотри sb-lab-api repo)

<br>

# Установка приложения

### разрабатывалось с node version: v16.14.0

clone the repo then (sudo)

```bash
npm install
```

build storybook: (sudo)

```bash
npm run sb:build
```

<!-- в node_modules/entities удалил поля "module" и "exports" и всё заработало -->

# Запуск приложения:

```bash
npm start
```

# Установка и Запуск JSON сервера:

```bash
# clone the repo
git clone --single-branch -b mock-server https://github.com/addamsv/stored-book.git

# install all deps
npm install

# launch the server:
npm start
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
