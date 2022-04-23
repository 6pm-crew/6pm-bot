from dataclasses import replace
import discord, asyncio, os
from discord import activity
from discord.enums import Status
from discord.ext import commands
from discord_slash import SlashCommand, SlashContext
import glob

def run(client,data):
    print("running event handler...")
    os.chdir("./module/events")
    moduleName = [s.replace(".py","") for s in glob.glob("[!_]*.py")]
    print("Event List: " + str(moduleName))
    os.chdir("../../")

    for name in moduleName:
        globals()[name] = __import__(f'module.events.{name}',fromlist='{name}')
        print(globals()[name])
        globals()[name].run(client,data)
    

