# NOVA — студия дизайна и ремонта

Коммерческий веб-сайт студии дизайна интерьера и ремонта квартир.

Сайт предназначен для презентации услуг, реализованных проектов, отзывов клиентов и получения заявок на дизайн интерьера и ремонт.

Проект включает публичную часть сайта и защищённую административную панель для управления контентом.

---

## 📌 Возможности

### Публичная часть

* Главная страница
* Услуги студии
* Портфолио реализованных проектов
* Детальная страница проекта
* Отзывы клиентов
* Форма заявки
* Адаптивная мобильная версия
* Плавные анимации и hover-эффекты
* Навигация между страницами
* SEO-мета-теги
* `robots.txt`
* `sitemap.xml`
* Favicon
* Open Graph metadata

### Административная панель

* Авторизация администратора
* Защищённые маршруты
* Dashboard
* Управление услугами
* Управление проектами
* Управление отзывами
* Управление заявками
* Создание записей
* Редактирование записей
* Удаление записей
* Изменение статусов заявок
* Toast-уведомления
* Loading / Empty / Error states

---

# 🛠 Технологии

## Frontend

* React
* TypeScript
* Vite
* React Router
* SCSS
* React Hook Form
* Zod

## Backend

* Node.js
* Express
* TypeScript
* Prisma ORM
* PostgreSQL
* JWT
* HTTP-only Cookies
* bcrypt
* Zod

## Database

* PostgreSQL
* Neon

## Deployment

* Vercel — frontend
* Render — backend
* Neon — PostgreSQL database
* Cloudinary — изображения

---

# 🏗 Архитектура проекта

Проект разделён на frontend и backend.

```text
nova/
│
├── src/
│   ├── app/
│   ├── components/
│   ├── features/
│   ├── pages/
│   ├── styles/
│   └── ...
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── lib/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── schemas/
│   │   └── ...
│   │
│   ├── prisma/
│   │   └── schema.prisma
│   │
│   └── package.json
│
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
│
└── package.json
```

---

# 🎨 Frontend

Frontend построен на React + TypeScript.

Основные страницы:

```text
/
├── Главная
│
├── Услуги
│
├── Проекты
│
├── Проект
│
├── Отзывы
│
├── Контакты
│
├── /login
│   └── Авторизация
│
└── /admin
    ├── Dashboard
    ├── Services
    ├── Projects
    ├── Reviews
    └── Requests
```

---

# 🔐 Авторизация

Для авторизации используется JWT.

После успешного входа backend создаёт access token и сохраняет его в HTTP-only cookie:

```text
accessToken
```

Cookie имеет следующие параметры:

```text
httpOnly
secure
sameSite: none
maxAge: 2 hours
```

Защищённые API-маршруты используют middleware `requireAuth`.

Пример:

```text
GET /api/admin/services
```

Если пользователь не авторизован:

```text
401 Unauthorized
```

---

# 🗄 База данных

В качестве базы данных используется PostgreSQL.

Подключение осуществляется через Prisma ORM.

Основные модели:

```text
Admin
Service
Project
Review
Request
```

Связь приложения с базой данных:

```text
React
   ↓
Express API
   ↓
Prisma
   ↓
PostgreSQL
   ↓
Neon
```

---

# 📡 API

Основные публичные endpoints:

```text
GET /api/services
GET /api/projects
GET /api/reviews
POST /api/requests
POST /api/auth/login
POST /api/auth/logout
GET /api/auth/me
```

Административные endpoints:

```text
GET    /api/admin/services
POST   /api/admin/services
PATCH  /api/admin/services/:id
DELETE /api/admin/services/:id

GET    /api/admin/projects
POST   /api/admin/projects
PATCH  /api/admin/projects/:id
DELETE /api/admin/projects/:id

GET    /api/admin/reviews
POST   /api/admin/reviews
PATCH  /api/admin/reviews/:id
DELETE /api/admin/reviews/:id

GET    /api/admin/requests
PATCH  /api/admin/requests/:id
DELETE /api/admin/requests/:id
```

---

# ✅ Валидация

Для валидации данных используется Zod.

Формы frontend используют:

```text
React Hook Form
        +
Zod
```

Это позволяет валидировать данные до отправки на сервер.

Backend также выполняет собственную валидацию входящих данных.

---

# 🖼 Изображения

Изображения проектов и услуг хранятся во внешнем image hosting.

В базе данных сохраняется URL изображения:

```text
https://...
```

Frontend использует этот URL непосредственно в `<img>`.

Для проекта используется Cloudinary.

Архитектура:

```text
Cloudinary
    ↓
URL изображения
    ↓
PostgreSQL
    ↓
API
    ↓
React
```

---

# 📱 Адаптивность

Сайт адаптирован под:

* Desktop
* Tablet
* Mobile

Основные изменения на мобильных устройствах:

* мобильное меню
* адаптивная сетка проектов
* изменение размеров изображений
* адаптивная типографика
* вертикальное расположение элементов
* адаптивная административная панель

---

# ⚡ Производительность

При разработке учитывались:

* code splitting
* lazy loading страниц
* оптимизация изображений
* использование современных форматов изображений
* ограничение размеров изображений
* минимизация JavaScript
* разделение публичной и административной части
* оптимизация загрузки ресурсов

---

# 🔎 SEO

Для поисковой индексации настроены:

```text
robots.txt
sitemap.xml
favicon
title
meta description
canonical
Open Graph
```

Административные страницы запрещены для поисковых роботов:

```text
Disallow: /admin
Disallow: /login
```

Публичные страницы доступны для индексации.

---

# 🚀 Локальный запуск

## Требования

Перед запуском необходимо установить:

```text
Node.js
npm
PostgreSQL
```

Также необходимо создать `.env`.

---

## Frontend

Перейти в корневую директорию:

```bash
npm install
```

Запустить development server:

```bash
npm run dev
```

Frontend будет доступен по адресу:

```text
http://localhost:5173
```

---

## Backend

Перейти в директорию сервера:

```bash
cd server
```

Установить зависимости:

```bash
npm install
```

Запустить development server:

```bash
npm run dev
```

Backend:

```text
http://localhost:4000
```

---

# 🗃 Prisma

Генерация Prisma Client:

```bash
npx prisma generate
```

Применение миграций:

```bash
npx prisma migrate dev
```

Проверка базы через Prisma Studio:

```bash
npx prisma studio
```

Seed базы данных:

```bash
npx prisma db seed
```

---

# 🔑 Переменные окружения

## Frontend

Пример:

```env
VITE_API_URL=http://localhost:4000/api
```

---

## Backend

Пример:

```env
DATABASE_URL="postgresql://..."
JWT_SECRET="your-secret-key"
NODE_ENV="development"
PORT=4000
CLIENT_URL="http://localhost:5173"
```

Секретные значения не должны попадать в Git.

Файл `.env` добавлен в `.gitignore`.

---

# 🏭 Production

Production-архитектура:

```text
                 ┌───────────────┐
                 │    Vercel     │
                 │   Frontend    │
                 └───────┬───────┘
                         │
                         ↓
                 ┌───────────────┐
                 │    Render     │
                 │    Backend    │
                 └───────┬───────┘
                         │
                         ↓
                 ┌───────────────┐
                 │     Neon      │
                 │  PostgreSQL   │
                 └───────────────┘

                 Cloudinary
                      ↑
                      │
                  Images
```

---

# 🔄 Deployment

## Frontend

Frontend деплоится через Vercel.

После push в GitHub создаётся новый deployment.

```bash
git add .
git commit -m "update"
git push
```

---

## Backend

Backend деплоится через Render.

Build:

```bash
npm run build
```

Start:

```bash
npm start
```

Перед production deployment необходимо добавить environment variables в Render.

---

# 🧪 Проверка перед production

Перед публикацией необходимо проверить:

```text
✓ Главная страница
✓ Навигация
✓ Мобильная версия
✓ Форма заявки
✓ Авторизация
✓ Logout
✓ Protected routes
✓ CRUD услуг
✓ CRUD проектов
✓ CRUD отзывов
✓ Заявки
✓ Изображения
✓ API
✓ Database
✓ CORS
✓ Cookies
✓ robots.txt
✓ sitemap.xml
✓ favicon
✓ SEO
```

---

# 🐛 Обработка ошибок

Frontend содержит состояния:

```text
Loading
Empty
Error
Success
```

Для пользовательских действий используются Toast-уведомления.

Backend возвращает HTTP status codes:

```text
200 OK
201 Created
204 No Content
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
500 Internal Server Error
```

---

# 🔒 Безопасность

В проекте используются:

* bcrypt для хеширования паролей
* JWT
* HTTP-only cookies
* CORS
* server-side validation
* Zod
* защищённые admin routes
* environment variables
* отсутствие секретов в frontend

Пароли администраторов не хранятся в открытом виде.

---

# 📂 Основные сущности

## Service

Услуга студии:

```text
title
slug
shortDescription
description
priceFrom
image
features
isActive
sortOrder
```

## Project

Реализованный проект:

```text
title
slug
description
city
area
category
image
images
isPublished
sortOrder
```

## Review

Отзыв:

```text
author
text
object
rating
sortOrder
```

## Request

Заявка клиента:

```text
name
phone
area
service
comment
status
```

---

# 📈 Дальнейшее развитие

Возможные улучшения проекта:

* SSR / SSG для улучшения SEO
* автоматическая генерация sitemap из базы данных
* оптимизация изображений через Cloudinary transformations
* pagination для административных таблиц
* фильтрация заявок
* поиск по проектам
* аналитика
* Google Analytics
* Яндекс Метрика
* интеграция с Telegram
* email-уведомления о новых заявках
* загрузка изображений непосредственно из админки
* drag & drop для сортировки проектов
* дополнительные SEO-страницы
* кеширование API
* CDN
* расширенная оптимизация Core Web Vitals

---

# 📄 Лицензия

Проект разработан для коммерческого использования студией NOVA.

Все права на контент, изображения, тексты и дизайн принадлежат владельцу проекта.

---

# 👨‍💻 Автор

NOVA Studio

Коммерческий сайт студии дизайна интерьера и ремонта квартир.
