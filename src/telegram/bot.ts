import * as TelegramBot from 'node-telegram-bot-api'
import {env} from 'process'

// replace the value below with the Telegram token you receive from @BotFather
const token = env.TG_TOKEN!

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true})

const send = async (message: string, format: 'md' | 'text'): Promise<any> => {
  await bot.sendMessage(76981177, message, format === 'md' ? {parse_mode: 'MarkdownV2'} : undefined)
  await bot.stopPolling()
}

export = send
