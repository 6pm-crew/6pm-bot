from config import DiscordBotToken
import module.commands._commandHeader as CommandHeader
import module.events._eventHeader as EventHeader
import interactions
# declare discordBot
# #클라이언트에서 필요한 모든 데이터를 사용할 수 있다.
bot = interactions.Client(DiscordBotToken)


# 이벤트 및 명령어 헨들러를 실행한다.
CommandHeader.run(bot)
EventHeader.run(bot)



@bot.event
async def on_ready():
    print(bot.me.id)

bot.start()