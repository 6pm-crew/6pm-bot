from colorama import *

COLORBACK = Back
COLORFRONT = Fore
def colorPrint(color:str,*contents:str):
    print(color + contents[0] + Style.RESET_ALL, end = " ")
    for (index,content) in enumerate(contents):
        if(index != 0):
            print(color + content, end = " ")
    print()