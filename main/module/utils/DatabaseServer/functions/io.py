from pickle import NONE

from module.utils.ColorPrint import *
from .Data import DBData
import pymysql
from config import *

def runQuery(data:DBData,cmd:str,value:any = None):
    """
    :param data: 데이터베이스 정보 저장 변수
    :type data: DBData
    :param cmd: 실행할 명령어
    :typd data: str
    :param value: 실행할 명령어에 들어갈 데이터값
    :type value: any
    """
    findWord = ["select","show"]
    foundBool = True
    result = None
    for word in findWord:
        if(cmd.lower().find(word) == 0):
            foundBool = False
    if(value == None):
        data.cursor.execute(cmd)
    else:
        data.cursor.execute(cmd,value)


    if(foundBool):
        colorPrint(COLORBACK.LIGHTRED_EX,"commiting...query")
        data.database.commit()
    result = data.cursor.fetchall()


    return result

def runQuerys(data:DBData,cmd:str,val):
    findWord = ["select","show"]
    foundBool = True
    result = None

    for word in findWord:
        if(cmd.lower().find(word) == 0):
            foundBool = False
    
    data.cursor.executemany(cmd,val)
    if(foundBool):
        colorPrint(COLORBACK.LIGHTRED_EX,"commiting...querys")
        data.database.commit()
    result = data.cursor.fetchall()

    return result

