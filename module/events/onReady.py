import interactions

def run(bot:interactions.Client):
    @bot.event
    async def on_ready():
        print(bot.me.id)