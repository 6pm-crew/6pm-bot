import discord

def run(bot:discord.Client):
    @bot.event
    async def on_ready():
        print(bot.user)