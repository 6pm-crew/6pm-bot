/**
 * Always need to have `data`, `response` for register slash command
 */


import * as fs from 'fs'
import {Client, Intents} from "discord.js"
import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Database } from '../core/database';

// const { Client, Intents } = require('discord.js');
import {DISCORD_BOT_TOKEN,DatabaseConfig} from "../config"

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
 * this function is for export by `module.exports` to handler slashCommand
 * 
 * @param bot discord data that start in `index`
 * @param reload discord reload boolean
 */
export const slashCommandHandler = (bot:Client<boolean>,database:Database,reload:boolean) => {

    let slashComamnds = getFiles("./build/commands",".js")
    // exception check for above commands line didn't read `commands` folder `commands`
    if(slashComamnds.length === 0)
        console.log("no slash command loaded")

    console.log(slashComamnds)
    //getting commands in `commnds` folder 
    for (const path of slashComamnds){
        const command = require(`../commands/${path}`)
        bot.on('interactionCreate',interaction => command.response(interaction,database));
        commands.push(command.data.toJSON())
    }
    // registering the slash commands 
    run(commands)

}

/**
 * this function is for running 
 * 
 * @param commands put commands that transform to `JSON`
 */
export const run = (commands:JSON[]) =>{
    const rest = new REST({ version: '9' }).setToken(DISCORD_BOT_TOKEN!);
    console.log(DatabaseConfig);
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
