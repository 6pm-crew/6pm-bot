import os
import glob
from module.utils.ColorPrint import *

#commands안에 있는 모든 명령어를 읽어드려서 가져오기해주는 구간입니다.
#commadns 파일에는 실행되는 명령어만 들어갑니다.
def run(bot,serverData):
    colorPrint(COLORFRONT.RED,"running command handler...")
    os.chdir("./module/commands")
    moduleName = [s.replace(".py","") for s in glob.glob("[!_]*.py")]
    print("command List: ", end=" ")
    colorPrint(COLORFRONT.RED,str(moduleName))
    os.chdir("../../")

    if len(moduleName) <= 0:
        print("no events found...")
        return
    for name in moduleName:
        globals()[name] = __import__(f'module.commands.{name}',fromlist='{name}')
        colorPrint(COLORBACK.CYAN,(str)(globals()[name]))
        globals()[name].run(bot,serverData)


