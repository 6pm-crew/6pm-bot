import * as dotenv from "dotenv"
// import config from .env
dotenv.config()

// getting Discor_bot_token and scope
const {DISCORD_BOT_TOKEN,SCOPE} = process.env;

// Changing Scope:string to Scope_Int:number
const SCOPE_INT:number = parseInt(SCOPE || "") || -1;

export {SCOPE_INT,DISCORD_BOT_TOKEN};
// export default DISCORD_BOT_TOKEN;