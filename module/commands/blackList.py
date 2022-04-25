from msilib.schema import Component
from random import choices
from secrets import choice
import interactions


def run(bot):
    @bot.command(
        name="blacklist",
        description="This description isn't seen in UI (yet?)",
        #scope는 사용하고 잇는 서버의 id입니다. 
        #테스트시 수정해서 사용해야 합니다.
        scope=895925360049418240,
        options=[
            interactions.Option(
                name="room",
                description="A descriptive description",
                type=interactions.OptionType.SUB_COMMAND,
                options=[
                    interactions.Option(
                        name="activity",
                        description="A descriptive description",
                        type=interactions.OptionType.STRING,
                        required=True,
                        choices=[
                        {
                                "name":"add",
                                "value":"add"
                            },
                            {
                                "name":"remove",
                                "value":"remove"
                            },
                        ]
                    ),
                    interactions.Option(
                        name="channel",
                        description="A descriptive description",
                        type=interactions.OptionType.CHANNEL,
                        required=False,
                    ),
                ],
            ),
            interactions.Option(
                name="word",
                description="A descriptive description",
                type=interactions.OptionType.SUB_COMMAND,
                options=[
                    interactions.Option(
                        name="activity",
                        description="A descriptive description",
                        type=interactions.OptionType.STRING,
                        required=True,
                        choices=[
                            {
                                "name":"add",
                                "value":"add"
                            },
                            {
                                "name":"remove",
                                "value":"remove"
                            },
                        ]
                    ),
                    interactions.Option(
                        name="word",
                        description="A descriptive description",
                        type=interactions.OptionType.STRING,
                        required=False,
                    ),
                ],
            ),
        ],
    )
    async def cmd(ctx: interactions.CommandContext, sub_command: str,channel: interactions.ChannelMention = None,activity:str="",word:str=""):
        if sub_command == "room":
            #이 부분은 채널의 저장하는 행동이 들어가야합니다.
            await ctx.send(f"channel id= {channel.id}")
        elif sub_command == "word":
            #이 부분은 데이터를 저장해서 이름을 계속 비교해야한다.
            await ctx.send(f"word = {word}")