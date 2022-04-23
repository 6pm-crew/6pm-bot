
from discord import activity
from discord.enums import Status
from discord.ext import commands
from discord_slash import SlashCommand, SlashContext

def run(client,data):
    @client.event
    async def on_ready():
        print('We have logged in as {0.user}'.format(client))