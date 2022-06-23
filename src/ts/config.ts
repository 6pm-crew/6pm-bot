import * as dotenv from "dotenv"
// import config from .env
dotenv.config()

// getting Discor_bot_token and scope
const {DISCORD_BOT_TOKEN,BOT_ID,MYSQL_HOST,MYSQL_PASSWD,MYSQL_PORT,MYSQL_DB,MYSQL_USER} = process.env;

// Changing Scope:string to Scope_Int:number

const DatabaseConfig = {
    user:MYSQL_USER,
    passwd:MYSQL_PASSWD,
    host:MYSQL_HOST,
    port:parseInt(MYSQL_PORT!),
    database:MYSQL_DB
    
}
export {BOT_ID,DISCORD_BOT_TOKEN,DatabaseConfig};
// export default DISCORD_BOT_TOKEN;