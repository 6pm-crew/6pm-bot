from http import server
import sqlite3
from typing import Tuple
import discord
# from module.utils.Data.Data import Data
from module.utils.DatabaseServer.DataBase import *

#서버id 타입 데이터(단어,채팅방 id)
def run(bot:discord.Client,serverData:DBData):
    @bot.event
    async def on_ready():
        result = getServerIDs(serverData)
        print(result)
        for guild in bot.guilds:
            print(guild.id)
            if( not(guild.id in result)):
                serverData.serverWordDict[(str)(guild.id)] = []
        print(result)
                # addServer(serverData,guild.id)
        # try:
        #     if(len(guilds) == 1):
        #         print('execute')
        #         serverCursor.execute("insert into server(id,channels,words) values (?,?,?)",guilds[0])
        #         serverData.connction.commit()
                
        #     else:
        #         serverCursor.executemany("insert into server(id,channels,word) values(?)",guilds)
        #         serverData.connction.commit()
        # except sqlite3.IntegrityError as e:
        #     pass

    
        # result = DataBase.loadDBArr(serverData.connction)
        # print(result)
        # if(result != None):
        #     for (index,serverID) in enumerate(result['id']):
        #         serverData.add(Data.WORDDATABASEARR,type = Data.INSERT ,serverID = serverID,val = result['words'][index])
        #         serverData.add(Data.CHANNELDATABASEARR,type = Data.INSERT ,serverID = serverID,val = result['channels'][index])
