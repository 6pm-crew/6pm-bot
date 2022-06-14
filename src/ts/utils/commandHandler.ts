import * as fs from 'fs'
import {Client, Intents} from "discord.js"
// const { Client, Intents } = require('discord.js');
// const { DISCORDBOTTOKEN } = require('../../config.json');

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
 * test
 * @param bot test
 * @param reload est
 */
export const slashCommandHandler = (bot:Client<boolean>,reload:any) => {

    let slashComamnds = getFiles("../commands",".js")

    if(slashComamnds.length === 0)
        console.log("no slash command loaded")
}

module.exports = slashCommandHandler
