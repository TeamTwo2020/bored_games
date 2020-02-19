# Imports

import pymysql as mysql
from os import environ

# Login details for mysql
#**config = {'user': 'cgg1', 'password': 'weeS2dih', 'host': 'cs1.ucc.ie', 'database': '2021_cgg1',
#          'raise_on_warnings': True}
user, password, host, database = "cgg1", "weeS2dih", "cs1.ucc.ie", "2021_cgg1"
"""
Python functions for connecting to mysql database.

@author: Adrian Denis Coffey

Function to create connection to database. 
Used with each of the query functions
@param: string:query = Formatted mysql query string for data manipulation
"""


# Method for opening connection to mysql database
def access_db(query):
    global connection
    try:
        connection = mysql.connect(user, password, host, database)  # establish connection via mysql connector
        if connection.is_connected():  # Verify connection is established
            print("access_db: Connecting... ")  # Output confirmation
        cursor = connection.cursor()  # Navigation cursor for database
        cursor.execute(query)  # Execute query on database
        result = cursor.fetchall()
        return result  # Return query result
    except mysql.err as err:  # Exception handler: Connection error
        if err.errno == mysql.err.InterfaceError:  # If ACCESS DENIED (Incorrect login)
            print("access_db: Error in username or password")  # Output error message with prompt to remedy.
        elif err.errno == mysql.err.DatabaseError:  # If Database details are erroneous
            print("access_db: Database does not exist!")  # Output error message that database info is incorrect
        else:
            print(err)  # Print the error
    finally:
        connection.commit()  # Send query to database
        connection.close()  # Close connection to database


"""
Private function to Insert new member details to the database
@param: string:username, string:password
"""


def _insert(self, username, password):
    # Database manipulation query::INSERT
    new_member_entry = "INSERT INTO players(username, password) VALUES(%s, '%s')" % (username, password)
    self.access_db(new_member_entry)  # Pass query to connection opening method _access_db()
    return  # exit


"""
Private function to DELETE member details from the database
@param: mysql.connector:connection, mysql.connector.cursor:bg_db_cursor, string:username, string:password
"""


def _unregister_member(self, connection, cursor, username, password):
    # Database manipulation query::DELETE FROM
    remove_entry = "DELETE FROM players WHERE username = %s" % (username)
    self.access_db(remove_entry)  # Pass query to connection opening method _access_db()
    return  # exit


"""
private function to UPDATE member score details in database
@param: mysql.connector:connection, mysql.connector.cursor:bg_db_cursor, string:username, string:password
"""


def _update_score(self, connection, cursor, username, password, score):
    # Database manipulation query::UPDATE
    update_score_command = "UPDATE players SET score+%i WHERE username = %s" % (score, username)
    self.access_db(update_score_command)  # Pass query to connection opening method _access_db()
    return  # exit
