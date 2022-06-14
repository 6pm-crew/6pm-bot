import discord

from module.utils.DatabaseServer.DataBase import *

def run(bot:discord.Client,serverData:DBData):
    """
    디스코드 봇 실행시 실행되는 부분입니다.\n
    채팅 쳤을 때에 대한 이벤트 리스너를 등록하는 과정입니다.

    :param bot: 현재 실행 준비 봇 객체의 정보
    :type bot: discord.Bot
    :param serverData: 현재 서버를 실행하면 나오는 데이터베이스
    :type serverData: DBData
    """
    @bot.event
    async def on_message(message:discord.Message):
        if message.author == bot.user:
            return
        if message.channel.id in serverData.serverChannelDict[(str)(message.guild.id)]:
            print (message.content)
            if(message.type == discord.MessageType.default):
                await message.delete()
        for word in serverData.serverWordDict[(str)(message.guild.id)]:
            if message.content.find(word) >= 0:
                await message.delete()