import pymysql
import pymysql.cursors

class DBData:
    """
    서버에서 사용하는 모든 데이터가 들어가 있는 데이터 저장 클라스입니다.
    """
    def __init__(self,database:pymysql.Connection):
        """
        :param database: 사용중인 데이터베이스 
        :type database: pymysql.Connection

        """
        self.originWord = {}
        self.originChannel = {}
        self.serverWordDict = {}
        self.serverChannelDict = {}
        self.database = database
        self.cursor:pymysql.cursors.Cursor = database.cursor()

    WORD = 1
    CHANNEL = 2
    def addData(self,type:int,guild:int,value:any):
        """
        단어혹은 채널의 필터링을 추가해준다.

        :param type: 추가할 종류를 선언해준다.
        :type type: int
        :param guild: 추가할 디스코드 서버 ID를 넣어준다.
        :type guild: int
        :param value: 넣을 값을 넣어준다.
        :type value: any
        """

        if(type == 0):
            if(value == None):
                self.serverWordDict[(str)(guild)] = []
                return
            if(not (value in self.serverWordDict[(str)(guild)])):
                self.serverWordDict[(str)(guild)].append(value)
        else:
            if(value == None):
                self.serverChannelDict[(str)(guild)] = []
                return
            if(not (value in self.serverChannelDict[(str)(guild)])):
                self.serverChannelDict[(str)(guild)].append(value)
    
    def removeData(self,type:int,guild:int,value:any):
        """
        단어혹은 채널의 필터링을 제거해준다.
        
        :param type: 추가할 종류를 선언해준다.
        :type type: int
        :param guild: 추가할 디스코드 서버 ID를 넣어준다.
        :type guild: int
        :param value: 넣을 값을 넣어준다.
        :type value: any
        """
        if(type == 0):
            if(value in self.serverWordDict[(str)(guild)]):
                self.serverWordDict[(str)(guild)].remove(value)
        else:
            if(value in self.serverChannelDict[(str)(guild)]):
                self.serverChannelDict[(str)(guild)].remove(value)

