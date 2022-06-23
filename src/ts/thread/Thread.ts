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

import { Database } from "../core/database";
import { runCmd } from "../core/functions/io";

/**
 * 스레드 역할을 하는 클라스입니다.
 * `javascript` 특성상 멀티 스레드가 존재하지 않지만 관리하기 위해 편의상 `Thread`이라고 명칭하였습니다.
 * 
 */
export class Thread{
    private static SEC = 1000
    private static MIN = this.SEC * 60
    private thread?:NodeJS.Timer = undefined;
    private database?:Database = undefined;
    constructor(){
        this.start()
    }

    /**
     * 현 스레드에 데이터베이스 값을 저장해줍니다.
     * 
     * @param database 현 정보를 저장하고 있는 데이터베이스 클라스
     */
    setDatabase = (database:Database) => {
        this.database = database;
    }
    
    stop = () => {

    }

    pause = () => {

    }

    restart = () => {

    }

    start = () => {
        if(this.thread === undefined){
            this.thread = setInterval(this.runFucntion,Thread.SEC * 10)
        }
    }

    runFucntion = async() => {
        const connectionCount = await runCmd(this.database!.getMysqlPool(),"SHOW STATUS LIKE 'Threads_connected'",undefined)
        //사용중인 명령어가 있다면 추가 행동을 하지 않고 바로 종료한다.
        if(Object.values(connectionCount!)[0].Value > 1){
            return
        }

        this.database!.syncronize()
        // this.database!.getMysqlPool()._acquiringConnections.length
    }

}