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
	/** 이벤트 이름입니다. */
	name: 'messageUpdate',
    /**
     * 메세지 값을 받을 때 사용하는 이벤트 핸들러입니다.
     * 
     * @param database 데이터베이스를 저장하고 있는 클라스입니다.
     * @param message 채팅시에 들어오는 매개변수 값이며, 채팅친 정보에 대한 데이터가 들어옵니다.
     * @returns `undefined | null`로 반환값은 없습니다.
     */
	execute(database:Database,oldMessage:Message,newMessage:Message) {
        console.log("running")
        // 디스코드 봇도 이벤트 핸드러에 들어가기 때문에 봇이라면 반환하여 실행하지 않도록 합니다.
        if(newMessage.author.bot) return
        // 사용자가 친 메세지 값을 받아옵니다.
        let sendingMessage:string = newMessage.content;
        // 사용자가 친 메시지의 삭제 여부를 결정할 변수입니다.
        let deleteMessage:Boolean = false;
        
        // 단어를 확인하기 전에 채팅을 치면 안되는 채팅방인지 확인하고 맞다면 메세지를 삭제하고 반환합니다.
        for(const element of database.getDataChannels().get(newMessage.guild?.id!)!){
            if(newMessage.author.bot){
                return
            }
            if(element === newMessage.guild?.id){
                newMessage.delete()
                return
            }
        }

        // 데이터베이스에 들어가있는 단어를 확인하여 현재 채팅에 있다면 *모양으로 대체합니다.
        database.getDataWords().get(newMessage.guild?.id!)?.forEach(element => {
            if(newMessage.content.includes(element)){
                deleteMessage = true
                let filterStar = "∗".repeat(element.length)
                sendingMessage = sendingMessage.replace(element,filterStar)
            }

        })

        // 필터링을 해야하는 채팅이 맞다면 채팅을 삭제하고 다시 필터링한 채팅으로 보내서 마무리 합니다.
        if(deleteMessage){
            newMessage.delete()
            let APM = newMessage.createdAt.getHours() >= 12 ? '오후' : '오전' 
            let hour = newMessage.createdAt.getHours() > 12 ? newMessage.createdAt.getHours() - 12 : newMessage.createdAt.getHours()
            var zerofilled = ('00'+newMessage.createdAt.getMinutes()).slice(-2);
            newMessage.channel.send( `${newMessage.author} [ ${APM} ${hour}:${zerofilled} ] `+ sendingMessage)
        }


        

	},
};

module.exports = messageCreateModule