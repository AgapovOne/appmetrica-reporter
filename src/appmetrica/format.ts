
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

const formatMd = (response: FormattedResponse[]): string => {
  return '*Отчет за неделю*\n' + response
  .sort((a, b) => {
    return (a.ios.users.current + a.android.users.current) - (b.ios.users.current + b.android.users.current)
  })
  .map(app => {
    const ios = `${app.name}📱\n🧑‍🤝‍🧑${app.ios.users.current}. 🆕${app.ios.newUsers.current}. ☠️${app.ios.crashes.current}. ⚠️${app.ios.errors.current}`
    const android = `${app.name}🟩\n🧑‍🤝‍🧑${app.android.users.current}. 🆕${app.android.newUsers.current}. ☠️${app.android.crashes.current}. ⚠️${app.android.errors.current}`
    return [ios, android].join('\n')
  }).join('\n')
}

export {formatMd}
