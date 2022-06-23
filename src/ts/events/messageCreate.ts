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

import { Message } from 'discord.js';
import { Database } from '../core/database';


/**
 * 이벤트를 실행하기 위한 json 변수
 */
export const messageCreateModule = {
	name: 'messageCreate',
	execute(database:Database,message:Message) {
        if(message.author.bot) return
        let sendingMessage:string = message.content;
        let deleteMessage:Boolean = false;
        for(const element of database.getDataChannels().get(message.guild?.id!)!){
            if(message.author.bot){
                return
            }
            if(element === message.guild?.id){
                message.delete()
                return
            }
        }
        database.getDataWords().get(message.guild?.id!)?.forEach(element => {
            if(message.content.includes(element)){
                deleteMessage = true
                let filterStar = "∗".repeat(element.length)
                sendingMessage = sendingMessage.replace(element,filterStar)
            }

        })
        if(deleteMessage){
            message.delete()
            let APM = message.createdAt.getHours() >= 12 ? '오후' : '오전' 
            let hour = message.createdAt.getHours() > 12 ? message.createdAt.getHours() - 12 : message.createdAt.getHours()
            var zerofilled = ('00'+message.createdAt.getMinutes()).slice(-2);
            message.channel.send( `${message.author} [ ${APM} ${hour}:${zerofilled} ] `+ sendingMessage)
        }



	},
};

module.exports = messageCreateModule