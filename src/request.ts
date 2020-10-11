import * as debug from 'debug'
import {initialAppsList} from './appmetrica/initial'
import {Api} from './appmetrica/requests'

debug('request')(initialAppsList)

export const getAll = Api.getAll.bind(null, initialAppsList.filter(app => app.id).map(app => app.id))
