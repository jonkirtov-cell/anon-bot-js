const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// Получаем токен из переменных окружения
const token = process.env.BOT_TOKEN;

// Создаем бота
const bot = new TelegramBot(token, {polling: true});

// Простой маршрут для проверки работы
app.get('/', (req, res) => {
  res.send('Telegram Bot is running!');
});

// Обработчик команды /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.chat.first_name;
  
  bot.sendMessage(chatId, `Привет, ${firstName}! 👋\nЯ простой Telegram бот и я работаю! 🎉`);
});

// Обработчик всех текстовых сообщений
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  
  // Игнорируем команды (они начинаются с /)
  if (!text.startsWith('/')) {
    bot.sendMessage(chatId, `Вы написали: "${text}"\nБот успешно работает! ✅`);
  }
});

// Запускаем сервер
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

console.log('Bot started...');
