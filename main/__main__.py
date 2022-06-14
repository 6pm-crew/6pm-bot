#MIT License
#
#Copyright (c) 2021 dennis ko
#
#Permission is hereby granted, free of charge, to any person obtaining a copy
#of this software and associated documentation files (the "Software"), to deal
#in the Software without restriction, including without limitation the rights
#to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
#copies of the Software, and to permit persons to whom the Software is
#furnished to do so, subject to the following conditions:
#
#The above copyright notice and this permission notice shall be included in all
#copies or substantial portions of the Software.
#
#THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
#IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
#FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
#AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
#LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
#OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
#SOFTWARE.


# from discord import Intents
import atexit
from http import server
from typing import Dict
import discord
from discord.commands import Option
from discord.ext import commands
import module.commands._commandHeader as CommandHeader
import module.events._eventHeader as EventHeader
import pymysql
import module.utils.DatabaseServer.DataBase as DataBase
import numpy
from config import *
import copy

# import sqlite3
from config import DISCORDBOTTOKEN, SCOPE

# 데이터 베이스 기본 세팅및 없을 경우 제작한다.
db = pymysql.Connect(host=DATABASE['host'],user=DATABASE['user'],passwd=DATABASE['passwd'],db=DATABASE['db'],charset=DATABASE['charset'],port=DATABASE['port'])
serverData = DataBase.DBData(db)
result = DataBase.getServerIDs(serverData)
# 서버 uid를 다 가지고 온다.
for guildId in result:
    # 데이터베이스에서 단어와 채널에 대해서 정보를 읽어온다. 
    banWordList = DataBase.getDataArr(serverData,guildId,type='word')
    banChannelList = DataBase.getDataArr(serverData,guildId,type='channel')
    # 필터링된 단어와 채널를 현재 상태에 추가해준다. 
    serverData.serverWordDict[(str)(guildId)] = banWordList
    serverData.serverChannelDict[(str)(guildId)] = banChannelList
    # 필터링된 단어와 채널를 기존 상태에 추가해준다.
    serverData.originWord[(str)(guildId)] = copy.deepcopy(banWordList)
    serverData.originChannel[(str)(guildId)] = copy.deepcopy(banChannelList)

print(serverData.serverWordDict)
print(serverData.serverChannelDict)

# discord 정책 변경으로 intents 설정없이 서버 데이터 접근이 불가능해졌습니다.
# 더 자세한 내용을 참고하고 싶다면
# https://support-dev.discord.com/hc/en-us/articles/4404772028055-Message-Content-Privileged-Intent-FAQ를 확인해주세요
#
intents = discord.Intents.default()
intents.message_content = True
intents.guilds = True
# 봇의 `intents`를 사용하였다.
bot = commands.Bot(intents = intents)

# 이벤트 및 명령어 헨들러를 실행한다.
CommandHeader.run(bot,serverData)
EventHeader.run(bot,serverData)


def differ(compareFirst:dict,compareSecond:dict) -> dict:
    """
    이 함수는 원래 초기에 있던 리스트와 현재 리스트를 비교해서 반환해주는 함수이다.
    :param compareFirst: 첫 번째 비교군
    :type compareFirst: Dict

    :param compareSecond: 두 번째 비교군
    :type compareSecond: Dict
    """
    result = dict()
    for serverId in compareSecond:
        if(not serverId in compareFirst.keys()):
            print("server is not found: ",serverId)
            # result[serverId] = list(set(compareFirst[serverId]) - set(compareSecond[serverId]))
            # result = list(set(compareFirst[serverId]) - set(compareSecond[serverId]))
        else:
            print(serverId, "::")
            print(compareFirst[serverId])
            print(compareSecond[serverId])
            result[serverId] = list(set(compareFirst[serverId]) - set(compareSecond[serverId]))


    return result



def exit_handler():
    """
    exit_handler()
    이 함수는 파이썬 종료시에 실행되는 함수이다. 이 부분으로 데이터베이스와 클라이언트 동기화를 실행해준다.

    """
    print(differ(serverData.originChannel,serverData.serverChannelDict))

    for data in enumerate(serverData.serverWordDict):
        pass
        # print(serverData.originChannel)
        # print(serverData.serverChannelDict)
        # DataBase.addWord(serverData,data)
        # DataBase.addChannel(serverData,data)
# 895928895021400094
# 종료시에 실행되는 이벤트 리스너를 넣어준다.
atexit.register(exit_handler)
bot.run(DISCORDBOTTOKEN)
