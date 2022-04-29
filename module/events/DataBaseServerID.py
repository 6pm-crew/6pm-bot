from typing import Tuple
import discord

from module.utils.Data.Data import Data

#서버id 타입 데이터(단어,채팅방 id)
def run(bot:discord.Client,serverData:Data):
    @bot.event
    async def on_ready():
        guilds = []
        for guild in bot.guilds:
            guilds.append(guild.id)
        print(guilds)
        serverCursor = serverData.connction.cursor()
        if(len(guilds) == 1):
            print('execute')
            serverCursor.execute("insert into server(id) values(?)",)
        else:
            serverCursor.executemany("insert into server(id) values(?)",guilds)