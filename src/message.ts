import {formatMd, formatNarrowTable, formatTable} from './appmetrica/format'
import {parseMonthly} from './appmetrica/parse-month'
import {Period} from './appmetrica/requests'
import {getAll} from './request'
import {send, bot} from './telegram/bot'
const debug = require('debug')('MAIN-message')

enum Format {
  WideTable = 'wide-table',
  NarrowTable = 'narrow-table',
  Text = 'text'
}

const generateAndSend = async (chatId: string | number | null, format: Format, period: Period, shouldStopPolling: boolean): Promise<any> => {
  const data = await getAll(period)

  const res = parseMonthly(data[0], data[1], data[2]) // ?

  debug('Got all with', format, 'format')

  let message
  switch (format) {
  case Format.WideTable:
    message = formatTable(res, period)
    break
  case Format.NarrowTable:
    message = formatNarrowTable(res, period)
    break
  case Format.Text:
    message = formatMd(res, period)
    break
  default:
    throw new Error('unknown Format')
    break
  }

  await send(chatId, message, 'md', shouldStopPolling)
}

const listen = async (format: Format) => {
  const send = async (id: string | number, period: Period) => {
    await generateAndSend(id, format, period, false)
  }

  bot.onText(/\/report/, async (msg, match) => {
    debug('Got report request', msg, match, format)
    let period = Period.Week
    const input = msg.text?.split(' ')
    input?.shift()
    const param = input?.shift()
    debug(param)
    if (param === 'month') {
      period = Period.Month
    } else if (param === 'week') {
      period = Period.Week
    }
    debug(period)
    send(msg.chat.id, period)
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
