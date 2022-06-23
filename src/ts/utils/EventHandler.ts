

import * as path from 'path'
import * as fs from 'fs'
import {Client, Intents} from "discord.js"
import { Database } from '../core/database';

/**
 * 이 함수는 `moudle.exports`를 통해 `events`를 핸들링하기 위한 함수입니다.
 * 
 * @param client 디스코드 봇을 실행한 bot/client 클라스입니다.
 * @param database 데이터베이스를 저장하고 있는 클라스입니다.
 * @param reload 재시작 여부를 넣는 변수입니다.
 */
export const eventHandler = (client:Client<boolean>,database:Database,reload:boolean) => {
    const eventsPath = path.join(__dirname, '../events');
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
    console.log(eventFiles)
    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(database,...args));
        } else {
            client.on(event.name, (...args) => event.execute(database,...args));

        }
    }
}


module.exports = eventHandler