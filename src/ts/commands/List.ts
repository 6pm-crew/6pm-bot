
import { SlashCommandBuilder,SlashCommandSubcommandsOnlyBuilder } from '@discordjs/builders';
import { Channel, Interaction } from 'discord.js';
import { Database } from '../core/Database';
import { MessageEmbed } from 'discord.js';




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
    .setAuthor({name:'some name'})
    .setDescription('Some description here')
	.setTimestamp()
	.setFooter({ text: 'Some footer text here', iconURL: 'https://avatars.githubusercontent.com/u/103432358?s=200&v=4' });

    if (interaction.commandName === 'list') {
		if(interaction.options.getSubcommand() === 'room'){
			const activeArg:string = interaction.options.getString('active')!
            const result = await database.getDataChannels()
            const temp = result.get(interaction.guild?.id!)

            let indexString:string = '';
            let channelString:string = '';

            if(temp?.length === 0 ){
                Embed.addFields(
                    { name: '알림!', value: '필터링된 채널이 없습니다.' },
                    { name: '\u200B', value: '\u200B' },
                )
            }
            else{
                for(const index in temp){
                    indexString =indexString.concat((parseInt(index) + 1) + '\n');
                    channelString = channelString.concat(temp[parseInt(index)] + '\n')
                }
    
                Embed.addField("번호",indexString,true)
                Embed.addField("단어",channelString,true)
            }

            await interaction.reply({embeds:[Embed]})
            // { name: 'index', value: '1\n2\n3', inline: true },
            // { name: '단어', value: 'Some value here\ntesting\ntesing', inline: true },
		}
		else if(interaction.options.getSubcommand() === 'word'){
			const activeArg:string = interaction.options.getString('active')!
            const result = database.getDataWords()

            const temp = result.get(interaction.guild?.id!)

            console.log(temp)
            let indexString:string = '';
            let wordString:string = '';

            if(temp?.length === 0 ){
                Embed.addFields(
                    { name: '알림!', value: '필터링된 단어이 없습니다.' },
                    { name: '\u200B', value: '\u200B' },
                )
            }
            else{
                for(const index in temp){
                    indexString =indexString.concat((parseInt(index) + 1) + '\n');
                    wordString = wordString.concat(temp[parseInt(index)] + '\n')
                }
    
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