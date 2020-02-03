def words_connect():
    import pymysql as db
    failed=0

    server="----"
    database="----"
    username="----"
    password="----"

    try:
        connection = db.connect('----', '----', '----', '----')
        if connection:
            cursor =connection.cursor(db.cursors.DictCursor)
            if cursor:
                return cursor
        return failed


    except:
        return failed

def words_close(connection, cursor):
    connection.close()
    cursor.close()
