import {Command, flags} from '@oclif/command'
import {formatMd, formatTable} from './appmetrica/format'
import {getAll} from './request'
import send = require('./telegram/bot')
const debug = require('debug')('MAIN')

class AppmetricaReporter extends Command {
  static description = 'describe the command here'

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
  }

  static args = [{name: 'file'}]

  async run() {
    // const {args, flags} = this.parse(AppmetricaReporter)

    this.log('STARTED REQUESTS')

    try {
      const data = await getAll()
      debug('Got all')
      const messageMd = formatMd(data)
      send(messageMd, 'md')
      const messageTable = formatTable(data)
      await send(messageTable, 'md')
    } catch (error) {
      debug(error)
      this.log('ERRR', error)
      this.error(error)
    }
  }
}

export = AppmetricaReporter
