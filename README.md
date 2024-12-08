разрабатывалось с node version: v16.14.0

# Install

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
npm run eslint
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
