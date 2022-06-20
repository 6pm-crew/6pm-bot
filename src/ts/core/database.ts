import mysql from 'mysql2/promise'
import {DatabaseConfig} from '../config'
import {runCmd} from './functions/io'
import {addWord,removeWord} from './functions/data'
import {addWordDB, 
    getGuildData,
    getServers} from './functions/server'

/**
 * 디스코드 데이터를 관리하는 클라스이다.
 */
export class Database{
    // server: {필터링될 단어[]},
    private dataWords:Map<string,any[]> = new Map<string,[]>()
    private dataChanels:Map<string,any[]> = new Map<string,[]>()
    private mysqlPool:mysql.Pool
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
     * `Database` 클라스가 생성될 기본 설정을 해주는 함수이다.
     */
    private setupDatabase = async () => {
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
            // 결과값으로 단어랑 채널 필터링를 분리한다.
            const word = Object.values(res.word!).map(element => element.value);
            const channel = Object.values(res.channel!).map(element => element.channel_id)
            
            this.dataWords.set(guildID,word);
        }
    }

    /**
     * `Map<string, any[]>`형식으로, guildID와 그에 상승하는 필터된 단어 배열을 가져온다.
     * 
     * @returns `Map<string,[]>` 형식의 반환한다.
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

    /**
     * 모든 서버에서의 필터링된 단어를 가지고 온다.
     * 
     * @returns `Map<string,[]>` 형식으로 반환한다.
     */
    getDataChannels = () => {
        return this.dataChanels
    }

    /**
     * `guildID`를 반환해준다.
     * @returns `Map<string,[]>` 형식으로 반환한다.
     */
    getServer = () => {
        return getServers(this.mysqlPool)
    }

    /**
     * `guildID`를 `string[]` 형식으로 저장한다.
     * `private` 함수이다.
     */
    private setServerlist = async () => {

        let temp = await getServers(this.mysqlPool)
        this.serverlist =  Object.values(temp!).map(element => element['CAST(serverid AS CHAR)'])
        
    }

    /**
     * `guildID`를 반환한다.
     * @returns `string[]` 형식으로 반환한다. 
     */
    getServerlist = () => {
        return this.serverlist
    }

    /**
     * 데이터베이스에 단어를 추가한다.
     * @param guildID 단어를 집어넣고자 하는 `guildID`
     * @param word 데이터베이스에 넣고자 하는 단어이다.
     * @returns 데이터베이스의 `query`를 실행후 반환되는 콜백이다.
     */
    addWordDB = (guildID:string,word:string) => {

        return addWordDB(this.mysqlPool,guildID,word)
    }
}
