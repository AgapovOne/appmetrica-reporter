// @ts-nocheck
import {appForAppID} from './apps'
import {reduce, mergeDeepRight, map, merge, groupBy} from 'ramda'
import {initialAppsList} from './initial'

const prepareAppsArrayData = apps => {
  const group = groupBy(app => {
    return Object.keys(app)[0]
  })
  const groupedItems = group(apps)
  const mergedGroups = map(group => reduce(mergeDeepRight, {}, group), groupedItems)
  const values = Object.values(mergedGroups)
  const result = values.map(value => {
    const key = Object.keys(value)[0]
    return {id: key, ...value[key]}
  })

  return result
}

const parse = (res: StatResponse, object: (a: AppData) => any) => {
  const dataArray = res.data
  const apps = dataArray.map(d => (merge(appForAppID(d.dimensions[0].name), d)))
  const allData = apps.map(app => {
    return {
      [app.id]: {
        [app.dimensions[1].name.toLowerCase()]: object(app),
      },
    }
  })
  return prepareAppsArrayData(allData)
}

const mergeFull = (current, next) => {
  return current.map(cur => {
    const nextItems = next.filter(n => cur.id === n.id)
    return reduce(mergeDeepRight, cur, nextItems)
  })
}

interface StatResponse {
  data: {
    dimensions: {
      name: string;
    }[];
    metrics: number[];
  }[];
}

interface AppData {
  metrics: number[];
}

const parseMonthly = (users: StatResponse, crashes: StatResponse, errors: StatResponse) => {
  const parsedUsers = parse(users, (app: AppData) => ({
    users: {current: app.metrics[0]},
    newUsers: {current: app.metrics[1]},
  }))
  const parsedCrashes = parse(crashes, (app: AppData) => ({
    crashes: {current: app.metrics[0]},
  }))
  const parsedErrors = parse(errors, (app: AppData) => ({
    errors: {current: app.metrics[0]},
  }))
  return mergeFull(
    mergeFull(
      mergeFull(initialAppsList, parsedUsers),
      parsedCrashes),
    parsedErrors)
}

export {parseMonthly}
