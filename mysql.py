from config import *


import pymysql
import module.utils.DatabaseServer.DataBase as DataBase

db = pymysql.Connect(host=DATABASE['host'],user=DATABASE['user'],passwd=DATABASE['passwd'],db=DATABASE['db'],charset=DATABASE['charset'],port=DATABASE['port'])

# val = [('895925360049418240')]
val =[(895925360049418240, 895925419981819964), (895925360049418240, 895928895021400094)]
test = DataBase.DBData(db)
result = DataBase.runQuerys(
        test,
        "insert ignore into filterchannel(serverlist_index,channel_id) \
        Values(( \
        SELECT `index` \
        FROM serverlist \
        WHERE serverid = %s\
        ),%s)\
        ",
        val
    )
print(result)
# print([list(x) for x in result])
# result = DataBase.runQuerys(test,"select serverid from serverlist where serverid = (%s)",val)
# print([list(x) for x in result])


# def print_format_table():
#         """
#         prints table of formatted text format options
#         """
#         for style in range(8):
#                 for fg in range(30,38):
#                         s1 = ''
#                         for bg in range(40,48):
#                                 format = ';'.join([str(style), str(fg), str(bg)])
#                                 s1 += '\x1b[%sm %s \x1b[0m' % (format, format)
#                         print(s1)
#                         print('\n')


# print_format_table()