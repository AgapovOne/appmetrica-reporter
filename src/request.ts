import * as debug from 'debug'
import {initialAppsList} from './appmetrica/initial'
import {Api} from './appmetrica/requests'

debug('request')(initialAppsList)

const getAll = Api
.getAll(initialAppsList.filter(app => app.id).map(app => app.id))

export = getAll
