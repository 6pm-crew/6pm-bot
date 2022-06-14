import * as fs from 'fs'
import {Client, Intents} from "discord.js"
// const { Client, Intents } = require('discord.js');
// const { DISCORDBOTTOKEN } = require('../../config.json');

const getFiles = (path,ending) =>{
    return fs.readdirSync(path).filter(f => f.endsWith(ending))
}

module.exports = (bot:Client<boolean>,reload) => {
    
    let slashComamnds = getFiles("../commands",".js")

    if(slashComamnds.length === 0)
        console.log("no slash command loaded")
}