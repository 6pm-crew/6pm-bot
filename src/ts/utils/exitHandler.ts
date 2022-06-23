import { Database } from "../core/database";

/**
 * `options`의 인터페이스입니다.
 */
export interface options{
    exit?: boolean,
    cleanup?:boolean
}

/**
 * 프로그램이 종료되면 실행되는 이벤트 핸들러입니다.
 * 
 * @param options 종료 옵션입니다.
 * @param exitCode 종료 코드입니다.
 */
export function exitHandler(database:Database,options:options, exitCode:number | undefined) {
    if (options.cleanup) console.log('clean');
    if (exitCode || exitCode === 0) console.log(exitCode);
    if (options.exit) process.exit();

    database.syncronize()

}