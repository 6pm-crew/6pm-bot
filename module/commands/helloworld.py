#backlist room add 
import interactions

def run(bot):
    @bot.command(
        name="my_first_command",
        description="This is the first command I made!",
        scope=895925360049418240,
    )
    async def my_first_command(ctx: interactions.CommandContext):
        await ctx.send("Hi there!")
