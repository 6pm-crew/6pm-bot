import mysql from 'mysql2/promise'
import { Database } from '../Database'
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
 * @param word 데이터베이스에 넣고자 하는 단어이다.
 */
export const addWordDB = async (pool:mysql.Pool,serverid:string,word:string |string[]) => {
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
 * @param serverid 단어를 집언허고자 하는 `guildID`
 * @param word 데이터베이스에 넣고자 하는 단어이다.
 */
export const removeWordDB = async (pool:mysql.Pool,serverid:string,word:string | string[]) => {
    await runCmd(pool,
                    "DELETE FROM    filterword \
                    WHERE           word_id\
                    IN              (\
                        select          `word_id`\
                        FROM            words\
                        WHERE           `value` = ?\
                        )",
                        [word])
}


/* 채널 관련 함수 */

export const removeChannelDB = () => {

}

export const addChanelDB = () => {

}
