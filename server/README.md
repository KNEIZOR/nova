# NOVA Studio Backend

Backend для коммерческого сайта студии ремонта.

## Стек

- Node.js
- TypeScript
- Express
- PostgreSQL
- Prisma
- JWT
- HTTP-only cookies
- bcrypt
- Zod
- Helmet
- CORS

## Запуск

1. Установить PostgreSQL и создать БД `nova`.
2. Скопировать `.env.example` в `.env`.
3. Заполнить `DATABASE_URL` и `JWT_SECRET`.
4. Выполнить:

```bash
npm install
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run prisma:seed
npm run dev
```

API будет доступен на `http://localhost:4000`.

Проверка:

```text
GET http://localhost:4000/api/health
```

## Основные endpoints

Public:

- `GET /api/services`
- `GET /api/projects`
- `GET /api/reviews`
- `POST /api/requests`

Auth:

- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`

Admin:

- `GET /api/admin/dashboard`
- CRUD `/api/admin/services`
- CRUD `/api/admin/projects`
- CRUD `/api/admin/reviews`
- `GET /api/admin/requests`
- `GET /api/admin/requests/:id`
- `PATCH /api/admin/requests/:id/status`
- `DELETE /api/admin/requests/:id`
