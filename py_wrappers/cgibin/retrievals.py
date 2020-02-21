#!/usr/local/bin/python3

import pymysql as db


def get_scoreboard():

    _acc_un, _acc_pw, _host, _dataB = "adc1", "quahgesh", "cs1.ucc.ie", "2020_adc1"
    query = "SELECT 'USERNAME', 'SCORE' " \
            "FROM 'players'" \
            "ORDER BY 'SCORE' DESC;"
    scores = ""
    try:
        # connect to database
        connection = db.connect(_host, _acc_un, _acc_pw, _dataB)
        # create cursor to navigate database
        cursor = connection.cursor()
        # Query database to retrieve scoreboard table
        cursor.execute(query)
        # output titled Scoreboard Table
        scores += """<table>
                    <tr><th>Player Top Scores</th><tr>"""
        for row in cursor.fetchall():
            # output username : score to table
            scores += '<tr><td>%s : %i</td></tr>' % (row['USERNAME'], row['SCORE'])
        # close off table
        scores += '</table>'
        # close the cursor
        cursor.close()
        # close the connection
        connection.close()
    except db.Error:
        scores = '<p>Apologies, we are currently experiencing technical difficulties"</p>'
    print(scores)
    return scores


