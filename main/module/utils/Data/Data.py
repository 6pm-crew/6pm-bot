import numbers
from pickle import NONE
from sqlite3 import DatabaseError
import sqlite3

from discord import ApplicationCommandInvokeError


class Data:
    """
    서버의 데이터 베이스의 정보를 저장하고 있는 클래스입니다.

    Custom Logo
    
    Constants:
        WORDDATABASEARR: `wordDataBaseArr`
        ==================================
    """

    WORDDATABASEARR = "wordDataBaseArr"
    CHANNELDATABASEARR = "channelDataBaseArr"


    def __init__(self,data) -> None:
        self.wordDataBaseArr = {}
        self.channelDataBaseArr = {}
        self.connction:sqlite3.Connection = data
    

    # add -> 기존에 있던 ch
    UPDATE = 0
    INSERT = 1
    def add(self,functionName:str,**kwargs):
        """
        type : UPDATE, INSERT
        functionName: fieldValue,
        serverID : discordID(numbers),
        val : any
        """
        typeVal = kwargs.get('type')
        serverID = kwargs.get('serverID')
        val = kwargs.get('val')
        if(typeVal == 0):
            exec('{}[{}].add("{}")'.format("self."+functionName,serverID,val))
        elif(typeVal == 1):
            exec("{}[{}] = set({})".format("self."+functionName,serverID,val))
        else:
            print("ttpeVal error")
        


    def getData(self,serverID:numbers):
        print(serverID)
        serverData = None
        try:
            serverData = self.wordDataBaseArr[serverID]
        except ApplicationCommandInvokeError as e:
            pass
        except KeyError as e:
            pass
        return serverData

    