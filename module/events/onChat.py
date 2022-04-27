import discord

def run(bot:discord.Client):
    @bot.event
    async def on_message(message):
        if message.author == bot.user:
            return

        if message.content.startswith('$hello'):
            await message.channel.send('Hello!')