#!/usr/local/bin/python3

from cgitb import enable
from py_wrappers.cgibin.connect import access_db as connect

enable()


# Insertion query for new user to be added


def insert_new_user(self, username, password):
    score, times_played = 0, 0

    query = "INSERT INTO players(username, password, score, times_played) VALUES (%s, %s, %i, %i)" % (
        username, password, score, times_played)

    connect(query)
    return


def insert_contact(self, fname, lname, email, country, message):
    query = "INSERT INTO contact(fname, lname, email, country, message) VALUES (%s, %s, %s, %s, %s)" % (
        fname, lname, email, country, message)
    connect(query)
    return
