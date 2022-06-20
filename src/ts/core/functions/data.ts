import mysql from 'mysql2/promise'
import { Database } from '../database'
import {runCmd} from './io'


export const removeGuild = () => {

}

export const addGuild = () => {
    
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
    array.push(word)
    database.setDataWords(serverid,array)
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
    const result = array.filter(element => element != word)
    database.setDataWords(serverid,result)
}

/* 채널 관련 함수 */

export const removeChannel = () => {

}

export const addChannel = () => {

}