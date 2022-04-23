from dataclasses import replace
import discord, asyncio, os
from discord import activity
from discord.enums import Status
from discord.ext import commands
from discord_slash import SlashCommand, SlashContext
import glob

def run(client):
    print("run")

    os.chdir("./module/commands")
    moduleName = [s.replace(".py","") for s in glob.glob("[!_]*.py")]
    print(moduleName)
    # for name in moduleName:
    #     globals()[name] = __import__(f'module.commands.{name}',fromlist='{name}')
    #     globals()[name].run(client)


    # slash = SlashCommand(client, sync_commands=True)
    # @slash.slash(
    #     name="hello",
    #     description="Just sends a message",
    #     guild_ids=[895925360049418240]
    # )
    # async def _hello(ctx:SlashCommand):
    #     await ctx.send("world!")