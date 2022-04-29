import numbers
from sqlite3 import DatabaseError
import sqlite3

from discord import ApplicationCommandInvokeError


class Data:
    DATABASEARR = "DataBaseArr"
    def __init__(self,data) -> None:
        self.DataBaseArr = {}
        self.connction:sqlite3.Connection = data
        
    def add(self,functionName:str,val:any):
        exec("{}.append({})".format("self."+functionName,val))
        print(self.DataBaseArr)

    def getData(self,serverID:numbers):
        print(serverID)
        serverData = None
        try:
            serverData = self.DataBaseArr[serverID]
        except ApplicationCommandInvokeError as e:
            pass
        except KeyError as e:
            pass
        return serverData

    