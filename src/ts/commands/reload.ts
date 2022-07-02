
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

import { SlashCommandBuilder,SlashCommandSubcommandsOnlyBuilder } from '@discordjs/builders';
import { Channel, GuildMember, Interaction } from 'discord.js';
import { Database } from '../core/database';
import { MessageEmbed } from 'discord.js';
import { Permissions } from 'discord.js';
import ExitHandler from '../utils/exitHandler';




/**
 * `slashcommand`를 만들기 위한 `builder`입니다.
 */
const data = new SlashCommandBuilder()
	.setName('reload')
	.setDescription('서버를 재시작합니다.')

/**
 * 이 함수는 `slash command`의 사용에 반응하는 `async` 함수입니다.
 * 
 * @param interaction `slash command` 사용시 반응하여 `slashcommand`의 정보가 interation을 통해서 들어가게 됩니다.
 * @param database 디스코드 봇이 사용하는 database 정보가 들어가있는 매개변수입니다.
 * @returns `promise<void>` 형식으로 `slash command`사용 후 반환됩니다.
 */
const response = async (interaction:Interaction,database:Database,exitHandler:ExitHandler) => {
    if (!interaction.isCommand()) return;

    const Embed = new MessageEmbed()
        .setColor('#a73a17')    
        .setTitle("서버를 재시작합니다.")
        .setAuthor({name:'6pmbot'})
        .setTimestamp()
        .setFooter({ text:"", iconURL: 'https://avatars.githubusercontent.com/u/103432358?s=200&v=4' });

    await interaction.client.application?.fetch()
    if(interaction.commandName === 'reload'){
        // 봇 만든 본인이 자신인지 확인합니다.
        console.log(interaction.user.id)
        console.log(interaction.guild?.client.application?.owner?.id)
        if(interaction.client.application?.owner?.id !== interaction.user.id){
            await interaction.reply('권한이 없습니다.')
            return
            
        }
        
        await interaction.reply({embeds:[Embed]})
        exitHandler.exit(ExitHandler.RELOAD)
    }

}


export {data,response}