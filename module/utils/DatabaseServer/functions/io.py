from pickle import NONE
from .Data import DBData
import pymysql
from config import *

def runQuery(data:DBData,cmd:str,value:any = None):
    findWord = ["select","show"]
    foundBool = True
    result = None
    for word in findWord:
        if(cmd.lower().find(word) >= 0):
            foundBool = False
    if(value == None):
        data.cursor.execute(cmd)
    else:
        data.cursor.execute(cmd,value)


    if(foundBool):
        data.database.commit()
    else:
        result = data.cursor.fetchall()


    return result

def runQuerys(data:DBData,cmd:str,val):
    findWord = ["select","show"]
    foundBool = True
    result = None

    for word in findWord:
        print(cmd.lower().find(word))
        if(cmd.lower().find(word) >= 0):
            foundBool = False
    
    data.cursor.executemany(cmd,val)
    if(foundBool):
        data.database.commit()
    else:
        result = data.cursor.fetchall()

    return result

