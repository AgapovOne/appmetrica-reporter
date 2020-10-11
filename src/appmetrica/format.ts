import {table, getBorderCharacters} from 'table'
const debug = require('debug')('format')

interface OneOS {
  users: { current: number; previous: number};
  newUsers: { current: number; previous: number};
  crashes: { current: number; previous: number};
  errors: { current: number; previous: number};
}

export interface FormattedResponse {
  id: string;
  name: string;
  appIDs: string[];
  ios: OneOS;
  android: OneOS;
}

const getStat = (
  input: FormattedResponse,
  os: 'ios' | 'android',
  stat: 'users' | 'newUsers' | 'crashes' | 'errors'
): number => input[os][stat].current

const sort = (input: FormattedResponse[]) => input
.sort((a, b) => {
  return (b.ios.users.current + b.android.users.current) - (a.ios.users.current + a.android.users.current)
})

/// Format is specific to telegram markdown.
/// https://core.telegram.org/bots/api#markdownv2-style
const formatMd = (response: FormattedResponse[]): string => {
  return '*Отчет за неделю*\n' + sort(response)
  .map(app => {
    const stat = (a: any, b: any) => getStat(app, a, b)
    const ios = `${app.name}📱\t🧑‍🤝‍🧑${stat('ios', 'users')}\t🆕${stat('ios', 'newUsers')}\t☠️${stat('ios', 'crashes')}\t⚠️${stat('ios', 'errors')}`
    const android = `${app.name}🟩\t🧑‍🤝‍🧑${stat('android', 'users')}\t🆕${stat('android', 'newUsers')}\t☠️${stat('android', 'crashes')}\t⚠️${stat('android', 'errors')}`
    return [ios, android].join('\n')
  }).join('\n')
}

const formatTable = (response: FormattedResponse[]): string => {
  const data = sort(response)
  .map(app => {
    const stat = (a: any, b: any) => getStat(app, a, b)
    return [
      app.name,
      '📱',
      stat('ios', 'users'),
      stat('ios', 'newUsers'),
      stat('ios', 'crashes'),
      stat('ios', 'errors'),
      '🟩',
      stat('android', 'users'),
      stat('android', 'newUsers'),
      stat('android', 'crashes'),
      stat('android', 'errors'),
    ]
  })

  const tableData = [
    ['Name', 'apl', 'usr', 'new', 'cr', 'er', 'drd', 'usr', 'new', 'cr', 'er'],
    ...data,
  ]
  debug(tableData)

  return '```\n' + table(
    tableData,
    {
    // border: getBorderCharacters('void'),
      columnDefault: {
        alignment: 'right',
        // width: 3,
        //   paddingLeft: 0,
        //   paddingRight: 1,
      },
      singleLine: true,
      // drawHorizontalLine: () => false,
    //   return false
    },
  ) + '\n```'
}

export {formatMd, formatTable}
