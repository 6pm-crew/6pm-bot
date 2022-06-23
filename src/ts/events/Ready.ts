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

import {Client} from "discord.js"
import { Database } from "../core/database";


/**
 * 서버 첫 실행시에 한번 실행되는 이벤트 입니다.
 */
export const onReadyModule = {
	/** 이벤트 이름입니다. */
	name: 'ready',
	/** 실행 횟수 여부입니다. */
	once: true,
	/**
	 * 디스코드 봇이 준비되면 실행되는 함수입니다.
	 * 
	 * @param database 채팅시에 들어오는 매개변수 값이며, 채팅친 정보에 대한 데이터가 들어옵니다.
	 * @param client 실행시에 실행되는 디스코드 봇에 대한 정보를 받습니다.
	 */
	execute(database:Database,client:Client<boolean>) {
		console.log(`Ready! Logged in as ${client.user!.tag}`);
	},
};

module.exports = onReadyModule
