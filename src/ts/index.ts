// Require the necessary discord.js classes
import {Client, Intents} from "discord.js"
import {DISCORD_BOT_TOKEN} from "./config"
import {Database} from "./core/Database"
import {Thread} from "./thread/Thread"

// Create a new client instance
const client:Client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', async() => {
	console.log('Ready!');
	let thread:Thread = new Thread();
});

let database:Database = new Database();


require("./utils/CommandHandler")(client,database,true)

// Login to Discord with your client's token
client.login(DISCORD_BOT_TOKEN);