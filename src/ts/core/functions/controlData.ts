import mysql from 'mysql2/promise'
import {runCmd} from './io'

// export function addWord(pool:mysql.Pool,word:string[]):any;
// export function addWord(pool:mysql.Pool,word:string):any;


export const addWord = async (pool:mysql.Pool,serverid:number,word:string |string[]) => {
    // const connection = await pool.getConnection()
    await runCmd(pool,`INSERT IGNORE INTO words(value) VALUES (?)`,[word])
    // await runCmd(pool,`insert ignore into filterword(serverlist_index,word_id) \
    // SELECT s.index, w.word_id \
    // FROM serverlist s, words w \
    // WHERE s.serverid = ${serverid} and w.value =${word}\)
    // return result`)
}
