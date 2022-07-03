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
const {
    /** 디스코드 봇 실행 시 사용하는 토큰 값입니다. */
    DISCORD_BOT_TOKEN,
    /** 디스코드 `clint ID` 입니다. */
    BOT_ID,
    MYSQL_HOST,
    MYSQL_PASSWD,
    MYSQL_PORT,
    MYSQL_DB,
    MYSQL_USER,
    GITHUB_REMOTE,
    GITHUB_BRANCH,
    UNIX_PASSWD
} = process.env;

// Changing Scope:string to Scope_Int:number

/**
 * 데이터베이스의 전체적인 `configuration` 정보를 가지고 있습니다.
 */
const DatabaseConfig = {
    /** mysql 사용자 정보입니다 */
    user:MYSQL_USER,
    /** 데티어베이스 사용자 비밀번호입니다. */
    passwd:MYSQL_PASSWD,
    /** mysql 호스트 주소입니다.(예시: 192.168.***.***) */
    host:MYSQL_HOST,
    /** mysql 사용하는 포트입니다. */
    port:parseInt(MYSQL_PORT!),
    /** mysql 사용하는 데이터베이스 이름입니다. */
    database:MYSQL_DB
    
}

const GithubConfig = {
    remote:GITHUB_REMOTE as string,
    branch:GITHUB_BRANCH as string,
    passwd:UNIX_PASSWD as string
}
export {
    BOT_ID,
    DISCORD_BOT_TOKEN,
    DatabaseConfig,
    GithubConfig
};
// export default DISCORD_BOT_TOKEN;