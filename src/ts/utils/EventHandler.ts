//MIT License
//
//Copyright (c) 2021 Foxstar
//
//Permission is hereby granted, free of charge, to any person obtaining a copy
//of this software and associated documentation files (the "Software"), to deal
//in the Software without restriction, including without limitation the rights
//to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//copies of the Software, and to permit persons to whom the Software is
//furnished to do so, subject to the following conditions:
//
//The above copyright notice and this permission notice shall be included in all
//copies or substantial portions of the Software.
//
//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
//SOFTWARE.

import * as path from 'path'
import * as fs from 'fs'
import {Client, Intents} from "discord.js"
import { Database } from '../core/database';
import ExitHandler from './exitHandler';

/**
 * 이 함수는 `moudle.exports`를 통해 `events`를 핸들링하기 위한 함수입니다.
 * 
 * @param client 디스코드 봇을 실행한 bot/client 클라스입니다.
 * @param database 데이터베이스를 저장하고 있는 클라스입니다.
 * @param reload 재시작 여부를 넣는 변수입니다.
 */
export const eventHandler = (client:Client<boolean>,database:Database,exitHandler:ExitHandler,reload:boolean) => {

    // 현재 실행되고 있는 폴더로부터 경로를 만들어줍니다.
    const eventsPath = path.join(__dirname, '../events');
    // 이벤트 파일 이름을 모두 불러옵니다.
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

    // 실행된 이벤트를 보여줍니다.
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