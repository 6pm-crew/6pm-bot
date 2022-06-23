import { Message } from 'discord.js';
import { Database } from '../core/Database';


/**
 * 이벤트를 실행하기 위한 json 변수
 */
export const messageCreateModule = {
	name: 'messageCreate',
	execute(database:Database,message:Message) {
        if(message.author.bot) return
        let sendingMessage:string = message.content;
        let deleteMessage:Boolean = false;
        database.getDataWords().get(message.guild?.id!)?.forEach(element => {
            if(message.content.includes(element)){
                deleteMessage = true
                let filterStar = "꘎".repeat(element.length)
                sendingMessage = sendingMessage.replace(element,filterStar)
            }

        })
        if(deleteMessage){
            message.delete()
        }
        let APM = message.createdAt.getHours() >= 12 ? '오후' : '오전' 
        let hour = message.createdAt.getHours() > 12 ? message.createdAt.getHours() - 12 : message.createdAt.getHours()
        message.channel.send( `${message.author} [ ${APM} ${hour}:${message.createdAt.getMinutes()} ] `+ sendingMessage)


	},
};

module.exports = messageCreateModule