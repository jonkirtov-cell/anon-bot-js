const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, {polling: true});

// Массив с интересными ответами
const interestingResponses = [
    "Знаете ли вы, что коты могут издавать более 100 разных звуков? 🐱",
    "А вот интересный факт: медвежонок панда рождается размером с чашку чая! 🐼",
    "Океаны покрывают более 70% поверхности Земли, но мы изучили только 5% из них 🌊",
    "Бабочки пробуют вкус ногами! 🦋",
    "Сердце кита бьется всего 9 раз в минуту 💙",
    "В Японии есть кафе, где можно поиграть с совами пока пьешь кофе 🦉☕",
    "Один дуб за свою жизнь производит около 10 миллионов желудей 🌳",
    "Космонавты становятся на 5 см выше в космосе из-за отсутствия гравитации 🚀",
    "У улитки около 25 000 зубов! 🐌",
    "В Швеции есть отель изо льда, который каждый год строят заново ❄️"
];

app.get('/', (req, res) => {
    res.send('Telegram Bot is running!');
});

// Обработчик команды /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const firstName = msg.chat.first_name;
    
    const welcomeText = `Привет, ${firstName}! 👋\n\nЯ не просто бот - я генератор интересных фактов! 📚\n\nПросто напиши мне что-нибудь, и я поделюсь с тобой чем-то увлекательным! ✨`;
    bot.sendMessage(chatId, welcomeText);
});

// Обработчик команды /fact
bot.onText(/\/fact/, (msg) => {
    const chatId = msg.chat.id;
    const randomFact = interestingResponses[Math.floor(Math.random() * interestingResponses.length)];
    bot.sendMessage(chatId, randomFact);
});

// Обработчик всех текстовых сообщений
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    
    // Игнорируем команды (они начинаются с /)
    if (!text.startsWith('/')) {
        const randomFact = interestingResponses[Math.floor(Math.random() * interestingResponses.length)];
        const response = `Вы написали: "${text}"\n\nА вот интересный факт для вас:\n${randomFact}`;
        
        bot.sendMessage(chatId, response);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

console.log('Bot started with interesting facts...');
