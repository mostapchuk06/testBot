const TelegramApi = require('node-telegram-bot-api');

const token = "5616728742:AAFlSpQZvimfff4RavSKwmOtu8pODdinD5g";

const bot = new TelegramApi(token, { polling: true });

const chats = {};

const { gameOptions, againOptions } = require('./options');

const startGame = async (chatId) => {
    await bot.sendMessage(chatId, "I guess the number 1 to 9 so try catch it");
    const rndNum = Math.floor(Math.random() * 10)
    chats[chatId] = rndNum;
    await bot.sendMessage(chatId, "Catch it!", gameOptions);
}
    const Start = () => {
        bot.setMyCommands([
            { command: '/start', description: "hello" },
            { command: '/myinfo', description: "Get information about you" },
            { command: '/game', description: "Guess the number" },
        ])
        
        bot.on("message", async msg => {
            const text = msg.text;
            const chatId = msg.chat.id;
            //await bot.sendMessage(chatId, `You write me ${text}`);
            console.log(msg);
            
            if (text === '/start') {
                return bot.sendMessage(chatId, "Hello I am testBot");
            }
            if (text === '/myinfo') {
                await bot.sendMessage(chatId, `Your username is ${msg.from.username}`);
                await bot.sendMessage(chatId, `Your name is ${msg.from.first_name}`);
                if (msg.from.last_name != undefined) {
                    await bot.sendMessage(chatId, `Your last name is ${msg.from.last_name}`);
                }    
                return bot.sendMessage(chatId, `You used /myinfo`);
            }
            if (text === '/game') {
                return startGame(chatId);
            }
            return bot.sendMessage(chatId, `I dont understend you :(`);
            
        });
        bot.on('callback_query', msg => {
            const data = msg.data;
            const chatId = msg.message.chat.id;
            if (data === '/again') {
                return startGame(chatId);
            }        
            if (data == chats[chatId]) {
                return bot.sendMessage(chatId, `Victory! It's ${chats[chatId]}`, againOptions)
            }
            else {
                return bot.sendMessage(chatId, `Try again! I guessed ${chats[chatId]}`, againOptions)
            }
            console.log(msg);
        })
    }
Start();