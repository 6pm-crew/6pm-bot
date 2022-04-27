import sqlite3
import os
# 
# load -> 데이터베이스를 불러옵니다.
#   path : 데이터베이스 존재 위치
#
def load(path:str):
    if(not os.path.isfile(path)):
        touch(path)
    # connectFile = 
    return sqlite3.connect(path)


def touch(path):
    with open(path, 'a'):
        os.utime(path, None)
