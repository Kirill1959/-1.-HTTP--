# HTTP: моки API в Playwright

Простое приложение (HTML + JS) запрашивает пользователей с API после загрузки страницы
и выводит их списком. При ошибке 403 показывает сообщение.

Playwright-тесты перехватывают запрос и подставляют мок-данные.

## Запуск

```bash
npm install
npx playwright install chromium
npm test
```
