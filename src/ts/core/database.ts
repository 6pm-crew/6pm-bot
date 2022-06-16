import mysql from 'mysql'
import {DatabaseConfig} from '../config'
import {getServers} from './functions/io'

const test:Map<string,string> = new Map()

/**
 * class that control database 
 */
class Database{
    // server: {필터링될 단어[]},
    private dataWords:Map<string,[]> = new Map<string,[]>()
    private dataChanels:Map<string,[]> = new Map<string,[]>()
    private connection:mysql.Connection

    constructor() {
        this.connection = mysql.createConnection({
            host     : DatabaseConfig.host,
            user     : DatabaseConfig.user,
            password : DatabaseConfig.passwd,
            database : DatabaseConfig.database,
            port : DatabaseConfig.port
          });
            
        //   connection.connect();
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
        return getServers(this.connection)
    }
}
