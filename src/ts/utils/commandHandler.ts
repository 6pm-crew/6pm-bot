import * as fs from 'fs'
import {Client, Intents} from "discord.js"
import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';

// const { Client, Intents } = require('discord.js');
import {DISCORD_BOT_TOKEN} from "../config"

import { Routes } from 'discord-api-types/v9';

/**
 * get files from specific path 
 * 
 * @param path where command module is located
 * @param ending file end with
 * @returns type `string[]` that `ending` files paths 
 */
 export const getFiles = (path:string,ending:string) =>{
    return fs.readdirSync(path).filter(f => f.endsWith(ending))
}

/**
 * Save all slashCommands that read from `commands` files
 */
export const commands:JSON[] = [];

/**
 * test
 * @param bot discord data that start in `index`
 * @param reload discord reload boolean
 */
export const slashCommandHandler = (bot:Client<boolean>,reload:boolean) => {

    let slashComamnds = getFiles("./build/commands",".js")

    if(slashComamnds.length === 0)
        console.log("no slash command loaded")

    console.log(slashComamnds)

    for (const path of slashComamnds){
        const command = require(`../commands/${path}`)
        bot.on('interactionCreate',interaction => command.response(interaction));
        commands.push(command.data.toJSON())
    }

    run(commands)

}


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
