import { SlashCommandBuilder } from '@discordjs/builders';
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
			.addUserOption(option => option.setName('target').setDescription('The user')))
	.addSubcommand(subcommand =>
		subcommand
			.setName('room')
			.setDescription('Info about the server'));

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