from random import choice, choices
import discord
from discord.commands import Option
from config import SCOPE

def run(bot:discord.Bot):
    blackList = bot.create_group("blacklist", "blaklist word or channel for chat")
    @blackList.command(guild_ids=[SCOPE])
    async def room(
        ctx: discord.ApplicationContext,
        activeoptions : Option(str, "Enter command", choices=["add","remove"]),
        channel: Option(discord.TextChannel, "Select a channel")
    ):
        #데이터베이스에 단어 추가
        await ctx.respond(f"room {activeoptions} {channel}")

    @blackList.command(guild_ids=[SCOPE])
    async def word(
        ctx: discord.ApplicationContext,
        activeoptions : Option(str, "Enter command", choices=["add","remove"]),
        words: Option(str, "Select a word(divide word use ,)")
    ):
        #데이터베이스에 단어 추가
        await ctx.respond(f"world {activeoptions} {words}")

    