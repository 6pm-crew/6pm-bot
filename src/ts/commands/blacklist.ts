
import { SlashCommandBuilder,SlashCommandSubcommandsOnlyBuilder } from '@discordjs/builders';
import { Interaction } from 'discord.js';
import { Database } from '../core/database';
/**
 * function of building slashcommand 
 */
const data = new SlashCommandBuilder()
	.setName('blacklist')
	.setDescription('Get info about a user or a server!')
	//this is for subcommand `word`
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
	//this is for subcommand `room`
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
 * This `async` funciton is for responsing 
 * 
 * @param interaction when slashcommand is triggered then slashcommand data is stored through this parameter
 * @returns `promise<void>` return promise for response for slashcommand
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
			const activeArg:string = interaction.options.getString('word')!
			if(activeArg === 'add'){
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