def words_connect():
    import pymysql as db
    failed=0

    server="cs1.ucc.ie"
    database="2021_cgg1"
    username="cgg1"
    password="weeS2dih"

    try:
        connection = db.connect('cs1.ucc.ie', 'cgg1', 'weeS2dih', '2021_cgg1')
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