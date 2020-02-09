# Imports
import mysql.connector #To set up database for players

**_config={'user':'cgg1', 'password':'weeS2dih', 'host':'cs1.ucc.ie', 'database':'2021_cgg1', 'raise_on_warnings':True}

def access_db(self, query):
    try:
        bg_db_connection = mysql.connector.connect(**self._config)
        if bg_db_connection.is_connected():
            print("access_db: Connecting... ")
        cursor = bg_db_connection.cursor()
        cursor.execute(query)
        result = cursor.fetchall()
        return result
    except mysql.connector.error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("access_db: Error in username or password")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("access_db: Database does not exist!")
        else:
            print(err)
    finally:
        bg_db_connection.commit()
        bg_db_connection.close()
    
def new_member(username, password):
    new_member_entry = "INSERT INTO players(username, password) VALUES(%s, '%s')"
    self.access_db(new_member_entry)
    return

def unregister_member(bg_db_connection, bg_db_cursor, username, password):
    remove_entry = "DELETE FROM players WHERE username = %s" % (username)
    self.access_db(remove_entry)
    return

def update_score(bg_db_connection, bg_db_cursor, username, password, score):
    update score_command = "UPDATE players SET score+%i WHERE username = %s" % (score, username)
    self.access_db(update_score_command)
    return
