# Imports
import mysql.connector #To set up database for players

#Login details for mysql
**_config={'user':'cgg1', 'password':'weeS2dih', 'host':'cs1.ucc.ie', 'database':'2021_cgg1', 'raise_on_warnings':True}
"""
Python functions for connecting to and data manipulation in mysql database.

@author: Adrian Denis Coffey

Function to create connection to database. 
Used with each of the query functions
@param: string:query = Formatted mysql query string for data manipulation
"""
#Method for opening connection to mysql database
def _access_db(self, query): 
    try:
        bg_db_connection = mysql.connector.connect(**self._config) #establish connection via mysql connector
        if bg_db_connection.is_connected():     #Verify connection is established
            print("access_db: Connecting... ")  #Output confirmation
        cursor = bg_db_connection.cursor()      #Navigation cursor for database
        cursor.execute(query)                   #Execute query on database
        result = cursor.fetchall()              
        return result                           #Return query result
    except mysql.connector.error as err:        #Exception handler: Connection error
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:   #If ACCESS DENIED (Incorrect login)
            print("access_db: Error in username or password")   #Output error message with prompt to remedy.
        elif err.errno == errorcode.ER_BAD_DB_ERROR:        #If Database details are erroneous
            print("access_db: Database does not exist!")    #Output error message that database info is incorrect
        else:
            print(err)                                      #Print the error
    finally:
        bg_db_connection.commit()                           #Send query to database
        bg_db_connection.close()                            #Close connection to database
"""
Private function to Insert new member details to the database
@param: string:username, string:password
"""
def _new_member(username, password):
    #Database manipultion query::INSERT
    new_member_entry = "INSERT INTO players(username, password) VALUES(%s, '%s')"
    self.access_db(new_member_entry)                        #Pass query to connection opening method _access_db()
    return                                                  #exit

"""
Private function to DELETE member details from the database
@param: mysql.connector:bg_db_connection, mysql.connector.cursor:bg_db_cursor, string:username, string:password
"""
def _unregister_member(bg_db_connection, bg_db_cursor, username, password):
    #Database manipultion query::DELETE FROM
    remove_entry = "DELETE FROM players WHERE username = %s" % (username)
    self.access_db(remove_entry)                            #Pass query to connection opening method _access_db()
    return                                                  #exit

"""
private function to UPDATE member score details in database
@param: mysql.connector:bg_db_connection, mysql.connector.cursor:bg_db_cursor, string:username, string:password
"""
def _update_score(bg_db_connection, bg_db_cursor, username, password, score):
    #Database manipultion query::UPDATE
    update score_command = "UPDATE players SET score+%i WHERE username = %s" % (score, username)
    self.access_db(update_score_command)                    #Pass query to connection opening method _access_db()
    return                                                  #exit
