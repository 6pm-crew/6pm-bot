import sqlite3
# 
# load -> 데이터베이스를 불러옵니다.
#   path : 데이터베이스 존재 위치
#
def load(path:str):
    return sqlite3.connect(path)


