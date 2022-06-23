import {Client} from "discord.js"
import { Database } from "../core/Database";


export const onReadyModule = {
	name: 'ready',
	once: true,
	execute(database:Database,client:Client<boolean>) {
		console.log(`Ready! Logged in as ${client.user!.tag}`);
	},
};

module.exports = onReadyModule
