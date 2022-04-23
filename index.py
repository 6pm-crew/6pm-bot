from operator import mod
from threading import local
import discord, asyncio, os
from discord import activity
from discord.enums import Status
from discord.ext import commands
from discord_slash import SlashCommand, SlashContext
from config import DiscordBotToken

import os as os

import module.commands._commandHeader as CommandHeader
import module.events._eventHeader as EventHeader
# from module.commands.commandHeader import run 

# bot = commands.Bot(command_prefix='/',status = discord.Status.online, activity = game)

# declare discordBot
game = discord.Game("Primary Bot")
client = commands.Bot(command_prefix="!",status = discord.Status.online, activity = game)

#클라이언트에서 필요한 모든 데이터를 사용할 수 있다.
data = {
    "guildIds" : list(s.id for s in client.guilds)
}
#이벤트 및 명령어 헨들러를 실행한다.
CommandHeader.run(client,data)
EventHeader.run(client,data)


print("running")
client.run(DiscordBotToken)
