#!/usr/local/bin/python3

from cgitb import enable
enable()


from os import environ
from shelve import open
from http.cookies import SimpleCookie
from ins_functions import contactUs, loginLink
import pymysql as db

print('Content-Type: text/html')
print()

loginLink = loginLink()
contactUs = contactUs()

result = """
   <p class="Error">To access this page you must be logged in and you must have received at least one quote, you may register or login (if you have an existing account) here: </p>
   <ul>
       <li><a href="register.py">Register</a></li>
       <li><a href="login.py">Login</a></li>
   </ul>"""


try:
    cookie = SimpleCookie()
    http_cookie_header = environ.get('HTTP_COOKIE')
    if http_cookie_header:
        cookie.load(http_cookie_header)
        if 'sid' in cookie:
            sid = cookie['sid'].value
            session_store = open('sess_' + sid, writeback=False)
            if session_store.get('authenticated'):
                connection = db.connect('cs1.ucc.ie', 'cgg1', 'weeS2dih', '2021_cgg1')
                cursor = connection.cursor(db.cursors.DictCursor)

                username = session_store['username']
                session_store.close()
                info=""
                quote_counter=0
                cursor.execute("""SELECT * FROM user_quotes
                                    WHERE username=%s;""", username)

                fetch=cursor.fetchall()
                if fetch:
                    personal=fetch[0]
                    info="""
                            <section id="personal">
                                <h1>Personal Details</h1>
                                <ul>
                                    <li>Name: %s</li>
                                    <li>Age: %d</li>
                                    <li>Phone Number: %s</li>
                                    <li>Email: %s</li>
                                </ul>
                            </section>
                            """ % (personal['full_name'], personal['age'], personal['phone'], personal['email'])

                    for row in fetch:
                        quote_counter+=1
                        info+="""
                                <section class="quotes">
                                    <h1>Quote Number: %d</h1>
                                    <section class="property">
                                        <h1>Property Information</h1>
                                        <ul>
                                            <li>Property Type: %s</li>
                                            <li>Cover Type: %s</li>
                                            <li>Occupants: %s</li>
                                            <li>Insurance Type: %s</li>
                                        </ul>
                                    </section>
                                    <section class="property">
                                        <h1>Property Address</h1>
                                        <ul>
                                            <li>Address Line 1: %s</li>
                                            <li>Address Line 2: %s</li>
                                            <li>County: %s</li>
                                        </ul>
                                    </section>
                                    <section class="property">
                                        <h1>Extra Information</h1>
                                        <ul>
                                            <li>Year Built: %d</li>
                                            <li>Building Cover: &euro;%d</li>
                                            <li>Contents Cover: &euro;%d</li>
                                        </ul>
                                    </section>
                                    <p><strong>Quote: &euro;%d</strong></p>
                                </section>
                                """ % (quote_counter, row['property'], row['cover'], row['occupants'][9], row['insurance_type'], row['address1'], row['address2'], row['county'], row['built'], row['building_cover'], row['contents_cover'], row['price'])
                        result=info
                else:
                    result="""
                        <p class='error'>Before you can view your account you must have received at least one quote. You may do so here: </p>
                        <ul>
                            <li>
                                <a href='home_insurance.py'>Home Insurance</a>
                            </li>
                        </ul>"""

                cursor.close()
                connection.close()
except db.Error:
    result = '<p class="error">Sorry! We are experiencing problems at the moment. Please call back later.</p>'


print('''
    <!DOCTYPE html>
    <html lang="en" id="my_account">
        <head>
            <meta charset="utf-8" />
            <title>Shady Insurance - My Account</title>
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
                %s
            </main>
            <aside>
                <section>
                    %s
                    <strong>To Make A Claim Please Phone Call Us Or Visit Our Firm</strong>
                    <ul>
                        <li>Before you make a claim &minus; whether from fire, flood or burglary &minus; you should always remember to keep yourself and your family safe from any risk.</li>
                        <li>Always try to take photos of any damage, either on your mobile phone or camera (only when safe to do so).</li>
                        <li>Finally, remember not to get rid of any paperwork, as you may need this to support your insurance claims.</li>
                    </ul>
                </section>
                <section>
                    <h1>Telephone</h1>
                    <p>(021) 1234567 &minus; 24/7 Call Team On Hand</p>
                    <h1>Opening Hours</h1>
                    <p>Monday&minus;Saturday: 9am &minus; 6pm</p>
                    <h1>Address</h1>
                    <p>Shady Insurance, Western Rd, Mardyke, Cork</p>
                </section>
            </aside>
            <nav>
                <ul>
                    <li><a href="index.py">Home</a></li>
                    <li><a href="home_insurance.py">Home Insurance</a></li>
                    <li><a href="">My Account</a></li>
                    <li><a href="about_us.py">About Us</a></li>
                </ul>
            </nav>
            <footer>
                <small>
                    &copy;Cristian Gaudino, All Rights Reserved. This website was created as part of an assignment, it is <em>NOT</em> intended to function as a legitimate insurance company.
                </small>
            </footer>
        </body>
    </html>''' % (loginLink, result, contactUs))