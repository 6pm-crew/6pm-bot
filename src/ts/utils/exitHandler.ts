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
import shell from "shelljs"
/**
 * `options`의 인터페이스입니다.
 */
 export interface options{
    exit?: boolean,
    cleanup?:boolean
}
export default class ExitHandler{

    public static STOP = 0
    public static RELOAD = 1
    public static UPDATE = 2

    private exitMode:number = 0;
    constructor(exitMode?:number){
        if(exitMode != undefined){
            this.exitMode = exitMode
        }
    }


    exit(exitMode:number){
        this.exitMode = exitMode
        if(exitMode == 0 ){
            shell.exec("pkill reload.sh")
        }
        if(exitMode == ExitHandler.RELOAD || exitMode == ExitHandler.UPDATE){
            console.log("reload | update")
        }
        process.exit(exitMode)
    }
    /**
     * 프로그램이 종료되면 실행되는 이벤트 핸들러입니다.
     * 
     * @param options 종료 옵션입니다.
     * @param exitCode 종료 코드입니다.
     */
    async exitHandler(database:Database,options:options, exitCode:number | undefined) {
        if (options.cleanup) console.log('clean');
        console.log(exitCode)
        if (exitCode || exitCode === 0) console.log(exitCode);
        if (options.exit) process.exit();

        
        database.syncronize()
        if(exitCode === 1 || exitCode === 2){
            process.exit(0)
            //nohup node build/index.js 1>/dev/null 2>&1 &
        }
    }
}
