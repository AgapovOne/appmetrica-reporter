import {Command, flags} from '@oclif/command'
import {formatMd, formatNarrowTable, formatTable} from './appmetrica/format'
import {parseMonthly} from './appmetrica/parse-month'
import {getAll} from './request'
import send = require('./telegram/bot')
const debug = require('debug')('MAIN')

class AppmetricaReporter extends Command {
  static description = 'describe the command here'

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    format: flags.enum({char: 'f', options: ['wide-table', 'narrow-table', 'text'], description: 'format of message to telegram'}),
  }

  static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(AppmetricaReporter)

    this.log('STARTED REQUESTS')

    try {
      const data = await getAll()

      const res = parseMonthly(data[0], data[1], data[2]) // ?

      debug('Got all with format: ', flags.format)

      if (flags.format === 'wide-table') {
        const messageTable = formatTable(res)
        await send(messageTable, 'md')
      } else if (flags.format === 'narrow-table') {
        const messageTable = formatNarrowTable(res)
        await send(messageTable, 'md')
      } else {
        const messageMd = formatMd(res)
        await send(messageMd, 'md')
      }
    } catch (error) {
      debug(error)
      this.log('ERRR', error)
      this.error(error)
    }
  }
}

export = AppmetricaReporter
