from http import server
import discord
from discord.commands import Option
from config import SCOPE
from module.utils.Data.Data import Data

def run(bot:discord.Bot,serverData:Data):
    blackList = bot.create_group("blacklist", "blaklist word or channel for chat")
    @blackList.command(guild_ids=[SCOPE])
    async def room(
        ctx: discord.ApplicationContext,
        activeoptions : Option(str, "Enter command", choices=["add","remove"]),
        channel : Option(discord.channel.TextChannel , "description here")
    ):
        # serverData.DataBaseArr[ctx.guild_id]
        #데이터베이스에 단어 추가
        # print(channel)
        # database.runCmd(f"INSERT INTO server(id,words,channels) VALUES({},{channel.mention},{})")
        serverData.getData(ctx.guild_id)
        await ctx.respond(f"{ctx.guild_id} room {activeoptions} {channel.mention} {channel.id}")

    @blackList.command(guild_ids=[SCOPE])
    async def word(
        ctx: discord.ApplicationContext,
        activeoptions : Option(str, "Enter command", choices=["add","remove"]),
        words: Option(str, "Select a word(divide word use ,)")
    ):
        #데이터베이스에 단어 추가
        await ctx.respond(f"world {activeoptions} {words}")





    