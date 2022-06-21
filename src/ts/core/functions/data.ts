import mysql from 'mysql2/promise'
import { Database } from '../Database'
import {runCmd} from './io'

/**
 * 저장되어있는 `guildID`를 `serverid`를 통해서 제거한다.
 * 
 * @param database 데이터베이스 기본 클라스
 * @param serverid 삭제될 `guildID` 
 */
export const removeGuild = (database:Database,serverid:string) => {
    database.getDataChannels().delete(serverid)
    database.getDataWords().delete(serverid)
}

/**
 * `serverid`를 통해서 `database` 추가한다.
 * 
 * @param database 데이터베이스 기본 클라스
 * @param serverid 추가될 `guildID` 
 */
export const addGuild = (database:Database,serverid:string) => {
    database.getDataChannels().set(serverid,[])
    database.getDataWords().set(serverid,[])
}

/* 단어 관련 함수 */

/**
 * `Database` 클라스에서 특정 guildID에 특정 단어를 추가하기 위한 함수입니다.
 * 
 * @param database 데이터베이스 기본 클라스
 * @param serverid 단어 추가 명령어가 실행되는 `guildID`
 * @param word 추가할 단어
 */
export const addWord = (database:Database,serverid:string,word:string) => {
    const array = database.getDataWords().get(serverid)!
    if(new Set(array).has(word)){
        return false
    }
    array.push(word)
    database.setDataWords(serverid,array)
    console.log(database.getDataWords())
    return true
}

/**
 * `Database` 클라스에서 특정 guildID에 특정 단어를 지우기 위한 함수입니다.
 * 
 * @param database 데이터베이스 기본 클라스
 * @param serverid 단어 삭제 명령어가 실행되는 `guildID`
 * @param word 삭제할 단어
 */
export const removeWord = (database:Database,serverid:string,word:string) => {
    const array = database.getDataWords().get(serverid)!
    const temp = new Set(array)
    if(!temp.has(word)){
        return false
    }
    const result = array.filter(element => element != word)
    database.setDataWords(serverid,result)
    return true
}

/* 채널 관련 함수 */

export const removeChannel = () => {

}

export const addChannel = () => {

}