import discord
from discord.commands import Option
from config import SCOPE
from module.utils.DatabaseServer.DataBase import *

#0 : channel
#1 : word
#2 : default(global )
def run(bot:discord.Bot,serverData:DBData):
    blackList = bot.create_group("blacklist", "blaklist word or channel for chat")
    @blackList.command(guild_ids=[SCOPE])
    async def room(
        ctx: discord.ApplicationContext,
        activeoptions : Option(str, "Enter command", choices=["add","remove"]),
        channel : Option(discord.channel.TextChannel , "description here")
    ):
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





    