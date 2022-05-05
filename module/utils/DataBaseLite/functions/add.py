import asyncio
from http import server
from pickle import NONE
import sqlite3
from tokenize import Number
import pandas as pd
import os

from module.utils.Data.Data import Data

# 
# loadDBArr -> 데이터베이스에서 데이터를 불러와 arr로 저장한다.
#   data: 데이터베이스 연결(connect)
def loadDBArr(data:sqlite3.Connection) -> dict:
    # result = runCmd(data,f"SELECT * FROM server")
    try:
        result = pd.read_sql_query("SELECT * FROM server",data)
    except IndexError as e:
        return None
    temp = dict(result)
    return temp

def storeDBArr(serverData:Data):
    cursor = serverData.connction.cursor()
    for (index,serverID) in enumerate(serverData.wordDataBaseArr):
        print(index)
        print(serverData.wordDataBaseArr[serverID])
        setArr = str(serverData.wordDataBaseArr[serverID]).replace("'","\"")
        runCmd(cursor,"UPDATE server SET words = '{}' WHERE id = {}".format(setArr,serverID))
        serverData.connction.commit()



# 
# runCmd -> 데이터베이스에서 sql 명령어를 실행합니다.
#   data: 데이터베이스 연결(connect)
#   cmd: 명령어
def runCmd(data:sqlite3.Cursor,cmd:str):
    result = data.execute(cmd)
    return result
# 
# runCmd -> 데이터 베이스 추가시 베이터베이스에 테이블이 이미 존재하는지 확인하는 명령어입니다.
#   data : 데이터베이스 연결(connect)
#   name : 테이블 이름
def checkDB(data:sqlite3.Connection,tableName:str):
    result = None
    result = runCmd(data,f"SELECT name FROM sqlite_master WHERE type='table' AND name='{tableName}';")
    result = result.fetchall()
    if(len(result) <= 0):
        return False
    return True

# 
# runCmd -> 데이터 베이스 테이블 만들 때 사용하는 명령어입니다.
#   data : 데이터베이스 연결(connect)
#   name : 테이블 이름
#
#   DB)server : 서버에 저장되어있는 서버 단어 및
#   DB)serverSetting : 서버 기존 설정이 담긴 데이터베이스 플래그로 사용한다.
def MakeDB(data:sqlite3.Connection,name:str):
    if(not checkDB(data,name)):
        # data.execute("CREATE TABLE server(id INTEGER PRIMARY KEY,type INTEGER default '',data TEXT default '')")
        data.execute("CREATE TABLE server(id INTEGER PRIMARY KEY,channels TEXT[] default '',words TEXT[] default '')")

        data.execute("CREATE TABLE serverSetting(id INTEGER PRIMARY KEY,type BOOLEAN default True)")
    

#
# add -> 데이터 벵스
#   data : 데이터베이스 연결(connect)
#   typeNum : 데이터 베이스 타입(int)
#   value : 집어넣을 값(any)
CHANNEL = 0
WORD = 1
def add(data,typeNum:Number,value:any):
    if(CHANNEL == typeNum):
        runCmd(data,"")
    elif(WORD == typeNum):
        pass
    else:
        print('testing')
