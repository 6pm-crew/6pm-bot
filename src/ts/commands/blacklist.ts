
import { SlashCommandBuilder,SlashCommandSubcommandsOnlyBuilder } from '@discordjs/builders';
import { Interaction } from 'discord.js';
import { Database } from '../core/Database';
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

    if (interaction.commandName === 'blacklist') {
		if(interaction.options.getSubcommand() === 'room'){
			const activeArg:string = interaction.options.getString('active')!
			if(activeArg === 'add'){
				// TODO 블랙리스트 추가해야 됨
			}
			else if(activeArg === 'remove'){
				// TODO 블랙리스트 삭제 함수 추가해야됨
			}
			await interaction.reply('room!');
		}
		else if(interaction.options.getSubcommand() === 'word'){
			const activeArg:string = interaction.options.getString('active')!
			const word:string = interaction.options.getString('word')!
			console.log(activeArg)
			if(activeArg === 'add'){
				console.log(interaction.guild?.id)
				database.addWordDB(interaction.guild?.id!,word)
				// TODO 블랙리스트 추가해야 됨
			}
			else if(activeArg === 'remove'){
				// TODO 블랙리스트 삭제 함수 추가해야됨
			}
			await interaction.reply('word!');
		}
		else{
			await interaction.reply('command not found!')
		}
    }
}


export {data,response}