from typing import List
from .Data import *
from .io import *

def addServer(data:DBData,guild:int):
    """데이터베이스에 서버를 추가하는 함수입니다.

    Args:
        data (DBData): 데이터를 저장하는 DBData 객체
        guild (int): 서버 ID
    """
    runQuery(data,"insert ignore into serverlist(serverid) values (%s)",guild)

def removeSerer(data:DBData,guild:int):
    """데이터베이스에서 서버를 제거하는 함수입니다.

    Args:
        data (DBData): 데이터를 저장하는 DBData 객체
        guild (int): 서버 ID
    """
    runQuery(data,"delete ignore from filterchannel where serverlist_index in (select `index` from serverlist where `serverid` = %s)",guild)
    runQuery(data,"delete ignore from filterword where serverlist_index in (select `index` from serverlist where `serverid` = %s)",guild)
    runQuery(data,"delete ignore from serverlist where  (%s)",guild)


def removeServer(data:DBData,guild:int):
    """데이터베이스에서 사용하고 

    Args:
        data (DBData): 데이터를 저장하는 DBData 객체
        guild (int): _description_
    """

def addChannel(data:DBData,guildIndex:tuple):
    """데이터베이스 filterchannel에 채널을 추가하는 함수입니다.

    Args:
        data (DBData): 데이터를 저장하는 DBData 객체
        guildIndex (tuple): _description_
    """
    serverID = list(guildIndex)[1]
    print(serverID)
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
    """
    url주소에서 파일을 가져와 단어 리스트를 반환합니다.


    Inputs:
        :data: 단어를 추가하기 위해서 서버가 켜있는 동안 저장된 단어를 불러옵니다. 
        :type data: float
        :param tuple guildIndex: 불러올 url
    """
    serverID = list(guildIndex)[1]
    val = [((int)(serverID),i) for i in data.serverWordDict[serverID]]
    # print(val)
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

def removeWord(data:DBData,guildIndex:tuple):
    """ 데이터베이스에 단어를 추가하는 함수입니다.

    Args:
        data (DBData): 데이터를 저장하는 DBData 객체
        guildIndex (tuple): _description_
    """
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

def getServerIDs(data:DBData):
    """데이터베이스에 저장되어있는 guild ID를 가지고 옵니다.

    Args:
        data (DBData): 데이터를 저장하는 DBData 객체

    Returns:
        _type_: _description_
    """
    result = runQuery(data,"select serverid from serverlist")
    return [list(i)[0] for i in result]

def getServerIndex(data:DBData,guild:int):
    result = runQuery(data,"select id from serverlist where serverid = %s",guild)
    return [list(i) for i in result]

def getDataArr(data:DBData,guild:int,**kwargs)->List:
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