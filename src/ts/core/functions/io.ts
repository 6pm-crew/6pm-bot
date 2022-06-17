import mysql from 'mysql2/promise'
import Connection from 'mysql2/typings/mysql/lib/Connection';
/**
 * get serverlist that on databasew
 * @param connection database connection parameter
 */
export const getServers = async (connection:mysql.Pool) => {
    const result = await runCmd(connection,'select serverid from serverlist',null)
    console.log(result);

}


export const runCmd = async (pool:mysql.Pool,cmd:string,value: any) => {
    const connection:mysql.PoolConnection = await pool.getConnection()
    const type:string = Object.prototype.toString.call(value).slice(8, -1)
    if(type === 'Array'){
        // connection.quer
        console.log("array");
    }
    else if(type === 'Null'){

        const [row,error] = await connection.query(cmd);
        return row
    }
    else{
        console.log("non array")
    }
}

// function runCmd(connection:mysql.Connection,cmd:string,value:any):void{

// }


// export const runCmd = async () => {

// }
// export const runCmd = async (connection:mysql.Connection,cmd:string,value:string[]) => {
//     connection.connect()
// }