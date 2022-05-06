from .Data import *
from .io import *

def addServer(data:DBData,channelID:int):
    runQuery(data,"insert into serverlist(serverid) values (%s)",channelID)



def addChannel(data:DBData,guildIndex:tuple):
    r'데이터베이스에 없는 채널 추가'
    serverID = list(guildIndex)[1]
    val = [((int)(serverID),i) for i in data.serverChannelDict[serverID]]
    print(val)
    runQuerys(
        data,
        "insert ignore into filterchannel(serverlist_index,channel_id) \
        Values(( \
        SELECT `index` \
        FROM serverlist \
        WHERE serverid = %s\
        ),%s)\
        ",
        val
    )

def removeChannel():
    pass

def addWord(data:DBData,guildIndex:tuple):
    r'데이터베이스에 없는 단어 추가'
    serverID = list(guildIndex)[1]
    val = [((int)(serverID),i) for i in data.serverWordDict[serverID]]
    print(val)
    runQuerys(data,"INSERT IGNORE INTO words(value) values (%s)",data.serverWordDict[serverID])
    runQuerys(
        data,
        "insert ignore into filterword(serverlist_index,word_id) \
        SELECT s.index, w.word_id \
        FROM serverlist s, words w \
        WHERE s.serverid = %s and w.value =%s\
            ",
        val
    )

def removeWord():
    pass

def getServerIDs(data:DBData):
    result = runQuery(data,"select serverid from serverlist")
    return [list(i)[0] for i in result]

def getServerIndex(data:DBData,guild:int):
    result = runQuery(data,"select id from serverlist where serverid = %s",guild)
    return [list(i) for i in result]

def getDataArr(data:DBData,guild:int,**kwargs):
    type = kwargs.get("type")
    if(type == 'word'):
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
    if(type == 'channel'):
        result = runQuery(
            data,
            "SELECT fc.channel_id \
            FROM serverlist s \
            INNER JOIN filterchannel fc \
            ON fc.serverlist_index = s.index \
            WHERE serverid = %s \
            ",
            guild
        )
    return [list(i)[0] for i in result]