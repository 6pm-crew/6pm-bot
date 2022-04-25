import interactions

def run(bot:interactions.Client):
    @bot.message_command(name="Hello message", scope=895925360049418240)
    async def hello_message(ctx: interactions.CommandContext):
        await ctx.send(f'you said, "{ctx.target.content}"')