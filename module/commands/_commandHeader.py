from dataclasses import replace
import discord, asyncio, os
from discord import activity
from discord.enums import Status
from discord.ext import commands
from discord_slash import SlashCommand, SlashContext
import glob


#commands안에 있는 모든 명령어를 읽어드려서 가져오기해주는 구간입니다.
def run(client,data):
    print("running command handler...")
    os.chdir("./module/commands")
    moduleName = [s.replace(".py","") for s in glob.glob("[!_]*.py")]
    print("command List: " + str(moduleName))
    os.chdir("../../")

    if len(moduleName) <= 0:
        print("no events found...")
        return
    for name in moduleName:
        globals()[name] = __import__(f'module.commands.{name}',fromlist='{name}')
        print(globals()[name])
        globals()[name].run(client,data)

