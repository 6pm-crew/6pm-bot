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

import * as dotenv from "dotenv"
// import config from .env
dotenv.config()

// getting Discor_bot_token and scope
const {DISCORD_BOT_TOKEN,BOT_ID,MYSQL_HOST,MYSQL_PASSWD,MYSQL_PORT,MYSQL_DB,MYSQL_USER} = process.env;

// Changing Scope:string to Scope_Int:number

/**
 * 
 */
const DatabaseConfig = {
    user:MYSQL_USER,
    passwd:MYSQL_PASSWD,
    host:MYSQL_HOST,
    port:parseInt(MYSQL_PORT!),
    database:MYSQL_DB
    
}
export {BOT_ID,DISCORD_BOT_TOKEN,DatabaseConfig};
// export default DISCORD_BOT_TOKEN;