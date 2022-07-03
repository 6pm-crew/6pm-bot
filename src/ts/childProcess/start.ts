import shell from 'shelljs'
import {GithubConfig} from '../config'

/**
 * 자식 프로세스의 실행부입니다.
 * 깃허브 서버에서 데이터를 받아와서 빌드해줍니다.
 */
process.on("message",(message:string,url:string) => {
    console.log("child",message)
    console.log(GithubConfig.remote)
    if(message !== 'start'){
        if(process.send !== undefined){
            process.send("stop")
        }
    }
    if (!shell.which('git')) {
        shell.echo('Sorry, this script requires git');
        // shell.exit(1);
      }

    shell.exec("sudo git pull origin main --force",{async:true},(code, stdout,stderr) => {
        shell.exec(`${GithubConfig.passwd}`)
        console.log(stdout)

        if(code === 128){
            const initGit = shell.exec("sudo git init",{async:true})
            
            initGit.stdout?.on('data',data => {
                shell.echo("sudo git init")
                shell.exec(`sudo git remote add origin ${GithubConfig.remote}`,{async:true})
                shell.exec(`sudo git branch -M main`,(code, stdout,stderr) => {
                    shell.echo("sudo chmod 755 ./*")
                    if(process.send !== undefined){
                        process.send("reboot")
                    }
                })
            })

        }

        if(code === 0){
            shell.exec("npm run build")
            if(process.send !== undefined){
                process.send("stop")
            }
        }
    })


    //   process.send("")
})
