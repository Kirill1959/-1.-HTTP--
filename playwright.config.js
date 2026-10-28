const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:3000',
  },
  // Playwright сам запускает простой сервер для нашей страницы
  webServer: {
    command: 'npx http-server -p 3000',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
  },
});
