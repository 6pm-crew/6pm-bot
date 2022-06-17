import mysql from 'mysql2/promise'
import {DatabaseConfig} from '../config'
import {getServers,runCmd} from './functions/io'

const test:Map<string,string> = new Map()

/**
 * class that control database 
 */
export class Database{
    // server: {필터링될 단어[]},
    private dataWords:Map<string,[]> = new Map<string,[]>()
    private dataChanels:Map<string,[]> = new Map<string,[]>()
    private mysqlPool:mysql.Pool

    constructor() {
        this.mysqlPool = mysql.createPool({
            host     : DatabaseConfig.host,
            user     : DatabaseConfig.user,
            password : DatabaseConfig.passwd,
            database : DatabaseConfig.database,
            port : DatabaseConfig.port
        });
    }
    /**
     * function that give you `map` that contain filtered words
     * 
     * @returns return data that words that filters
     */
    getDataWords = () => {
        return this.dataWords
    }

    getDataChannels = () => {
        return this.dataChanels
    }

    getServer = () => {
        return getServers(this.mysqlPool)
    }

    getRun = () => {
        // return runCmd(this.mysqlPool,"testing",null)
    }
}
