import {environment} from './../env'
import * as TelegramBot from 'node-telegram-bot-api'
const debug = require('debug')('bot')

const token = environment.tgToken
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true})

const knownChatId = environment.tgChatId

const send = async (chatId: string | number | null, message: string, format: 'md' | 'text', shouldStopPolling: boolean): Promise<any> => {
  await bot.sendMessage(chatId ?? knownChatId, message, format === 'md' ? {parse_mode: 'MarkdownV2'} : undefined)
  if (shouldStopPolling) await bot.stopPolling()
}

bot.onText(/\/start/, msg => {
  bot.sendMessage(msg.chat.id, 'Привет. Это бот, нужен пароль, спроси главного.')
})

bot.on('polling_error', err => {
  debug(err)
})

bot.setMyCommands([{command: 'report', description: 'отчет за неделю'}])

export {send, bot}
