#!/usr/local/bin/python3
import pymysql as db


def connect(typ, query):

    _acc_un, _acc_pw, _host, _dataB = "adc1", "quahgesh", "cs1.ucc.ie", "2020_adc1"

    connection = db.connect("cs1.ucc.ie", "adc1", "quahgesh", "2020_adc1")
    cursor = connection.cursor()

    if typ is "ins":
        print("<p>Thank You! Details saved!</p>")
        try:
            cursor.execute(query)
            connection.commit()
        except db.Error:
                print("<p>EXCEPTION_INSERT: FAILED, Authentication</p>")
    elif typ is "del":
        print("<p>:( Aww!</p>")
        try:
            cursor.execute(query)
            connection.commit()
        except db.Error:
            print("<p>EXCEPTION_DELETE: FAILED</p>")
            connection.rollback()
    connection.close()
    cursor.close()


# Insertion query for new user to be added

"""
Private function to Insert new member details to the database
@param: string:username, string:password
"""


def _insert_new_user(username, password):
    typ, score, times_played = "ins", 0, 0

    query = "INSERT INTO 'players' ('USERNAME', 'PASSWORD', 'SCORE', 'TIMES_PLAYED') " \
            "VALUES ('%s', '%s', '%i', '%i')", \
            (username, password, score, times_played)

    connect(typ, query)


def _insert_contact(fname, lname, email, country, message):
    typ = "ins"

    query = "INSERT INTO 'contact'('fname', 'lname', 'email', 'country', 'message') " \
            "VALUES (%s, %s, %s, %s, %s)", \
            (fname, lname, email, country, message)
    connect(typ, query)
    return
