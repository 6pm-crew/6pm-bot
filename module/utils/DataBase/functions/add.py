import asyncio
from pickle import NONE
import sqlite3
from tokenize import Number
import os

# 
# runCmd -> 데이터베이스에서 sql 명령어를 실행합니다.
#   data: 데이터베이스 연결(connect)
#   cmd: 명령어
def runCmd(data:sqlite3.Connection,cmd: str):
    conn = data.cursor()
    result = conn.execute(cmd)
    return result

# 
# runCmd -> 데이터 베이스 추가시 베이터베이스에 테이블이 이미 존재하는지 확인하는 명령어입니다.
#   data : 데이터베이스 연결(connect)
#   name : 테이블 이름
def checkDB(data:sqlite3.Connection,tableName:str):
    result = None
    result = runCmd(data,f"SELECT name FROM sqlite_master WHERE type='table' AND name='{tableName}';")
    if(result == None):
        return False
    return True

# 
# runCmd -> 데이터 베이스 테이블 만들 때 사용하는 명령어입니다.
#   data : 데이터베이스 연결(connect)
#   name : 테이블 이름
def MakeDB(data:sqlite3.Connection,name:str):
    if(not checkDB(data,name)):
        data.execute("CREATE TABLE server(id INTEGER,words TEXT,channels TEXT)")
    

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
