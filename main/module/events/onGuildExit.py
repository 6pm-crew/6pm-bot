from http import server
from typing import Tuple
import discord
# from module.utils.Data.Data import Data
from module.utils.DatabaseServer.DataBase import *

#서버id 타입 데이터(단어,채팅방 id)
def run(bot:discord.Client,serverData:DBData):
    """
    디스코드 봇 실행시 실행되는 부분입니다.\n
    서버가 디스코드 봇을 퇴장시킬 때 사용되는 부분입니다.

    :param bot: 현재 실행 준비 봇 객체의 정보
    :type bot: discord.Bot
    :param serverData: 현재 서버를 실행하면 나오는 데이터베이스
    :type serverData: DBData
    """
    @bot.event
    async def on_guild_remove(guild:discord.Guild):
        print(guild.name)