from operator import mod
from threading import local
import discord, asyncio, os
from discord import activity
from discord.enums import Status
from discord.ext import commands
from discord_slash import SlashCommand, SlashContext
from config import DiscordBotToken

import os as os
import glob as glob





# from module.commands.commandHeader import run 

# game = discord.Game("Primary Bot")
# bot = commands.Bot(command_prefix='/',status = discord.Status.online, activity = game)

# import discord

client = commands.Bot(command_prefix="!")

# path = './module/commands/'
# file_list= [x[0] for x in os.walk(path)]
# print(file_list)
testing = __import__("module.commands.commandHeader")
print(testing)
# locals()['run'] = __import__("module.commands.commandHeader")



@client.event
async def on_ready():
    print('We have logged in as {0.user}'.format(client))

@client.event
async def on_message(message):
    None
    # if message.author == client.user:
    #     return

    # if message.content.startswith('$hello'):
    #     await message.channel.send('Hello!')

# run(client)
# my_module.run(client)

print("running")
client.run(DiscordBotToken)
