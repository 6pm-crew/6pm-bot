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

import mysql from 'mysql2/promise'
import { Database } from '../database'
import {runCmd} from './io'
// https://stackoverflow.com/questions/42790602/how-do-i-check-whether-an-array-contains-a-string-in-typescript -> not conatian 함수

/**
 * 데이터베이스에 기재된 모든 `guildID`를 가지고 옵니다.
 * 
 * @param pool 데이터베이스 연결 `pool`입니다.
 */
 export const getServers = async (pool:mysql.Pool) => {
    const result = await runCmd(pool,'select CAST(serverid AS CHAR) from serverlist',undefined)
    return result;
}

/**
 * 데이터베이스 저장되어있느 `text channel` 필터 목록이나 `단어` 필터 목록을 불러옵니다.
 * 
 * @param pool 데이터베이스 pool 클라스
 * @param serverid 데이터를 얻고자 하는 `guildID`
 * @returns `{word,channel}`의 형식으로 반환합니다.
 */
 export const getGuildData = async (pool:mysql.Pool,serverid:string) => {
    const word = await getWordDB(pool,serverid)
    const channel = await getChannelDB(pool,serverid)
    const result = {
        word: word,
        channel: channel
    }
    return result
}

/**
 * 특정 서버에서 사용하고 있는 단어를 가지고 옵니다.
 * 
 * @param pool 데이터베이스 pool 클라스
 * @param serverid 데이터를 얻고자 하는 `guildID`
 * @returns `string[]` 형식의 단어 배열을 반환합니다.
 */
export const getWordDB = async (pool:mysql.Pool,serverid:string) => {
    const word = await runCmd(pool,"SELECT w.value \
    FROM serverlist s \
    INNER JOIN filterword fw \
    ON fw.serverlist_index = s.index \
    INNER JOIN words w \
    ON w.word_id = fw.word_id \
    WHERE `serverid` = ? \
    ",[serverid])
    return word
}

/**
 * 특정 서버에서 필터링하고 있는 `textchannel` 가지고 옵니다.
 * 
 * @param pool 데이터베이스 pool 클라스
 * @param serverid 데이터를 얻고자 하는 `guildID`
 * @returns `string[]` 형식의 `guildID` 배열을 반환합니다.
 */
export const getChannelDB = async (pool:mysql.Pool,serverid:string) => {
    const channel = await runCmd(pool,"SELECT CAST(fc.channel_id as CHAR) \
    FROM serverlist s \
    INNER JOIN filterchannel fc \
    ON fc.serverlist_index = s.index \
    WHERE serverid = ? \
    ",[serverid])
    return channel
}
/* guild 관련 함수*/

export const addGuildDB = async (pool:mysql.Pool,serverid:string) => {
    await runCmd(pool,"insert ignore into serverlist(serverid) values ?",[serverid])
}

export const removeGuildDB = async (pool:mysql.Pool,serverid:string) => {
    await runCmd(pool,"")
}


/* 단어 제어 관련 함수 */


/**
 * 데이터베이스에 단어를 추가해준 모듈 함수
 * @param pool 데이터베이스 pool 클라스
 * @param serverid 단어를 집어넣고자 하는 `guildID`
 * @param word 데이터베이스에 넣고자 하는 단어입니다.
 */
export const addWordDB = async (pool:mysql.Pool,serverid:string,word:string |string[]) => {
    console.log([serverid,word])
    await runCmd(pool,`INSERT IGNORE INTO words(value) VALUES (?)`,[word])
    await runCmd(pool,`insert ignore into filterword(serverlist_index,word_id) \
    SELECT s.index, w.word_id \
    FROM serverlist s, words w \
    WHERE s.serverid = ? and w.value = ?`,
    [serverid,word])
}

/**
 * 데이터베이스에 단어를 제거해주는 모듈 함수
 * @param pool 데이터베이스 pool 클라스
 * @param serverid 단어를 빼고자 하는 `guildID`
 * @param word 데이터베이스에 빼고자 하는 단어입니다.
 */
export const removeWordDB = async (pool:mysql.Pool,serverid:string,word:string | string[]) => {
    await runCmd(pool,
                    "DELETE FROM        filterword\
                    WHERE               serverlist_index\
                    IN                  (\
                        select              `index`\
                        FROM                serverlist\
                        WHERE               `serverid` = ?\
                        )\
                    AND                 `word_id`\
                    IN                  (\
                        SELECT              `word_id`\
                        FROM                words\
                        WHERE               `value` = ?\
                        )",
                    [serverid,word])
}


/* 채널 관련 함수 */

/**
 * 데이터베이스에 채팅방을 제거해주는 모듈 함수
 * 
 * @param pool 데이터베이스 pool 클라스
 * @param serverid 채팅방을 빼고자 하는 `guildID`
 * @param channelID 데이터베이스에 빼고자 하는 `textchannel`입니다.
 */
export const removeChannelDB = async (pool:mysql.Pool,serverid:string,channelID:string | string[]) => {
    console.log("ChannelID: ",channelID)
    await runCmd(pool,
        "DELETE FROM        filterchannel\
        WHERE               serverlist_index\
        IN                  (\
            select              `index`\
            FROM                serverlist\
            WHERE               `serverid` = ?\
            )\
        AND                 `channel_id` = ?\
            ",
        [serverid,channelID])
}

/**
 * 데이터베이스에 채팅방을 추가해주는 모듈 함수
 * 
 * @param pool 데이터베이스 pool 클라스
 * @param serverid 채팅방을 넣고자 하는 `guildID`
 * @param channelID 데이터베이스에 넣고자 하는 `textchannel`입니다.
 */
export const addChanelDB = async (pool:mysql.Pool,serverid:string,channelID:string | string[]) => {
    await runCmd(pool,
        "insert             ignore into filterchannel(serverlist_index,channel_id) \
        Values              (\
            ( \
                SELECT              `index` \
                FROM                serverlist \
                WHERE               serverid = ?\
            ),\
            ?\
        )",
        [serverid,channelID]
    )
}


