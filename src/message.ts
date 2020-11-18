import {formatMd, formatNarrowTable, formatTable} from './appmetrica/format'
import {parseMonthly} from './appmetrica/parse-month'
import {getAll} from './request'
import {send, bot} from './telegram/bot'
const debug = require('debug')('message')

enum Format {
  WideTable = 'wide-table',
  NarrowTable = 'narrow-table',
  Text = 'text'
}

const generateAndSend = async (format: Format, shouldStopPolling: boolean): Promise<any> => {
  const data = await getAll()

  const res = parseMonthly(data[0], data[1], data[2]) // ?

  debug('Got all with format: ', format)

  let message
  switch (format) {
  case Format.WideTable:
    message = formatTable(res)
    break
  case Format.NarrowTable:
    message = formatNarrowTable(res)
    break
  case Format.Text:
    message = formatMd(res)
    break
  default:
    throw new Error('unknown Format')
    break
  }

  await send(message, 'md', shouldStopPolling)
}

const listen = async (format: Format) => {
  const send = async (id: string | number) => {
    const message = await generateAndSend(format, false)
    bot.sendMessage(id, message)
  }

  bot.onText(/\/report/, async msg => {
    send(msg.chat.id)
    // const message = await bot.sendMessage(
    //   msg.chat.id,
    //   'Выбери формат',
    //   {reply_markup: {
    //     keyboard: [
    //       [{text: 'узкая таблица'}, {text: 'текст'}],
    //     ],
    //   }}
    // )
    // bot.onReplyToMessage(msg.chat.id, message.message_id, msg => {
    //   msg.text
    //   send(msg.chat.id)
    // })
  })
}

export {Format, generateAndSend, listen}
