from http import server
import sqlite3
from typing import Tuple
import discord
import module.utils.DataBase.DB as DataBase

from module.utils.Data.Data import Data

#서버id 타입 데이터(단어,채팅방 id)
def run(bot:discord.Client,serverData:Data):
    @bot.event
    async def on_ready():

        guilds = []
        for guild in bot.guilds:
            guilds.append((guild.id,"{}","{}"))
        print(guilds)
        serverCursor = serverData.connction.cursor()
        try:
            if(len(guilds) == 1):
                print('execute')
                serverCursor.execute("insert into server(id,channels,words) values (?,?,?)",guilds[0])
                serverData.connction.commit()
                
            else:
                serverCursor.executemany("insert into server(id,channels,word) values(?)",guilds)
                serverData.connction.commit()
        except sqlite3.IntegrityError as e:
            pass

    
        result = DataBase.loadDBArr(serverData.connction)
        print(result)
        if(result != None):
            for (index,serverID) in enumerate(result['id']):
                serverData.add(Data.WORDDATABASEARR,type = Data.INSERT ,serverID = serverID,val = result['words'][index])
                serverData.add(Data.CHANNELDATABASEARR,type = Data.INSERT ,serverID = serverID,val = result['channels'][index])
