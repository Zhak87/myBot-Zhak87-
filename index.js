const TelegramApi = require('node-telegram-bot-api')
const {gameOptions, againOptions} = require(`./options`)
 
const token = '5917302892:AAHMMhvYDBl3L0Q8dW4g9PQv_A-_gVra5PI'

const bot = new TelegramApi(token, {polling: true})

const chats = {}


const startGame = async (chatId) => {
    await bot.sendMessage(chatId, `Game name, random number. U must guess a number from 0 to 10`)
            const randomNumber = Math.floor(Math.random() * 10)
            chats[chatId] = randomNumber;
            await bot.sendMessage(chatId, 'Guess', gameOptions);   
}

const start = () => {
    bot.setMyCommands([
        {command: '/start', description:'Hello'},
        {command: '/info', description:'Get u info'},
        {command: '/game', description:'Go play game'},
    ])
    

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
    
        if (text === '/start') {
            await bot.sendSticker (chatId, 'https://chpic.su/_data/stickers/d/dazaebalyzeblin/dazaebalyzeblin_001.webp')
            return bot.sendMessage(chatId, `Hello man, Its ZhakBot, send me message`)
        }   
    
        if (text === '/info') {
            return bot.sendMessage(chatId, `U name ${msg.from.first_name} ${msg.from.last_name}`)
        }
        
    if(text === '/game') {
            return startGame(chatId);
        }

        // if (text) {
        //    return bot.sendMessage(chatId, `U send me ${text}` )
        // }

        

        return bot.sendMessage(chatId, 'I dont understand u, return now!)')
        
    })

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === '/again') {
           return startGame(chatId)
        }
        if( data === chats[{chatId}]) {
            return bot.sendMessage(chatId, `Contgratilation, u find number ${chats[chatId]}`);
        } else {
            return bot.sendMessage(chatId, `Sorry, u not find number, I chose a number ${chats[chatId]}`, againOptions);
        }
    })
}

start()