import discord, asyncio, os
from discord import activity
from discord.enums import Status
from discord.ext import commands
from discord_slash import SlashCommand, SlashContext

def run(client):
    slash = SlashCommand(client, sync_commands=True)
    @slash.slash(
        name="hello",
        description="Just sends a message",
        guild_ids=[895925360049418240]
    )
    async def _hello(ctx:SlashCommand):
        await ctx.send("world!")