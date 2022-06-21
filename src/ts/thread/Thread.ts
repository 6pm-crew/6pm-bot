import { Database } from "../core/Database";
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
        if(Object.values(connectionCount!)[0].Value >= 1){
            // return
        }

        this.database!.syncronize()
        // this.database!.getMysqlPool()._acquiringConnections.length
    }

}