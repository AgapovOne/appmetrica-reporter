import {find, includes, values} from 'ramda'

interface App {
  id: string;
  name: string;
  appIDs: string[];
}

const apps: App[] = [
  {id: '2693761', name: 'Коннект', appIDs: ['ru.kontur.connect']},
  {id: '2319682', name: 'Календарь', appIDs: ['com.kontur.calendar']},
  {id: '2827744', name: 'ОФД', appIDs: ['ru.kontur.ofd']},
  {id: '2567623', name: 'Школа', appIDs: ['ru.skbkontur.school', 'ru.kontur.school']},
  {id: '2609734', name: 'Экстерн', appIDs: ['ru.kontur.extern']},
  {id: '2094805', name: 'Меркурий', appIDs: ['ru.kontur.mercury']},
  {id: '2216911', name: 'Сканер', appIDs: ['com.kontur.egais']},
  {id: '3054442', name: 'Диадок', appIDs: ['ru.kontur.diadoc2', 'com.kontur.diadoc2']},
  //   {id: '3294976', name: 'Пульс', appIDs: ['ru.kontur.pulse']},
  {id: '3519916', name: 'Фарма', appIDs: ['ru.kontur.farma']},
  // Current UI supports 9 apps. Modify App my-x and StatItem py-y to expand/collapse space
]

const appForAppID = (appID: string) => {
  const appHasAppID = (app: App) => includes(appID, values(app.appIDs))
  return find(appHasAppID, apps)
}

export {
  apps, appForAppID,
}
