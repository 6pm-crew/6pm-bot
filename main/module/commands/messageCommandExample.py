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

from module.utils.DatabaseServer.DataBase import DBData

def run(bot:discord.Bot,serverData:DBData):
    """
    메세지의 정보를 받는 이벤트리스너를 실행하는 구간입니다.

    :author: dennis ko

    :param bot: 현재 실행 준비 봇 객체의 정보
    :type bot: discord.Bot
    :param serverData: 현재 서버를 실행하면 나오는 데이터베이스
    :type serverData: DBData
    """
    pass
#     @bot.message_command(name="Hello message", scope=895925360049418240)
#     async def hello_message(ctx: interactions.CommandContext):
#         await ctx.send(f'you said, "{ctx.target.content}"')