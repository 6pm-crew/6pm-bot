// Require the necessary discord.js classes
import {Client, Intents} from "discord.js"
import {DISCORD_BOT_TOKEN} from "./config"
import {Database} from "./core/Database"
import { runCmd } from "./core/functions/io";
import {Thread} from "./thread/Thread"
import { exitHandler } from "./utils/exitHandler";

// Create a new client instance
const client:Client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', async() => {
	console.log('Ready!');
});

let database:Database = new Database();
let thread:Thread = new Thread();
thread.setDatabase(database)


// runCmd(database.getMysqlPool(),`insert ignore into filterword(serverlist_index,word_id) \
//     SELECT s.index, w.word_id \
//     FROM serverlist s, words w \
//     WHERE s.serverid = ? and w.value = ?`,
//     ["test",["a","b","c","d"]])
require("./utils/CommandHandler")(client,database,true)

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