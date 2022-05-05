from .Data import *
from .io import *

def addServer(data:DBData,channelID:int):
    runQuery(data,"insert into serverlist(serverid) values (%s)",channelID)



def addChannel():
    pass

def removeChannel():
    pass

def addWord(data:DBData,guildIndex:tuple):
    r'데이터베이스에 없는 단어 추가'
    severID = list(guildIndex)[1]
    runQuerys(data,"INSERT IGNORE INTO words(value) values (%s)",data.serverWordDict[severID])
    # runQuerys(
    #     data,
    #     "INSERT INTO orders ( userid, timestamp) \
    #     SELECT o.userid , o.timestamp \
    #     FROM users u \
    #     INNER JOIN orders o \
    #     ON  o.userid = u.id"
    #     )
    # print(words)
    # serverIndexs = getServerIndex()
    

def removeWord():
    pass

def getServerIDs(data:DBData):
    result = runQuery(data,"select serverid from serverlist")
    return [list(i)[0] for i in result]

def getServerIndex(data:DBData,guild:int):
    result = runQuery(data,"select id from serverlist where serverid = %s",guild)
    return [list(i) for i in result]

def getDataArr(data:DBData,guild:int):
    result = runQuery(
        data,
        "SELECT w.value \
        FROM serverlist s \
        INNER JOIN filterword fw \
        ON fw.serverlist_index = s.index \
        INNER JOIN words w \
        ON w.word_id = fw.word_id \
        WHERE serverid = %s \
        ",
        guild
    )
    return [list(i)[0] for i in result]