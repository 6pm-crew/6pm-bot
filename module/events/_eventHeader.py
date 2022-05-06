import os
import glob
from module.utils.ColorPrint import *

#실행되는 이벤트를 감지하는 파일입니다. 명령어 실행을 원할 시에 import 해서 가져오는 것을 추천합니다.
def run(client,serverData):
    colorPrint(COLORFRONT.RED,"running event handler...")
    os.chdir("./module/events")
    moduleName = [s.replace(".py","") for s in glob.glob("[!_]*.py")]
    print("Event List: ", end=" ")
    colorPrint(COLORFRONT.RED,str(moduleName))
    os.chdir("../../")

    for name in moduleName:
        globals()[name] = __import__(f'module.events.{name}',fromlist='{name}')
        colorPrint(COLORBACK.CYAN,(str)(globals()[name]))
        globals()[name].run(client,serverData)
    

