#!/usr/local/bin/python3

from cgitb import enable
enable()

from os import environ
from shelve import open
from http.cookies import SimpleCookie
from ins_functions import loginLink

loginLink = loginLink()

result = '<p class="error">You are already logged out.</p>'
try:
    cookie = SimpleCookie()
    http_cookie_header = environ.get('HTTP_COOKIE')
    if http_cookie_header:
        cookie.load(http_cookie_header)
        if 'sid' in cookie:
            sid = cookie['sid'].value
            session_store = open('sess_' + sid, writeback=True)
            session_store['authenticated'] = False
            session_store.close()
            result = """
                <p>You are now logged out. Thank you for using Shady Insurance</p>
                <p><a href="login.py">Login again</a></p>"""
except IOError:
    result = '<p class="error">Sorry! We are experiencing problems at the moment. Please call back later.</p>'

print('Content-Type: text/html')
print()

print("""
    <!DOCTYPE html>
    <html lang="en" id="logout">
        <head>
            <meta charset="utf-8" />
            <title>Shady Insurance - Logout</title>
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
    </html>""" % (loginLink, result))