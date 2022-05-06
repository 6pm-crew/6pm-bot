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
        for guild in bot.guilds:
            if( not(guild.id in result)):
                serverData.serverWordDict[(str)(guild.id)] = []
                serverData.serverChannelDict[(str)(guild.id)] = []
                addServer(serverData,guild.id)
        colorPrint(COLORFRONT.MAGENTA,f'We have logged in as {bot.user}')