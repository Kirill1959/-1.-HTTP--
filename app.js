// Адрес API с Хекслета
const API_URL = 'https://http.hexlet.app/http-api/users';

const usersList = document.getElementById('users');
const errorBox = document.getElementById('error');

// Показываем список пользователей
function renderUsers(users) {
  users.forEach((user) => {
    const li = document.createElement('li');
    // Здесь поле, которое реально приходит из API (проверьте в браузере)
    li.textContent = user.name;
    usersList.appendChild(li);
  });
}

// Показываем сообщение об ошибке
function showError(message) {
  errorBox.textContent = message;
}

async function loadUsers() {
  try {
    const response = await fetch(API_URL);

    // ОБРАБОТКА ОШИБКИ 403: уведомляем пользователя
    if (response.status === 403) {
      showError('Ошибка 403: доступ запрещён');
      return;
    }

    // Любая другая ошибка сервера
    if (!response.ok) {
      showError(`Ошибка сервера: ${response.status}`);
      return;
    }

    // УСПЕХ: получили данные и выводим их
    const users = await response.json();
    renderUsers(users);
  } catch (error) {
    // Сеть упала, сервер недоступен и т.п.
    showError('Не удалось выполнить запрос');
  }
}

// Запрос выполняется сразу после загрузки страницы
loadUsers();