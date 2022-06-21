// Require the necessary discord.js classes
import {Client, Intents} from "discord.js"
import {DISCORD_BOT_TOKEN} from "./config"
import {Database} from "./core/Database"
import { runCmd } from "./core/functions/io";
import {Thread} from "./thread/Thread"


// Create a new client instance
const client:Client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', async() => {
	console.log('Ready!');
});

let database:Database = new Database();
let thread:Thread = new Thread();
thread.setDatabase(database)


runCmd(database.getMysqlPool(),`insert ignore into filterword(serverlist_index,word_id) \
    SELECT s.index, w.word_id \
    FROM serverlist s, words w \
    WHERE s.serverid = ? and w.value = ?`,
    ["test",["a","b","c","d"]])
require("./utils/CommandHandler")(client,database,true)

// Login to Discord with your client's token
client.login(DISCORD_BOT_TOKEN);