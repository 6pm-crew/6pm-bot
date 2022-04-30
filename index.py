# from discord import Intents
import json
from typing import Set
from xmlrpc.client import Server
import discord
from discord.commands import Option
from discord.ext import commands
import module.commands._commandHeader as CommandHeader
import module.events._eventHeader as EventHeader
from module.utils.Data.Data import Data
import module.utils.DataBase.DB as DataBase


# import sqlite3
from config import DISCORDBOTTOKEN, SCOPE


# discord 정책 변경으로 intents 설정없이 서버 데이터 접근이 불가능해졌습니다.
# 더 자세한 내용을 참고하고 싶다면
# https://support-dev.discord.com/hc/en-us/articles/4404772028055-Message-Content-Privileged-Intent-FAQ를 확인해주세요
#



intents = discord.Intents.default()
intents.message_content = True

bot = commands.Bot(intents = intents)

@bot.event
async def on_ready():
    print(f'We have logged in as {bot.user}')


# 데이터 베이스 기본 세팅및 없을 경우 제작한다.
conn = DataBase.load('./Data/setting.db')
writeCursor = conn.cursor()
DataBase.MakeDB(writeCursor,'server')
result = DataBase.loadDBArr(conn)

ServerData = Data(conn)
if(result != None):
    for (index,serverID) in enumerate(result['id']):
        ServerData.add(Data.WORDDATABASEARR,type = Data.INSERT ,serverID = serverID,val = result['words'][index])
        ServerData.add(Data.CHANNELDATABASEARR,type = Data.INSERT ,serverID = serverID,val = result['channels'][index])

# print(ServerData.wordDataBaseArr[895925360049418240])
# testing:set = set(ServerData.wordDataBaseArr[895925360049418240])
# testing.add("test")
# print(testing)


# 이벤트 및 명령어 헨들러를 실행한다.
CommandHeader.run(bot,ServerData)
EventHeader.run(bot,ServerData)

bot.run(DISCORDBOTTOKEN)
