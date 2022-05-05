import pymysql
import pymysql.cursors

class DBData:
    
    def __init__(self,database:pymysql.Connection):
        self.originWord = {}
        self.originChannel = {}
        self.serverWordDict = {}
        self.serverChannelDict = {}
        self.database = database
        self.cursor:pymysql.cursors.Cursor = database.cursor()

    WORD = 0
    CHANNEL = 1
    def addData(self,type:int,guild:int,value:any):
        if(type == 0):
            if(not (value in self.serverWordDict[(str)(guild)])):
                self.serverWordDict[(str)(guild)].append(value)
        else:
            if(not (value in self.serverChannelDict[(str)(guild)])):
                self.serverChannelDict[(str)(guild)].append(value)
    
    def removeData(self,type:int,guild:int,value:any):
        if(type == 0):
            if(value in self.serverWordDict[(str)(guild)]):
                self.serverWordDict[(str)(guild)].remove(value)
        else:
            if(value in self.serverChannelDict[(str)(guild)]):
                self.serverChannelDict[(str)(guild)].remove(value)

