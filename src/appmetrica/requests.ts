// @flow
import {apiRequest} from './api-request'

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

type ParamsFunction = (ids: string[], period: Period, metric: string) => Params
type Fn = (n: any) => null;

enum Period {
  Week = '7daysAgo',
  Month = '30daysAgo'
}

const params: ParamsFunction = (ids, period, metric) => ({
  ...defaultParams(ids),
  date1: period,
  dimensions: `ym:${metric}:appID,ym:${metric}:operatingSystem`,
})

const getUserStatistics = (ids: string[], period: Period, params: ParamsFunction) =>
  apiRequest.get('/stat/v1/data', {
    params: {
      metrics: 'ym:u:activeUsers,ym:u:newUsers',
      ...params(ids, period, 'u'),
    },
  })
  .then(({data}) => data)

const getCrashStatistics = (ids: string[], period: Period, params: ParamsFunction) =>
  apiRequest.get('/stat/v1/data', {
    params: {
      metrics: 'ym:cr:crashes',
      ...params(ids, period, 'cr'),
    },
  })
  .then(({data}) => data)

const getErrorStatistics = (ids: string[], period: Period, params: ParamsFunction) =>
  apiRequest.get('/stat/v1/data', {
    params: {
      metrics: 'ym:er:errors',
      ...params(ids, period, 'er'),
    },
  })
  .then(({data}) => data)

const allRequests = (ids: string[], period: Period) => {
  return [
    getUserStatistics(ids, period, params),
    getCrashStatistics(ids, period, params),
    getErrorStatistics(ids, period, params),
  ]
}

const Api = {
  getAll: (ids: string[], period: Period) => {
    return Promise.all(allRequests(ids, period))
  },
}

export {Api, Period}
