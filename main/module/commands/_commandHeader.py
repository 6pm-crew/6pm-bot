#MIT License
#
#Copyright (c) 2021 dennis ko
#
#Permission is hereby granted, free of charge, to any person obtaining a copy
#of this software and associated documentation files (the "Software"), to deal
#in the Software without restriction, including without limitation the rights
#to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
#copies of the Software, and to permit persons to whom the Software is
#furnished to do so, subject to the following conditions:
#
#The above copyright notice and this permission notice shall be included in all
#copies or substantial portions of the Software.
#
#THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
#IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
#FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
#AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
#LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
#OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
#SOFTWARE.

import os
import glob
from module.utils.ColorPrint import *
   
#commands안에 있는 모든 명령어를 읽어드려서 가져오기해주는 구간입니다.
#commadns 파일에는 실행되는 명령어만 들어갑니다.
def run(bot,serverData):
    colorPrint(COLORFRONT.RED,"running command handler...")
    os.chdir("./main/module/commands")
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


