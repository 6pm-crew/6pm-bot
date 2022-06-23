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
    return true
}

/**
 * `Database` 클라스에서 특정 guildID에 특정 단어를 추가하기 위한 함수입니다.
 * 
 * @param database 데이터베이스 기본 클라스
 * @param serverid 단어 추가 명령어가 실행되는 `guildID`
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

/**
 * `Database` 클라스에서 특정 guildID에 특정 단어를 추가하기 위한 함수입니다.
 * 
 * @param database 데이터베이스 기본 클라스
 * @param serverid 단어 추가 명령어가 실행되는 `guildID`
 * @param word 추가할 단어
 */
export const addChannel = (database:Database,serverid:string,channelID:string) => {
    const array = database.getDataChannels().get(serverid)!
    if(new Set(array).has(channelID)){
        return false
    }
    array.push(channelID)
    database.setDataChannels(serverid,array)
    return true
}

/**
 * `Database` 클라스에서 특정 guildID에 특정 채널를 지우기 위한 함수입니다.
 * 
 * @param database 데이터베이스 기본 클라스
 * @param serverid 채널 추가 명령어가 실행되는 `guildID`
 * @param channelID 추가할 채널
 * @returns 
 */
 export const removeChannel = (database:Database,serverid:string,channelID:string) => {
    const array = database.getDataChannels().get(serverid)!
    const temp = new Set(array)
    if(!temp.has(channelID)){
        return false
    }
    const result = array.filter(element => element != channelID)
    database.setDataChannels(serverid,result)
    return true
}
