import mysql from 'mysql2/promise'
import Connection from 'mysql2/typings/mysql/lib/Connection';
/**
 * get serverlist that on databasew
 * @param pool database connection parameter
 */
export const getServers = async (pool:mysql.Pool) => {
    const result = await runCmd(pool,'select serverid from serverlist')
    return result;
}

export const runCmd = async (pool:mysql.Pool,cmd:any) => {
    const connection:mysql.PoolConnection = await pool.getConnection()
    const type:string = Object.prototype.toString.call(cmd).slice(8, -1)
    if(type === 'Array'){
        // connection.quer
        console.log("array");
    }
    else if(type === 'Null'){

        const [row,error] = await connection.query(cmd);
        connection.release()
        return row
    }
    else{
        const [row,error] = await connection.query(cmd);
        connection.release()
        return row
    }
}