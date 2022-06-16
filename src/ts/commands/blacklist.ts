import { SlashCommandBuilder,SlashCommandSubcommandsOnlyBuilder } from '@discordjs/builders';
import { Interaction } from 'discord.js';
/**
 * 
 */
const data = new SlashCommandBuilder()
	.setName('blacklist')
	.setDescription('Get info about a user or a server!')
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
	.addSubcommand(subcommand =>
		subcommand
			.setName('room')
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
			.addChannelOption((option) =>
				option
					.setName('channel')
					.setDescription('select channel that will be filtered')
					.setRequired(true)
			)
	)

/**
 * 
 * 
 * @param interaction when slashcommand is triggered then slashcommand data is stored through this parameter
 * @returns `promise<void>` return promise for response for slashcommand
 */
const response = async (interaction:Interaction) => {
    if (!interaction.isCommand()) return;
    console.log(interaction);

    if (interaction.commandName === 'gif') {
        await interaction.reply('Pong!');
    }
}


export {data,response}