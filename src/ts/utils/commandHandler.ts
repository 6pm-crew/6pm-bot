/**
 * 커맨드 헨들러에 등록하고 싶다면  항상 `data`와 `response`가 `export`되어있어야 합니다.
 */


import * as fs from 'fs'
import {Client, Intents} from "discord.js"
import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Database } from '../core/Database';

// const { Client, Intents } = require('discord.js');
import {DISCORD_BOT_TOKEN,DatabaseConfig} from "../config"

import { Routes } from 'discord-api-types/v9';

/**
 * 특정 디렉토리에서 파일을 가지고 옵니다.
 * 
 * @param path where command module is located
 * @param ending file end with
 * @returns type `string[]` that `ending` files paths 
 */
 export const getFiles = (path:string,ending:string) =>{
    return fs.readdirSync(path).filter(f => f.endsWith(ending))
}

/**
 * 모든 `slashCommands`을 `commands` 파일에서부터 불러서 저장합니다.
 */
export const commands:JSON[] = [];

/**
 * 이 함수는 `moudle.exports`를 통해 `slashCommand`를 핸들링하기 위한 함수입니다.
 * 
 * @param bot 디스코드 봇을 실행한 bot/client 클라스입니다.
 * @param database 데이터베이스를 저장하고 있는 클라스입니다.
 * @param reload 재시작 여부를 넣는 변수입니다.
 */
export const slashCommandHandler = (bot:Client<boolean>,database:Database,reload:boolean) => {

    let slashComamnds = getFiles("./build/commands",".js")
    // `commands` 폴더에 커맨드가 없는 예외처리
    if(slashComamnds.length === 0)
        console.log("no slash command loaded")

    console.log(slashComamnds)
    // `commands` 폴더에서 실제 커맨드를 불러옵니다.
    for (const path of slashComamnds){
        const command = require(`../commands/${path}`)
        bot.on('interactionCreate',interaction => command.response(interaction,database));
        commands.push(command.data.toJSON())
    }
    // 불러온 커맨드를 등록해줍니다.
    run(commands)

}

/**
 * 커맨드 핸들러를 실행하기 위한 함수입니다.
 * 
 * @param commands `slashcommandbuilder`를 통해 만들어진 클라스를 JSON 형식으로 바꾼 배열을 넣는 매겨변수입니다.
 */
export const run = (commands:JSON[]) =>{
    const rest = new REST({ version: '9' }).setToken(DISCORD_BOT_TOKEN!);
    (async () => {
        try {
            console.log('Started refreshing application (/) commands.');
    
            await rest.put(
                Routes.applicationCommands('897061776624091148'),
                { body: commands },
            );
    
            console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        }
    })();
}


module.exports = slashCommandHandler
