import * as dotenv from "dotenv"
// import config from .env
dotenv.config()

// getting Discor_bot_token and scope
const {DISCORD_BOT_TOKEN,SCOPE} = process.env;

// Changing Scope:string to Scope_Int:number
const SCOPE_INT:number = parseInt(SCOPE);
const DISCORD_TOKEN:string = DISCORD_BOT_TOKEN;

export {SCOPE_INT,DISCORD_TOKEN};
// export default DISCORD_BOT_TOKEN;