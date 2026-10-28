const { test, expect } = require('@playwright/test');

const API_URL = '**/jsonplaceholder.typicode.com/users';

// Нужен, потому что страница на localhost, а API на другом домене.
// Без этого заголовка браузер заблокирует подменённый ответ (CORS).
const corsHeaders = { 'access-control-allow-origin': '*' };

// Мок-данные вместо настоящего ответа сервера
const mockUsers = [
  { id: 1, name: 'Анна' },
  { id: 2, name: 'Игорь' },
  { id: 3, name: 'Мария' },
];

test('отображает пользователей из мок-данных', async ({ page }) => {
  // ПЕРЕХВАТ: route ставим ДО page.goto, иначе запрос уйдёт на реальный сервер
  await page.route(API_URL, (route) =>
    route.fulfill({
      status: 200,
      headers: corsHeaders,
      json: mockUsers,
    })
  );

  await page.goto('/');

  // Проверяем, что вывелись именно наши мок-данные
  const items = page.locator('#users li');
  await expect(items).toHaveCount(3);
  await expect(items.nth(0)).toHaveText('Анна');
  await expect(items.nth(1)).toHaveText('Игорь');
  await expect(items.nth(2)).toHaveText('Мария');
});

test('показывает сообщение при ошибке 403', async ({ page }) => {
  // ПЕРЕХВАТ: сервер "отвечает" статусом 403
  await page.route(API_URL, (route) =>
    route.fulfill({
      status: 403,
      headers: corsHeaders,
      json: { message: 'Forbidden' },
    })
  );

  await page.goto('/');

  // Проверяем надпись, которую добавляет приложение при 403
  await expect(page.locator('#error')).toHaveText('Ошибка 403: доступ запрещён');

  // Список при этом пустой
  await expect(page.locator('#users li')).toHaveCount(0);
});
