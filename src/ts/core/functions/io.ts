import mysql from 'mysql2/promise'
import Connection from 'mysql2/typings/mysql/lib/Connection';
/**
 * get serverlist that on databasew
 * @param pool database connection parameter
 */
export const getServers = async (pool:mysql.Pool) => {
    const result = await runCmd(pool,'select serverid from serverlist',undefined)
    return result;
}

/**
 * it can run querys or query by putting `double list` of `single list`
 * 
 * @param pool mysql Pool information parameter
 * @param cmd what you are going to type in query
 * @param values variable that put in query
 * @returns it return result of query that execute
 */
export const runCmd = async (pool:mysql.Pool,cmd:any,values?:any[]) => {
    // getting connection from mysql pool
    const connection:mysql.PoolConnection = await pool.getConnection()
    // checking values is `undefined` which mean execute query has no `?` replacment character 
    if(values === undefined){
        const [row,error] = await connection.query(cmd);
        connection.release()
        return row
    }
    // getting type that is querys or query by the values type 
    const type:string = Object.prototype.toString.call(values[0]).slice(8, -1)
    if(type === 'Array'){
        // connection.quer
        
        console.log("array");
    }
    else{
        const query:string = mysql.format(cmd,values)
        const [row,error] = await connection.query(query);

        connection.release()
        return row
    }
}