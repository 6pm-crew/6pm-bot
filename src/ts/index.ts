// Require the necessary discord.js classes
import {Client, Intents} from "discord.js"
import {DISCORD_BOT_TOKEN} from "./config"
import {Database} from "./core/database"

// Create a new client instance
const client:Client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

let database:Database = new Database();
require("./utils/commandHandler")(client,true)

// Login to Discord with your client's token
client.login(DISCORD_BOT_TOKEN);