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

import discord
from discord.commands import Option
from config import SCOPE
from module.utils.DatabaseServer.DataBase import *




def run(bot:discord.Bot,serverData:DBData):
    """
    blacklist 커맨드 관리를 실행하는 구현부입니다.

    :author: dennis ko

    :param bot: 현재 실행 준비 봇 객체의 정보
    :type bot: discord.Bot
    :param serverData: 현재 서버를 실행하면 나오는 데이터베이스
    :type serverData: DBData
    """
    blackList = bot.create_group("blacklist", "blaklist word or channel for chat")
    @blackList.command(guild_ids=[SCOPE])
    async def room(
        ctx: discord.ApplicationContext,
        activeoptions : Option(str, "Enter command", choices=["add","remove"]),
        channel : Option(discord.channel.TextChannel , "description here")
    ):
        """
        디스코드 채팅방 필터 추가에 대한 슬래시 커맨드를 등록하는 부분입니다.
        """
        print(serverData.serverChannelDict)
        if activeoptions == 'remove':
            serverData.removeData(DBData.CHANNEL,ctx.guild_id,channel.id)
            # DataBase.storeDBArr(serverData)
        elif activeoptions == 'add':
            serverData.addData(DBData.CHANNEL,ctx.guild_id,channel.id)
        elif activeoptions == 'list':
            pass
        print(serverData.serverChannelDict[(str)(ctx.guild_id)])
        await ctx.respond(f"{ctx.guild_id} room {activeoptions} {channel.mention} {channel.id}")

    @blackList.command(guild_ids=[SCOPE])
    async def word(
        ctx: discord.ApplicationContext,
        activeoptions : Option(str, "Enter command", choices=["add","remove"]),
        words: Option(str, "Select a word(divide word use ,)")
    ):
        """
        디스코드 단어 추가에 대한 슬래시 커맨드를 등록하는 부분입니다.
        """
        #서버데이터에서 가져옴
        if activeoptions == 'remove':
            serverData.removeData(DBData.WORD,ctx.guild_id,words)
            # DataBase.storeDBArr(serverData)
        elif activeoptions == 'add':
            serverData.addData(DBData.WORD,ctx.guild_id,words)
        elif activeoptions == 'list':
            pass

        print(serverData.serverWordDict[(str)(ctx.guild_id)])
        await ctx.respond(f"word {activeoptions} {words}")





    