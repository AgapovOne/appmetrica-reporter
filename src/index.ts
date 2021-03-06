import {Command, flags} from '@oclif/command'
import {Period} from './appmetrica/requests'
import {Format, generateAndSend, listen} from './message'
const debug = require('debug')('MAIN')

class AppmetricaReporter extends Command {
  static description = 'describe the command here'

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    format: flags.enum({char: 'f', options: Object.values(Format), description: 'format of message to telegram'}),
    listen: flags.boolean({char: 'l'}),
  }

  static args = [{name: 'file'}]

  async run() {
    const {flags} = this.parse(AppmetricaReporter)

    this.log('START', flags)

    try {
      if (flags.listen) {
        await listen(flags.format)
      } else {
        await generateAndSend(null, flags.format, Period.Week, true)
      }
    } catch (error) {
      debug(error)
      this.log('ERR', error)
      this.error(error)
    }
  }
}

export = AppmetricaReporter
