//MIT License
//
//Copyright (c) 2021 Foxstar
//
//Permission is hereby granted, free of charge, to any person obtaining a copy
//of this software and associated documentation files (the "Software"), to deal
//in the Software without restriction, including without limitation the rights
//to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//copies of the Software, and to permit persons to whom the Software is
//furnished to do so, subject to the following conditions:
//
//The above copyright notice and this permission notice shall be included in all
//copies or substantial portions of the Software.
//
//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
//SOFTWARE.

// Require the necessary discord.js classes
import {Client, Intents} from "discord.js"
import { toEditorSettings } from "typescript";
import {DISCORD_BOT_TOKEN} from "./config"
import {Database} from "./core/database"
import { runCmd } from "./core/functions/io";
import {Thread} from "./thread/thread"
import ExitHandler from "./utils/exitHandler";

// Create a new client instance
const client:Client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });


let database:Database = new Database();
let thread:Thread = new Thread();
let exitHandler:ExitHandler = new ExitHandler();
thread.setDatabase(database)

require("./utils/commandHandler")(client,database,exitHandler,true)
require("./utils/eventHandler")(client,database,exitHandler,true)


// Login to Discord with your client's token
client.login(DISCORD_BOT_TOKEN);


//do something when app is closing
process.on('exit', exitHandler.exitHandler.bind(null,database,{cleanup:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.exitHandler.bind(null,database, {exit:true}));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.exitHandler.bind(null,database, {exit:true}));
process.on('SIGUSR2', exitHandler.exitHandler.bind(null,database, {exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.exitHandler.bind(null,database, {exit:true}));