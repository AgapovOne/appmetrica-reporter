// @flow
import {apiRequest} from './api-request'
import axios from 'axios'
import {parseMonthly} from './parse-month'

interface Params {
  dimensions: string;
  date1: string;
  ids: string;
  date2: string;
  limit: number;
  metrics?: string;
}

const defaultParams = (ids: string[]) => ({
  ids: ids.join(','),
  date2: 'today',
  limit: 1000,
})

type ParamsFunction = (ids: string[], metric: string) => Params
type Fn = (n: any) => null;

const defaultMonthlyParams: ParamsFunction = (ids, metric) => ({
  ...defaultParams(ids),
  date1: '30daysAgo',
  dimensions: `ym:${metric}:appID,ym:${metric}:operatingSystem`,
})

const getUserStatistics = (ids: string[], params: ParamsFunction) =>
  apiRequest.get('/stat/v1/data', {
    params: {
      metrics: 'ym:u:activeUsers,ym:u:newUsers',
      ...params(ids, 'u'),
    },
  })
  .then(({data}) => data)

const getCrashStatistics = (ids: string[], params: ParamsFunction) =>
  apiRequest.get('/stat/v1/data', {
    params: {
      metrics: 'ym:cr:crashes',
      ...params(ids, 'cr'),
    },
  })
  .then(({data}) => data)

const getErrorStatistics = (ids: string[], params: ParamsFunction) =>
  apiRequest.get('/stat/v1/data', {
    params: {
      metrics: 'ym:er:errors',
      ...params(ids, 'er'),
    },
  })
  .then(({data}) => data)

const allRequests = (ids: string[]) => {
  return [
    getUserStatistics(ids, defaultMonthlyParams),
    getCrashStatistics(ids, defaultMonthlyParams),
    getErrorStatistics(ids, defaultMonthlyParams),
  ]
}

const Api = {
  getAll: (ids: string[]) => {
    return Promise.all(allRequests(ids))
  },
}

export {Api}
