
/**
 * 스레드 역할을 하는 클라스입니다.
 * `javascript` 특성상 멀티 스레드가 존재하지 않지만 관리하기 위해 편의상 `Thread`이라고 명칭하였습니다.
 * 
 */
export class Thread{
    private static SEC = 1000
    private static MIN = this.SEC * 60
    private thread?:NodeJS.Timer = undefined;
    constructor(){
        this.start()
    }

    
    stop = () => {

    }

    pause = () => {

    }

    restart = () => {

    }

    start = () => {
        if(this.thread === undefined){
            this.thread = setInterval(this.runFucntion,Thread.MIN * 5)
        }
    }

    runFucntion = () => {
        console.log("testing")
    }

}