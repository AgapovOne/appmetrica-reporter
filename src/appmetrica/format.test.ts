import {expect} from 'chai'
import {log} from 'console'
import {formatTable, FormattedResponse} from './format'

const data: FormattedResponse[] = [
  {
    id: '0',
    name: 'Фарма', appIDs: ['first', 'second'],
    ios: {
      users: {
        current: 0,
        previous: 1,
      },
      newUsers: {
        current: 0,
        previous: 1,
      },
      crashes: {
        current: 0,
        previous: 1,
      },
      errors: {
        current: 0,
        previous: 1,
      },
    },
    android: {
      users: {
        current: 0,
        previous: 1,
      },
      newUsers: {
        current: 0,
        previous: 1,
      },
      crashes: {
        current: 0,
        previous: 1,
      },
      errors: {
        current: 0,
        previous: 1,
      },
    },
  },
]

const received = formatTable(data)

log(received)

expect(received).to.be.not.null
