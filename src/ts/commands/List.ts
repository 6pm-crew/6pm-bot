
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




/**
 * `slashcommand`를 만들기 위한 `builder`이다.
 */
const data = new SlashCommandBuilder()
	.setName('list')
	.setDescription('Get info about a user or a server!')
	//서버 커맨드 `word` 를 만드는 부분이다.
	.addSubcommand(subcommand =>
		subcommand
			.setName('word')
			.setDescription('필터링된 단어를 보여줍니다.')
	)
	//서브 커맨드 `room` 를 만드는 부분이다.
	.addSubcommand(subcommand =>
		subcommand
			.setName('room')
			.setDescription('필터링된 채널을 보여줍니다.')
	)

/**
 * 이 함수는 `slash command`의 사용에 반응하는 `async` 함수입니다.
 * 
 * @param interaction `slash command` 사용시 반응하여 `slashcommand`의 정보가 interation을 통해서 들어가게 됩니다.
 * @param database 디스코드 봇이 사용하는 database 정보가 들어가있는 매개변수입니다.
 * @returns `promise<void>` 형식으로 `slash command`사용 후 반환됩니다.
 */
const response = async (interaction:Interaction,database:Database) => {
    if (!interaction.isCommand()) return;

    const Embed = new MessageEmbed()
        .setColor('#a73a17')    
        .setTitle("필터링된 단어 목록")
        .setAuthor({name:'6pmbot'})
        .setDescription('필터링된 목록을 확인하실 수 있습니다.')
        .setTimestamp()
        .setFooter({ text: '6pmbot', iconURL: 'https://avatars.githubusercontent.com/u/103432358?s=200&v=4' });

    if (interaction.commandName === 'list') {
        // 관리자의 권한을 가지고 있지 않다면 실행하지 못하도록 하는 부분입니다.
        const testing = interaction.member! as GuildMember
        if(!testing.permissions.has(Permissions.FLAGS.MANAGE_ROLES)){
            await interaction.reply('권한이 없습니다.')
            return
            
        }

        // 채널과 관련된 서브 명령어가 실행됐을 경우에 실행되는 부분입니다.
		if(interaction.options.getSubcommand() === 'room'){
			const activeArg:string = interaction.options.getString('active')!
            const result = await database.getDataChannels()
            const temp = result.get(interaction.guild?.id!)
            // 검색한 채널를 추가하면서 인덱스를 만들어준다.
            let indexString:string = '';
            // 검색한 채널를 순차하면서 단어 배열을 '\n'을 추가한 문자열을 만들어준다.
            let channelString:string = '';

            // 검색 결과의 길이가 0이라면 등록된 채널이 없으므로 없다는 것으로 반환한다.
            if(temp?.length === 0 ){
                //없을 경우에 생기는 필터링입니다.
                Embed.addFields(
                    { name: '알림!', value: '필터링된 채널이 없습니다.' },
                    { name: '\u200B', value: '\u200B' },
                )
            }
            else{
                // 있을 경우 받아온 채널을 토대로 `indexString`과 `channelString`을 만듭니다.
                for(const index in temp){
                    indexString =indexString.concat((parseInt(index) + 1) + '\n');
                    channelString = channelString.concat(temp[parseInt(index)] + '\n')
                }
    
                //만든 문자열을 필드로 넣어줍니다.
                Embed.addField("번호",indexString,true)
                Embed.addField("단어",channelString,true)
            }

            await interaction.reply({embeds:[Embed]})
		}
        // 단어와 관련된 서브 명령어가 실행됐을 경우에 실행되는 부분입니다.
		else if(interaction.options.getSubcommand() === 'word'){
			const activeArg:string = interaction.options.getString('active')!
            const result = database.getDataWords()

            const temp = result.get(interaction.guild?.id!)

            // 검색한 단어를 추가하면서 인덱스를 만들어준다.
            let indexString:string = '';
            // 검색한 채널를 순차하면서 단어 배열을 '\n'을 추가한 문자열을 만들어준다.
            let wordString:string = '';

            // 검색 결과의 길이가 0이라면 등록된 단어가 없으므로 없다는 것으로 반환한다.
            if(temp?.length === 0 ){
                //없을 경우에 생기는 필터링입니다.
                Embed.addFields(
                    { name: '알림!', value: '필터링된 단어이 없습니다.' },
                    { name: '\u200B', value: '\u200B' },
                )
            }
            else{
                // 있을 경우 받아온 단어를 토대로 `indexString`과 `channelString`을 만듭니다.
                for(const index in temp){
                    indexString =indexString.concat((parseInt(index) + 1) + '\n');
                    wordString = wordString.concat(temp[parseInt(index)] + '\n')
                }
    
                //만든 문자열을 필드로 넣어줍니다.
                Embed.addField("번호",indexString,true)
                Embed.addField("단어",wordString,true)
            }

            await interaction.reply({embeds:[Embed]})

		}
		else{
			await interaction.reply('명령어를 찾을 수 없습니다.')
		}
    }
}


export {data,response}