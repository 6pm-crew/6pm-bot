# from discord import Intents
import atexit
from http import server
import discord
from discord.commands import Option
from discord.ext import commands
import module.commands._commandHeader as CommandHeader
import module.events._eventHeader as EventHeader
import pymysql
import module.utils.DatabaseServer.DataBase as DataBase
from config import *


# import sqlite3
from config import DISCORDBOTTOKEN, SCOPE



# 데이터 베이스 기본 세팅및 없을 경우 제작한다.
db = pymysql.Connect(host=DATABASE['host'],user=DATABASE['user'],passwd=DATABASE['passwd'],db=DATABASE['db'],charset=DATABASE['charset'],port=DATABASE['port'])
serverData = DataBase.DBData(db)
result = DataBase.getServerIDs(serverData)
for guildId in result:
    banWordList = DataBase.getDataArr(serverData,guildId,type='word')
    banChannelList = DataBase.getDataArr(serverData,guildId,type='channel')
    serverData.serverWordDict[(str)(guildId)] = banWordList
    serverData.serverChannelDict[(str)(guildId)] = banChannelList
print(serverData.serverWordDict)
print(serverData.serverChannelDict)

# discord 정책 변경으로 intents 설정없이 서버 데이터 접근이 불가능해졌습니다.
# 더 자세한 내용을 참고하고 싶다면
# https://support-dev.discord.com/hc/en-us/articles/4404772028055-Message-Content-Privileged-Intent-FAQ를 확인해주세요
#
intents = discord.Intents.default()
intents.message_content = True

bot = commands.Bot(intents = intents)

# 이벤트 및 명령어 헨들러를 실행한다.
CommandHeader.run(bot,serverData)
EventHeader.run(bot,serverData)

def exit_handler():
    for data in enumerate(serverData.serverWordDict):
        DataBase.addWord(serverData,data)
        DataBase.addChannel(serverData,data)
atexit.register(exit_handler)
bot.run(DISCORDBOTTOKEN)
