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
import Connection from 'mysql2/typings/mysql/lib/Connection';

/**
 * 데이터베이스에서 실행할 `query`를 들어오는 인수값에 따라 실행 방식을 바꿔준다.
 * 
 * @param pool mysql Pool를 넣는 매개변수입니다.
 * @param cmd mysql에 실행할 실행 명령어입니다.
 * @param values 실행 명령어에 들어갈 변수입니다.
 * @returns mysql이 실행되고 반환되는 결과값입니다.
 */
export const runCmd = async (pool:mysql.Pool,cmd:any,values?:any[]) => {
    // pool으로부터 연결을 시도합니다.
    const connection:mysql.PoolConnection = await pool.getConnection()
    let arrayArgumentIndex:number[] = [];
    // value가 undefined 인것을 확인합니다. 즉, 실행 쿼리에 '?' 대체 문자가 없다는 의미입니다.
    if(values === undefined){
        const [row,error] = await connection.query(cmd);
        connection.release()
        return row
    }
    // values가 [[]] 구성인지 []인지 확인해주는 부분입니다.
    for(const index in values){
        const type:string = Object.prototype.toString.call(values[index]).slice(8, -1)
        if(type === 'Array') arrayArgumentIndex.push(parseInt(index))
    }
    
    if(arrayArgumentIndex.length !== 0){
        let querys:string[] = []
        let count:number = 0;
        const template:string =cmd;
        arrayArgumentIndex.forEach(element => {
            if(values[element].length > count)
                count = values[element].length
        })

        for(let countIndex = 0; countIndex< count; countIndex++){
            let queryValue = [];
            for(let valuesIndex = 0; valuesIndex < values.length; valuesIndex++){
                if(new Set(arrayArgumentIndex).has(valuesIndex)){
                    queryValue.push(values[valuesIndex][countIndex])
                }
                else{
                    queryValue.push(values[valuesIndex])
                }
            }
            querys.push(mysql.format(template + ";",queryValue))
        }

        // querys.join()
        const [row,error] = await connection.query(querys.join());
    }
    else{
        // ? 대체 문자가 있다면 대체문자르 값으로 변환해준다.
        const query:string = mysql.format(cmd,values)
        // 쿼리가 실행되고 `row`와 `error`로 구별하여 저장된다.
        const [row,error] = await connection.query(query);
        // pool에서 연결했던 것을 다시 풀어줌으로써 다른 연결이 사용할 수 있도록함
        connection.release()
        return row
    }
}