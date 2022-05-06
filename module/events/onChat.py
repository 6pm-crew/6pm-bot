import discord

from module.utils.DatabaseServer.DataBase import *


def run(bot:discord.Client,serverData:DBData):
    # pass
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