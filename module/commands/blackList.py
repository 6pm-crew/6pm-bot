from msilib.schema import Component
import interactions


def run(client):
    pass
    # @bot.commands(
    #     name="blackList",
    #     description="blackList word or room that people can't use",
    #     guild_ids=[895925360049418240],
    #     Component=[
    #         create_actionrow(
    #             create_select(
    #                 options=[
    #                     create_select_option("Lab Coat", value="coat", emoji="🥼"),
    #                     create_select_option("Test Tube", value="tube", emoji="🧪"),
    #                     create_select_option("Petri Dish", value="dish", emoji="🧫")
    #                 ],
    #                 placeholder="Choose your option",
    #                 min_values=1, # the minimum number of options a user must select
    #                 max_values=2 # the maximum number of options a user can select
    #             )
    #         )
    #     ]
    # )
    # async def _blackList(ctx:SlashCommand,text:str):
    #     await ctx.send("world!")