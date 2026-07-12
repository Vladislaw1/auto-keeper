# API-клієнт (axios + React + TypeScript)

## Структура

```
api/
├── types.ts              # Загальні типи (Tokens, ApiErrorData)
├── tokenStorage.ts        # Зберігання access/refresh токенів
├── authApi.ts              # login / register / refresh / logout (без інтерцепторів)
├── axiosInstance.ts        # Головний apiClient з auto-refresh на 401
└── carsApi.example.ts      # Приклад типізованого модуля для сутності
```

## Встановлення

```bash
npm install axios
```

## Налаштування

Створіть `.env` у корені проєкту:

```
VITE_API_URL=http://localhost:3000
```

> Файли написані під **Vite** (`import.meta.env.VITE_API_URL`). Якщо у вас
> Create React App, замініть на `process.env.REACT_APP_API_URL` і назвіть
> змінну `REACT_APP_API_URL` в `.env`.

## Як це працює

1. **`axiosInstance.ts`** — головний клієнт (`apiClient`), яким користуєтесь у всіх запитах.

   - Request-інтерцептор автоматично додає `Authorization: Bearer <accessToken>`.
   - Response-інтерцептор ловить `401`, автоматично викликає `/auth/refresh`,
     зберігає нові токени й повторює оригінальний запит.
   - Якщо кілька запитів впали з 401 одночасно — рефреш виконається лише
     один раз, решта запитів чекають у черзі (`failedQueue`).
   - Якщо рефреш не вдався (refresh token теж протух) — токени чиститься,
     і користувача редіректить на `/login`.

2. **`authApi.ts`** — окремий axios-інстанс без інтерцепторів, щоб уникнути
   нескінченного циклу рефрешу.

3. **`tokenStorage.ts`** — обгортка над `localStorage`. Якщо хочете підвищити
   безпеку, тримайте `accessToken` в пам'яті (React Context/state), а
   `refreshToken` передавайте бекенду через `httpOnly` cookie — тоді front
   взагалі не матиме доступу до refresh token через JS.

## Приклад використання в компоненті

```tsx
import { useEffect, useState } from 'react';
import { carsApi, Car } from '../api/carsApi.example';

function CarsList() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carsApi
      .getAll()
      .then(setCars)
      .catch((err) => console.error('Не вдалось завантажити авто', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Завантаження...</p>;

  return (
    <ul>
      {cars.map((car) => (
        <li key={car.id}>
          {car.brand} {car.model} ({car.year})
        </li>
      ))}
    </ul>
  );
}
```

## Приклад логіну

```tsx
import { authApi } from '../api/authApi';
import { tokenStorage } from '../api/tokenStorage';

async function handleLogin(email: string, password: string) {
  const tokens = await authApi.login({
    email,
    password,
  });
  tokenStorage.setTokens(tokens.accessToken, tokens.refreshToken);
  // редірект на головну сторінку
}
```

## Обробка помилок API (типізовано)

```ts
import { AxiosError } from 'axios';
import { ApiErrorData } from '../api/types';

try {
  await carsApi.create(payload);
} catch (err) {
  const axiosErr = err as AxiosError<ApiErrorData>;
  const message = axiosErr.response?.data?.message ?? 'Невідома помилка';
  console.error(message);
}
```

## Наступні кроки (за бажанням)

- Додати `AbortController` для скасування запитів при розмонтуванні компонента.
- Обгорнути `apiClient` у React Query / TanStack Query для кешування,
  повторних спроб і фонового оновлення даних.
- Винести базовий URL і таймаути у окремий `config.ts`.
