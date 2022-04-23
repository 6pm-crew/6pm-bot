import discord
from discord import activity
from discord.enums import Status
from discord.ext import commands
from discord_slash import SlashCommand, SlashContext

def run(client,data):

    slash = SlashCommand(client, sync_commands=True)
    @slash.slash(
        name="hello",
        description="Just sends a message",
    )
    async def _hello(ctx:SlashCommand):
        print(data)
        await ctx.send("world!")