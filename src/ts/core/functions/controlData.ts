import mysql from 'mysql2/promise'
import {runCmd} from './io'

// export function addWord(pool:mysql.Pool,word:string[]):any;
// export function addWord(pool:mysql.Pool,word:string):any;

/**
 * 데이터베이스에 단어를 추가해준 모듈 함수
 * @param pool 
 * @param serverid 단어를 집어넣고자 하는 `guildID`
 * @param word 데이터베이스에 넣고자 하는 단어이다.
 */
export const addWord = async (pool:mysql.Pool,serverid:string,word:string |string[]) => {
    console.log(serverid)
    await runCmd(pool,`INSERT IGNORE INTO words(value) VALUES (?)`,[word])
    await runCmd(pool,`insert ignore into filterword(serverlist_index,word_id) \
    SELECT s.index, w.word_id \
    FROM serverlist s, words w \
    WHERE s.serverid = ? and w.value = ?`,
    [serverid,word])
}

export const getGuildData = async (pool:mysql.Pool,serverid:string) => {
    const word = await runCmd(pool,"SELECT w.value \
    FROM serverlist s \
    INNER JOIN filterword fw \
    ON fw.serverlist_index = s.index \
    INNER JOIN words w \
    ON w.word_id = fw.word_id \
    WHERE `serverid` = ? \
    ",[serverid])
    const channel = await runCmd(pool,"SELECT fc.channel_id \
    FROM serverlist s \
    INNER JOIN filterchannel fc \
    ON fc.serverlist_index = s.index \
    WHERE serverid = ? \
    ",[serverid])
    const result = {
        word: word,
        channel: channel
    }
    return result
}

/**
 * get serverlist that on databasew
 * @param pool database connection parameter
 */
 export const getServers = async (pool:mysql.Pool) => {
    const result = await runCmd(pool,'select CAST(serverid AS CHAR) from serverlist',undefined)
    return result;
}