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
    /** 1초 정의한 값입니다. */
    private static SEC = 1000
    /** 1분을 정의한 값입니다. */
    private static MIN = this.SEC * 60
    /** 현재 사용중인 `interval` 주소를 기록합니다. */
    private thread?:NodeJS.Timer = undefined;
    /** 동기화 시킬 데이터베이스를 저장합니다. */
    private database?:Database = undefined;

    /** 생성자입니다. */
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
    
    /**
     * 스레드를 정지하는 함수입니다.
     */
    stop = () => {

    }

    /**
     * 스레드를 중시하는 함수입니다.
     */
    pause = () => {

    }

    /**
     * 스레드를 재시작하는 함수입니다.
     */
    restart = () => {

    }

    /**
     * 스레드를 시작하는 함수입니다.
     */
    start = () => {
        if(this.thread === undefined){
            this.thread = setInterval(this.runFucntion,Thread.MIN * 5)
        }
    }

    /**
     * 특정 시간이 흐른뒤에 실행되는 함수입니다. 
     */
    runFucntion = async() => {
        const connectionCount = await runCmd(this.database!.getMysqlPool(),"SHOW STATUS LIKE 'Threads_connected'",undefined)
        //사용중인 명령어가 있다면 추가 행동을 하지 않고 바로 종료합니다.
        if(Object.values(connectionCount!)[0].Value > 1){
            return
        }

        this.database!.syncronize()
        // this.database!.getMysqlPool()._acquiringConnections.length
    }

}