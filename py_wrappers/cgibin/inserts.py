#!/usr/local/bin/python3

from cgitb import enable
from py_wrappers.cgibin.connect import access_db as connect

enable()


# Insertion query for new user to be added

"""
Private function to Insert new member details to the database
@param: string:username, string:password
"""

def insert_new_user(username, password):
    score, times_played = 0, 0

    query = "INSERT INTO players('username', 'password', 'score', 'times_played') " \
            "VALUES (%s, %s, %i, %i)", \
            (username, password, score, times_played)

    connect(query)
    return


def insert_contact(fname, lname, email, country, message):
    query = "INSERT INTO contact('fname', 'lname', 'email', 'country', 'message') " \
            "VALUES (%s, %s, %s, %s, %s)", \
            (fname, lname, email, country, message)
    connect(query)
    return

if __name__ == "__main__":
    fname, lname, email, country, message = "alice", "smith", "a.smith@hotmail.com", "Cork", "TEST 1, 2"
    username, password = "assmith", "d2sp"

    insert_contact(fname, lname, email, country, message)
    insert_new_user(username, password)
