
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
import { GuildMember, Interaction } from 'discord.js';
import { Database } from '../core/database';
import { Permissions } from 'discord.js';
/**
 * `slashcommand`를 만들기 위한 `builder`이다.
 */
const data = new SlashCommandBuilder()
	.setName('blacklist')
	.setDescription('Get info about a user or a server!')
	//서버 커맨드 `word` 를 만드는 부분이다.
	.addSubcommand(subcommand =>
		subcommand
			.setName('word')
			.setDescription('set filter for word')
			.addStringOption((option) =>
				option
					.setName('active')
					.setDescription('What action should be taken with the users points?')
					.addChoices(
						{ name: 'Add', value: 'add' },
						{ name: 'Remove', value: 'remove' },
					)
					.setRequired(true),
			)
			.addStringOption((option) =>
						option
							.setName('word')
							.setDescription('What action should be taken with the users points?')
							.setRequired(true)
					)
	)
	//서브 커맨드 `room` 를 만드는 부분이다.
	.addSubcommand(subcommand =>
		subcommand
			.setName('room')
			.setDescription('set filter for room')
			.addStringOption((option) =>
				option
					.setName('active')
					.setDescription('What action should be taken with the users points?')
					.addChoices(
						{ name: 'Add', value: 'add' },
						{ name: 'Remove', value: 'remove' },
					)
					.setRequired(true),
			)
			.addChannelOption((option) =>
				option
					.setName('channel')
					.setDescription('select channel that will be filtered')
					.setRequired(true)
			)
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
	const testing = interaction.member! as GuildMember
	if(!testing.permissions.has(Permissions.FLAGS.MANAGE_ROLES)){
		await interaction.reply('권한이 없습니다.')
		return
	}
    if (interaction.commandName === 'blacklist') {
		if(interaction.options.getSubcommand() === 'room'){
			const activeArg:string = interaction.options.getString('active')!
			const channel = interaction.options.getChannel("channel");
			console.log(channel?.id);
			if(activeArg === 'add'){
				if(!database.addChannel(interaction.guild?.id!,channel?.id!)){
					await interaction.reply(`${channel}라는 채널는 이미 존재합니다.`)
					return
				}
				await interaction.reply(`${channel}가 성공적으로 추가되었습니다.`);
				return
				// TODO 블랙리스트 추가해야 됨
			}
			else if(activeArg === 'remove'){
				// TODO 블랙리스트 삭제 함수 추가해야됨
				if(!database.removeChannel(interaction.guild?.id!,channel?.id!)){
					await interaction.reply(`${channel}라는 채널는 존재하지 않습니다.`)
					return
				}
				await interaction.reply(`${channel}가 성공적으로 삭제되었습니다.`);
				return
			}
			
		}
		else if(interaction.options.getSubcommand() === 'word'){
			const activeArg:string = interaction.options.getString('active')!
			const word:string = interaction.options.getString('word')!
			if(activeArg === 'add'){
				if(!database.addWord(interaction.guild?.id!,word)){
					await interaction.reply(`${word}라는 단어는 이미 존재합니다.`)
					return
				}
				await interaction.reply(`${word}가 성공적으로 추가되었습니다.`);
				return
			}
			else if(activeArg === 'remove'){
				if(!database.removeWord(interaction.guild?.id!,word)){
					await interaction.reply(`${word}라는 단어는 존재하지 않습니다.`)
					return;
				}
				await interaction.reply(`${word}가 성공적으로 삭제되었습니다.`);
				return
			}
		}
		else{
			await interaction.reply('command not found!')
		}
    }
}


export {data,response}