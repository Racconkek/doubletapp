# Doubletapp Тестовое задание

Single Page Application для работы со списком студентов: добавлением, удалением, получением.
В основе [Express.js](https://expressjs.com/),
 [React](https://reactjs.org/) и база данных [MongoDB](https://www.mongodb.com/), 
 а само приложение в облаке [Heroku](https://www.heroku.com/) - [Students](https://doubletapp-students.herokuapp.com/).

### Развёртывание

Устанавливаем Heroku по [инструкции](https://devcenter.heroku.com/articles/heroku-cli), затем авторизуемся и создаём приложение:
```sh
npm run heroku-init
```

Собираем React-приложение в директорию `dist`:
```sh
npm run build
```

Далее размещаем приложение:
```sh
npm run heroku
```

В дальнейшем всё это можно выполнить одной командой:
```sh
npm run deploy
```

### Доступные команды

| Команда | Действие |
| ------------- | ------------- |
| build | Сборка приложения |
| build:client | Сборка React-файлов в бандл |
| build:server | Копирование сервера в dist/ |
| dev:build:client | Сборка React-файлов в бандл в режиме разработки |
| dev:build:server | Копирование сервера в dist/ |
| dev | Запуск приложения в режиме разработки |
| lint | Запуск всех проверок |
| lint:css | Проверка css файлов на codestyle |
| lint:js | Проверка JS файлов на codestyle |
| lint:jsx | Проверка JSX файлов на codestyle |
| deps:all | Установка всех зависимостей |
| deps:production | Установка зависимостей, ноебходимых только для работы приложения |
| docker:build | Локальная сборка Docker-образа |
| docker:run | Локальный запуск контейнера с приложением |
| heroku-init | Создание приложения в Heroku |
| heroku:login | Авторизация в Heroku |
| heroku:push | Сборка и отправка образа в Heroku |
| heroku:release | Запуск контейнера с приложением в Heroku |
| heroku:open | Открытие браузера с приложением в Heroku |
| heroku:logs | Просмотр логов приложения в Heroku |
| heroku | Деплой приложения в Heroku |
| start | Старт приложения |
| deploy | Сборка приложения, деплой приложения в Heroku |

### Документация для API

