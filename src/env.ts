require('dotenv').config()
import {env} from 'process'

export const environment = {
  accessToken: env.ACCESS_TOKEN!,
  tgToken: env.TG_TOKEN!,
  tgChatId: env.TG_CHAT_ID!,
}
