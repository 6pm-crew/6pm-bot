import * as dotenv from "dotenv"

dotenv.config()
const {DISCORD_BOT_TOKEN,SCOPE} = process.env;

interface configFile {
    DISCORD_BOT_TOKEN: string,
    SCOPE_INT : number
}
const SCOPE_INT:number = parseInt(SCOPE); 

const config:configFile = {
    DISCORD_BOT_TOKEN,SCOPE_INT
}
export default config