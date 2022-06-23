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
import {DatabaseConfig} from '../config'
import {runCmd} from './functions/io'
import {addWord,removeWord,addChannel,removeChannel} from './functions/data'
import {addWordDB,
    getWordDB, 
    getGuildData,
    getServers,
    removeWordDB,
    getChannelDB,
    removeChannelDB,
    addChanelDB} from './functions/server'
import { remove } from 'typedoc/dist/lib/utils'

/**
 * 디스코드 데이터를 관리하는 클라스입니다.
 */
export class Database{
    // server: {필터링될 단어[]},

    /** 현재 모든 서버가 필터링하고 있는 단어를 저장하는 `Map`입니다. */
    private dataWords:Map<string,any[]> = new Map<string,[]>()

    /** 현재 모든 서버가 필터링하고 있는 `textchannel`를 저장하는 `Map`입니다. */
    private dataChanels:Map<string,any[]> = new Map<string,[]>()

    /** 현재 사용하고 이는 mysql pool값을 저장하고 있는 값입니다. */
    private mysqlPool:mysql.Pool

    /** 데이터베이스와 동기화시에 동기화해야할 서버를 저장하는 변수입니다. */
    private editedServer:Set<string> = new Set<string>()

    /** 현재 데이터베이스에 올라가있는 모든 서버의 `guildID`를 저장하고 있는 변수입니다. */
    private serverlist:string[] = []

    constructor() {
        this.mysqlPool = mysql.createPool({
            host     : DatabaseConfig.host,
            user     : DatabaseConfig.user,
            password : DatabaseConfig.passwd,
            database : DatabaseConfig.database,
            port : DatabaseConfig.port
        });
        this.setupDatabase()


    }

    /**
     * `Database` 클라스가 생성될 기본 설정을 해주는 함수입니다.
     */
    private setupDatabase = async () => {
        console.log("setuping database...")
        // 데이터베이스에서 서버 리스트를 가지고 온다.
        await this.setServerlist()
        // 서버 리스트를 가지고 온 상태에서 각 가지고 온 데이터를 클라스에 저장해준다.
        await this.setDatas()
    }

    /**
     * 각 서버에 대한 필터된 `textchannel`과 `word`를 데이터베이스에서 가져와준다.
     */
    private setDatas = async () => {
        for(const guildID of this.serverlist){
            // 데이터베이스로 부터 데이터를 가지고 옵니다.
            const res = await getGuildData(this.mysqlPool,guildID)
            // 결과값으로 단어랑 채널 필터링를 분리합니다.
            const word = Object.values(res.word!).map(element => element.value);
            const channel = Object.values(res.channel!).map(element => element['CAST(fc.channel_id as CHAR)'])
            this.dataWords.set(guildID,word)
            this.dataChanels.set(guildID,channel)

        }
    }

    /**
     * 데이터 베이스랑 현 실행 클라이언트랑 동기화 해줍니다.
     */
    syncronize = async () => {
        console.log("syncronizing")
        for(const serverid of this.editedServer){

            // 서버 단어 동기화하기 위함
            {           
                const original = await getWordDB(this.mysqlPool,serverid)
                const originalValue = new Set<string>(Object.values(original!).map(x => x.value))
                const changeValue = new Set<string>(this.dataWords.get(serverid))
                const deletingValue = [...originalValue].filter(x => !changeValue.has(x))
                const addingValue = [...changeValue].filter(x => !originalValue.has(x))

                if(deletingValue.length > 0){
                    await removeWordDB(this.mysqlPool,serverid,deletingValue[0])
                }
                else if(deletingValue.length > 1){
                    await removeWordDB(this.mysqlPool,serverid,deletingValue)
                }

                if(addingValue.length > 0){
                    await addWordDB(this.mysqlPool,serverid,addingValue[0])
                }
                else if(addingValue.length > 1){
                    await addWordDB(this.mysqlPool,serverid,addingValue)
                }
            }
            // 서버 채널 동기화하기 위함
            {
                const original = await getChannelDB(this.mysqlPool,serverid)
                const originalValue = new Set<string>(Object.values(original!).map(x => x['CAST(fc.channel_id as CHAR)']))
                const changeValue = new Set<string>(this.dataChanels.get(serverid))

                const deletingValue = [...originalValue].filter(x => !changeValue.has(x))
                const addingValue = [...changeValue].filter(x => !originalValue.has(x))

                if(deletingValue.length > 0){
                    await removeChannelDB(this.mysqlPool,serverid,deletingValue[0])
                }
                else if(deletingValue.length > 1){
                    await removeChannelDB(this.mysqlPool,serverid,deletingValue)
                }

                if(addingValue.length > 0){
                    await addChanelDB(this.mysqlPool,serverid,addingValue[0])
                }
                else if(addingValue.length > 1){
                    await addChanelDB(this.mysqlPool,serverid,addingValue)
                }
            }

            this.editedServer.delete(serverid)

        }

    }


    /**
     * 데이터베이스에 사용하는 `Pool`를 출력합니다.
     * 
     * @returns `mysql.Pool` 형식으로 반환합니다.
     */
    getMysqlPool = () => {
        return this.mysqlPool
    }
    /**
     * `Map<string, any[]>`형식으로, guildID와 그에 상승하는 필터된 단어 배열을 가져온다.
     * 
     * @returns `Map<string,[]>` 형식의 반환합니다.
     */
    getDataWords = () => {
        return this.dataWords
    }

    /**
     * 특정 `guildID`의 필터링된 단어들을 설정하는 함수입니다.
     * 
     * @param guildID 바꿀 서버의 `guildID`
     * @param word 바꾸려고 하는 필터링 단어 배열
     */
    setDataWords = (guildID:string,word:string[]) => {
        this.dataWords.set(guildID,word)
    }

    setDataChannels = (guildID:string,channelIDs:string[]) => {
        this.dataChanels.set(guildID,channelIDs)
    }

    /**
     * 모든 서버에서의 필터링된 단어를 가지고 온다.
     * 
     * @returns `Map<string,[]>` 형식으로 반환합니다.
     */
    getDataChannels = () => {
        return this.dataChanels
    }

    /**
     * `guildID`를 반환해준다.
     * @returns `Map<string,[]>` 형식으로 반환합니다.
     */
    getServer = () => {
        return getServers(this.mysqlPool)
    }

    /**
     * `guildID`를 `string[]` 형식으로 저장합니다.
     * `private` 함수입니다.
     */
    private setServerlist = async () => {

        let temp = await getServers(this.mysqlPool)
        this.serverlist =  Object.values(temp!).map(element => element['CAST(serverid AS CHAR)'])
        
    }

    /**
     * `guildID`를 반환합니다.
     * 
     * @returns `string[]` 형식으로 반환합니다. 
     */
    getServerlist = () => {
        return this.serverlist
    }


    /** 채널 단어 관련 함수 */

    /**
     * `database` 클라스에 단어를 추가합니다.
     * 
     * @param guildID 단어를 집어넣고자 하는 `guildID`
     * @param word `database` 클라스에 넣고자 하는 단어입니다.
     */
    addWord = (guildID:string,word:string) => {
        const result = addWord(this,guildID,word)
        if(result){
            this.editedServer.add(guildID)
        }
        return result
    }

    /**
     * `database` 클라스에 단어를 삭제합니다.
     * 
     * @param guildID 단어를 삭제하고자 하는 `guildID`
     * @param word `database` 클라스에 삭제하고자 하는 단어입니다.
     */
    removeWord = (guildID:string,word:string) => {
        const result = removeWord(this,guildID,word);
        if(result){
            this.editedServer.add(guildID)
        }

        return result
    } 

    /** 채널 관련 함수 */

    addChannel = (guildID:string,channelID:string) => {
        const result = addChannel(this,guildID,channelID)
        if(result){
            this.editedServer.add(guildID)
        }
        return result
    }

    removeChannel = (guildID:string,channelID:string) => {
        const result = removeChannel(this,guildID,channelID)
        if(result){
            this.editedServer.add(guildID)
        }
        return result
    }

}
