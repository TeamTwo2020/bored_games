#!/usr/local/bin/python3

from cgitb import enable

enable()



from cgi import FieldStorage, escape
from hashlib import sha256
from time import time
from shelve import open
from http.cookies import SimpleCookie
from ins_functions import passwordValidation, loginLink
import pymysql as db

loginLink = loginLink()

form_data = FieldStorage()
username = ''
result = ''
if len(form_data) != 0:
    username = escape(form_data.getfirst('username', '').strip())
    password1 = escape(form_data.getfirst('password1', '').strip())
    password2 = escape(form_data.getfirst('password2', '').strip())


    if not username or not password1 or not password2:
        result = '<p class="error">Error: Username and passwords are required</p>'
    else:
        validationUResult, validationPResult = passwordValidation(username, password1)

        if validationUResult != "safe" and validationPResult != "safe":
            result=('<p class="error">Error: %s and %s</p>') % (validationUResult, validationPResult)
        elif validationPResult != 'safe':
            result=('<p class="error">Error: %s</p>' % (validationPResult))
        elif validationUResult !='safe':
            result=('<p class="error">Error: %s</p>' % (validationUResult))
        elif password1 != password2:
            result = '<p class="error">Error: Passwords must be equal</p>'
        else:
            try:
                connection = db.connect('cs1.ucc.ie', 'cgg1', 'weeS2dih', '2021_cgg1')
                cursor = connection.cursor(db.cursors.DictCursor)
                cursor.execute("""SELECT * FROM users
                                  WHERE username = %s""", (username))
                if cursor.rowcount > 0:
                    result = '<p class="error">Error: user name already taken</p>'
                else:
                    sha256_password = sha256(password1.encode()).hexdigest()
                    cursor.execute("""INSERT INTO users (username, password)
                                      VALUES (%s, %s)""", (username, sha256_password))
                    connection.commit()
                    cursor.close()
                    connection.close()
                    cookie = SimpleCookie()
                    sid = sha256(repr(time()).encode()).hexdigest()
                    cookie['sid'] = sid
                    session_store = open('sess_' + sid, writeback=True)
                    session_store['authenticated'] = True
                    session_store['username'] = username
                    session_store.close()       #Change to load index.py instead
                    result = """
                       <p>Succesfully Registered!</p>"""
                    print(cookie)
            except (db.Error, IOError):
                result = '<p class="error">Sorry! We are experiencing problems at the moment. Please call back later.</p>'

print('Content-Type: text/html')
print()

print("""
    <!DOCTYPE html>
    <html lang="en" id="register">
        <head>
            <meta charset="utf-8" />
            <title>Shady Insurance - Register</title>
            <link rel="stylesheet" href="styles/styles.css" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </head>
        <body>
            <header>
                <figure>
                    <a href="index.py"><img src="images/house1.png" title="Company Logo" alt="An image of the company logo, which is a black outline of a basic house with a crack going through the middle of the roof. There is also the letters S and I representing the company name."/></a>
                </figure>
                <section>
                    <h1>Shady Insurance</h1>
                    %s
                </section>
            </header>
            <main>
                <form action="register.py" method="post">
                    <fieldset>
                        <legend>Register</legend>
                        <label for="username">User name: </label>
                        <input type="text" name="username" id="username" value="%s" maxlength="20"/>
                        <label for="password1">Password: </label>
                        <input type="password" name="password1" id="password1" />
                        <label for="password2">Re-enter password: </label>
                        <input type="password" name="password2" id="password2" />
                        <input type="submit" value="Register" />
                    </fieldset>
                </form>
                %s
            </main>
            <aside>
                <h1>Contact Us</h1>
                <a href="contact_us.py">Send us a message here.</p></a>
                <section>
                    <strong>To Make A Claim Please Phone Call Us Or Visit Our Firm</strong>
                    <ul>
                        <li>Before you make a claim &minus; whether from fire, flood or burglary &minus; you should always remember to keep yourself and your family safe from any risk.</li>
                        <li>Always try to take photos of any damage, either on your mobile phone or camera (only when safe to do so).</li>
                        <li>Finally, remember not to get rid of any paperwork, as you may need this to support your insurance claims.</li>
                    </ul>
                </section>
                <section>
                    <h1>Telephone</h1>
                    <p>(021) 1234567 - 24/7 Call Team On Hand</p>
                    <h1>Opening Hours</h1>
                    <p>Monday-Saturday: 9am - 6pm</p>
                    <h1>Address</h1>
                    <p>Shady Insurance, Western Rd, Mardyke, Cork</p>
                </section>
            </aside>
            <nav>
                <ul>
                    <li><a href="index.py">Home</a></li>
                    <li><a href="home_insurance.py">Home Insurance</a></li>
                    <li><a href="my_account.py">My Account</a></li>
                    <li><a href="about_us.py">About Us</a></li>
                </ul>
            </nav>
            <footer>
                <small>
                    &copy;Cristian Gaudino, All Rights Reserved. This website was created as part of an assignment, it is <em>NOT</em> intended to function as a legitimate insurance company.
                </small>
            </footer>
        </body>
    </html>""" % (loginLink, username, result))