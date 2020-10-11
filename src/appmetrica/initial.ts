import {apps} from './apps'

const defaultOutputValue = 0
const dumbObjInsideID = {
  ios: {
    users: {current: defaultOutputValue, previous: defaultOutputValue},
    newUsers: {current: defaultOutputValue, previous: defaultOutputValue},
    crashes: {current: defaultOutputValue, previous: defaultOutputValue},
    errors: {current: defaultOutputValue, previous: defaultOutputValue},
  },
  android: {
    users: {current: defaultOutputValue, previous: defaultOutputValue},
    newUsers: {current: defaultOutputValue, previous: defaultOutputValue},
    crashes: {current: defaultOutputValue, previous: defaultOutputValue},
    errors: {current: defaultOutputValue, previous: defaultOutputValue},
  },
}

const initialAppsList = apps.map(app => ({...app, ...dumbObjInsideID}))

export {initialAppsList}
