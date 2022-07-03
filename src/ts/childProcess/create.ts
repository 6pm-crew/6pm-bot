import {fork} from 'node:child_process'
import ExitHandler from '../utils/exitHandler';


export async function create(exitHandler:ExitHandler){
    if (process.argv[2] === 'child') {
        setTimeout(() => {
          console.log(`Hello from ${process.argv[2]}!`);
        }, 1_000);
      } else {
        const controller = new AbortController();
        const child = fork('./build/childProcess/start.js');
        child.send("start")
        child.on('error', (err:any) => {
          // This will be called with err being an AbortError if the controller aborts
        });

        child.on('message',(message) => {
            if(message === 'reboot'){
                console.log('retry pulling data from github...')
                child.send("start")
            }
            else if(message === 'stop'){
                console.log('stoping Child Process...')
                controller.abort(); // Stops the child process
                exitHandler.exit(ExitHandler.UPDATE)
            }
        })

    }
}