// Require the necessary discord.js classes
import {Client, Intents} from "discord.js"
import { toEditorSettings } from "typescript";
import {DISCORD_BOT_TOKEN} from "./config"
import {Database} from "./core/database"
import { runCmd } from "./core/functions/io";
import {Thread} from "./thread/thread"
import { exitHandler } from "./utils/exitHandler";

// Create a new client instance
const client:Client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });


let database:Database = new Database();
let thread:Thread = new Thread();
thread.setDatabase(database)

require("./utils/commandHandler")(client,database,true)
require("./utils/eventHandler")(client,database,true)

// client.on('message', message => {
// 	console.log(message.content)
// });


// Login to Discord with your client's token
client.login(DISCORD_BOT_TOKEN);

//do something when app is closing
process.on('exit', exitHandler.bind(null,database,{cleanup:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null,database, {exit:true}));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null,database, {exit:true}));
process.on('SIGUSR2', exitHandler.bind(null,database, {exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null,database, {exit:true}));