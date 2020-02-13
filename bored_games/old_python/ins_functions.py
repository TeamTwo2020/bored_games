#!/usr/local/bin/python3

from cgitb import enable
enable()


def get_comments():
    #Function to take in user comments, add them to a database & display them

    from cgi import FieldStorage, escape
    import pymysql as db
    from os import environ

    comments = ''
    url = environ.get('SCRIPT_NAME')
    try:
        connection = db.connect('cs1.ucc.ie', 'cgg1', 'weeS2dih', '2021_cgg1')
        cursor = connection.cursor(db.cursors.DictCursor)
        form_data = FieldStorage()
        if len(form_data) != 0:
            if form_data.getfirst('username') != None and form_data.getfirst('new_comment') != None:
                username = escape(form_data.getfirst('username'))
                new_comment = escape(form_data.getfirst('new_comment'))
                username = profanity(username)
                new_comment = profanity(new_comment)
                cursor.execute("""INSERT INTO comments_table (username, url, comment)
                                  VALUES (%s, %s, %s)""", (username, url, new_comment))
                connection.commit()
        cursor.execute("""SELECT * FROM comments_table
                          WHERE url = %s
                          ORDER BY comment_id DESC""", (url))
        for row in cursor.fetchall():
            comments += '<article><h1>%s</h1><p>%s</p></article>' % (row['username'], row['comment'])
        cursor.close()
        connection.close()
    except db.Error:
        comments = '<p class="error">Sorry! We are experiencing problems at the moment. Please call back later.</p>'

    return """
        <h1>Comments</h1>
        <form action="%s" method="post">
            <fieldset>
                <legend>Post a new comment</legend>
                <label for="username">Name:</label>
                <input type="text" name="username" id="username" maxlength="255"/>
                <label for="new_comment">Comment:</label>
                <textarea name="new_comment" id="new_comment" rows="5" cols="30" maxlength="255"></textarea>
                <input type="submit" value="Post" />
            </fieldset>
        </form>
        %s""" % (url, comments)

def contactUs():
    # Function to take in user information from contact us and insert it into a database

    from cgi import FieldStorage, escape
    import pymysql as db
    from os import environ

    result =''
    url = environ.get('SCRIPT_NAME')
    try:
        connection = db.connect('cs1.ucc.ie', 'cgg1', 'weeS2dih', '2021_cgg1')
        cursor = connection.cursor(db.cursors.DictCursor)
        form_data = FieldStorage()

        if len(form_data) != 0:
            if form_data.getfirst('name') != None and form_data.getfirst('phone') != None and form_data.getfirst('comment') != None:
                name = escape(form_data.getfirst('name')).strip()
                phone = escape(form_data.getfirst('phone')).strip()
                comment = escape(form_data.getfirst('comment')).strip()
                comment = profanity(comment)
                if not phone.isnumeric() or len(phone) != 10:
                    result+='<p class="error">Please enter a valid phone number.</p>'
                else:
                    cursor.execute("""INSERT INTO contact_us (name, url, phone, comment)
                                    VALUES (%s, %s, %s, %s)""", (name, url, phone, comment))
                    connection.commit()
                    result+="<p>Message successfully sent.</p>"
            else:
                result+='<p class="error">Please fill in all the text boxes.</p>'
        cursor.close()
        connection.close()
    except db.Error:
        result += '<p class="error">Sorry! We are experiencing problems at the moment. Please call back later.</p>'

    return """
        <h1>Contact Us</h1>
        <form action="%s" method="post">
            <fieldset>
                <legend>Send A Message</legend>
                <label for="name">Name: </label>
                <input type="text" name="name" id="name" maxlength="40"/>
                <label for="phone">Phone: </label>
                <input type="text" name="phone" id="phone" maxlength="10"/>
                <label for="comment">Comment:</label>
                <textarea name="comment" id="comment" rows="4" cols="30"></textarea>
                <input type="submit" value="Send"/>
            </fieldset>
        </form>
        %s""" % (url, result)


def profanity(par):
    #Basic Function to filter out some explicit words

    curses=["apples", "wombats"]
    listPar= par.split()
    newPar = ""

    if len(listPar) != 0:
        for word in listPar:
            for curse in curses:
                if word.lower() == curse:
                    word = "***"
                    newPar+=word
                    newPar+=" "
                    break
            if word!="***":
                newPar+=word
                newPar+=" "

    return newPar

def passwordValidation(username, password):
    #Function to validate a user's password

    pResult=""
    uResult=""


    if len(username)<5:
        uResult="Username must be at least 5 characters long"
    else:
        uResult="safe"
        for char in username:
            if char==" ":
                uResult="Username cannot include a space"
                break


    if len(password)<=6:                #Too Short
        pResult="Password must be at least 7 characters long"
    elif password.isalpha():            #Only Letters
        pResult="Password must include a number and a special character"
    elif password.isnumeric():          #Omly Numbers
        pResult="Password must include a letter and a special character"
    else:
        pResult="Password must include a special character"
        for letter in password:
            if not letter.isalpha() and not letter.isnumeric():
                pResult="safe"

    return uResult, pResult

def loginLink():

    from os import environ
    from shelve import open
    from http.cookies import SimpleCookie

    result = """
        <p>
            <a href="login.py">Login</a> - <a href="register.py">Register</a>
        </p>"""

    try:
        cookie = SimpleCookie()
        http_cookie_header = environ.get('HTTP_COOKIE')
        if http_cookie_header:
            cookie.load(http_cookie_header)
            if 'sid' in cookie:
                sid = cookie['sid'].value
                session_store = open('sess_' + sid, writeback=False)
                if session_store.get('authenticated'):
                    username = session_store['username']     #Get Username from session store
                    result = """
                        <p>
                            <a href="my_account.py">%s</a> - <a href="logout.py">Logout</a>
                        </p>""" % (username)
                session_store.close()

    except IOError:
        result = '<p class="error">Sorry! We are experiencing problems at the moment. Please call back later.</p>'

    return result