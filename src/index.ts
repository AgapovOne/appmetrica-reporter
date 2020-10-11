import {Command, flags} from '@oclif/command'
import {formatMd} from './appmetrica/format'
import getAll = require('./request')
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

    return getAll
    .then(data => {
      debug('Got all')
      send(formatMd(data))
    })
    .catch(error => {
      debug(error)
      this.log('ERRR', error)
      // return error
    })
  }
}

export = AppmetricaReporter
