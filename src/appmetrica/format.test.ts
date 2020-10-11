import {expect} from 'chai'
import {format, FormattedResponse} from './format'

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

expect(format(data)).to.be.a('WOW')
