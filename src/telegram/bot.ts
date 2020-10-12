import {environment} from './../env'
import * as TelegramBot from 'node-telegram-bot-api'

const token = environment.tgToken
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true})

const chatId = environment.tgChatId

const send = async (message: string, format: 'md' | 'text'): Promise<any> => {
  await bot.sendMessage(chatId, message, format === 'md' ? {parse_mode: 'MarkdownV2'} : undefined)
  await bot.stopPolling()
}

export = send
