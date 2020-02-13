#!/usr/local/bin/python3

from cgitb import enable
enable()

from cgi import FieldStorage, escape
from os import environ
from shelve import open
from http.cookies import SimpleCookie
from ins_functions import loginLink
import pymysql as db

print('Content-Type: text/html')
print()

loginLink = loginLink()

result = """
   <p class="Error">To access this page you must be logged in, you may register or login (if you have an existing account) here: </p>
   <ul>
       <li><a href="register.py">Register</a></li>
       <li><a href="login.py">Login</a></li>
   </ul>"""

errors=""
propertyError=""
addressError=""
extraError="<p class='error'>We cannot insure a house built before 1950, building cover must be between &euro;100,000 and &euro;500,000 and contents cover cannot exceed &euro;100,000.</p>"
contactError="<p class='error'>Please do not include any punctuation in your phone number."


property=""
cover=""
occupants=""
insurance=""
address1=""
address2=""
county=""
built=""
building=""
contents=""
full_name=""
age=""
phone=""
email=""

cookie = SimpleCookie()
http_cookie_header = environ.get('HTTP_COOKIE')
try:
    form_data = FieldStorage()
    if len(form_data) != 0:
        dbList=[]

        #Property
        if form_data.getfirst('property') !=None and form_data.getfirst('cover') != None and form_data.getfirst('occupants') != None and form_data.getfirst('insurance') != None:
            property = escape(form_data.getfirst('property'))
            cover = escape(form_data.getfirst('cover'))
            occupants = escape(form_data.getfirst('occupants'))
            insurance = escape(form_data.getfirst('insurance'))

            dbList.append(property)
            dbList.append(cover)
            dbList.append(occupants)
            dbList.append(insurance)
        else:
            propertyError="<p class='error'>Please select an option from all of the dropdown menus.</p>"

        #Address
        if form_data.getfirst('address1') !=None and form_data.getfirst('address2') !=None and form_data.getfirst('county') !=None:
            address1 = escape(form_data.getfirst('address1')).strip()
            address2 = escape(form_data.getfirst('address2')).strip()
            county = escape(form_data.getfirst('county')).strip()

            if county.isnumeric():
                addressError="<p class='error'>Please enter a valid county.</p>"
            elif len(address1) <5 or len(address2) <5 or len(county) <3:
                addressError="<p class='error'>Please enter a valid address.</p>"
            else:
                dbList.append(address1)
                dbList.append(address2)
                dbList.append(county)
        else:
            addressError="<p class='error'>Please fill in all the text boxes.</p>"

        #Extra Info
        if form_data.getfirst('built') !=None and form_data.getfirst('building') != None and form_data.getfirst('contents') !=None:
            built = escape(form_data.getfirst('built')).strip()
            building = escape(form_data.getfirst('building')).strip()
            contents = escape(form_data.getfirst('contents')).strip()
            if not built.isnumeric() or not building.isnumeric() or not contents.isnumeric():
                extraError="<p class='error'>Please enter a number</p>"
            else:
                built=int(built)
                building=int(building)
                contents=int(contents)
                if built > 2018:
                    extraError="<p class='error'>Please enter a valid year.</p>"
                elif built < 1950:
                    extraError="<p class='error'>Unfortunately we cannot insure properties built before 1950.</p>"
                elif building > 500000 or building < 100000:
                    extraError="<p class='error'>Building cover must be between 100k and 500k.</p>"
                elif contents > 100000 or contents < 10000:
                    extraError="<p class='error'>Contents cover must be between 10k and 100k.</p>"
                else:
                    dbList.append(built)
                    dbList.append(building)
                    dbList.append(contents)

        else:
            extraError="<p class='error'>Please fill in all the text boxes.</p>"

        #Contact
        if form_data.getfirst('full_name') !=None and form_data.getfirst('age') !=None and form_data.getfirst('phone') !=None and form_data.getfirst('email') !=None:
            full_name = escape(form_data.getfirst('full_name')).strip()
            age = escape(form_data.getfirst('age')).strip()
            phone = escape(form_data.getfirst('phone'))
            email = escape(form_data.getfirst('email')).strip()

            if not age.isnumeric():
                contactError="<p class='error'>Please enter a number.</p>"
            else:
                age=int(age)
                if full_name.isnumeric() or len(full_name) < 4:
                    contactError="<p class='error'>Please enter a valid name.</p>"
                elif age<18 or age>100:
                    contactError="<p class='error'>We cannot insure someone underage or someone over the age of 100.</p>"
                elif len(phone)!=10 or not phone.isnumeric():
                    contactError="<p class='error'>Please enter a valid phone number.</p>"
                elif email.isnumeric() or email.isalpha():
                    contactError="<p class='error'>Please enter a valid email address.</p>"
                else:
                    dbList.append(full_name)
                    dbList.append(age)
                    dbList.append(phone)
                    dbList.append(email)
        else:
            contactError="<p class='error'>Please fill in all the text boxes.</p>"


        if len(dbList) == 14:
            connection = db.connect('cs1.ucc.ie', 'cgg1', 'weeS2dih', '2021_cgg1')
            cursor = connection.cursor(db.cursors.DictCursor)

            cookie.load(http_cookie_header)
            sid = cookie['sid'].value
            session_store = open('sess_' + sid, writeback=False)
            username = session_store['username']
            session_store.close()

            cursor.execute("""SELECT *
                            FROM user_quotes
                            WHERE username=%s""", (username))
            fetch=cursor.fetchall()

            if not fetch:
                price=0
                if building < 200000:
                    if contents < 30000:
                        if property=="bungalow" or property == "terraced":
                            price=150
                        else:
                            price=180
                    elif contents >=30000 and contents<=50000:
                        if property=="bungalow" or property == "terraced":
                            price=170
                        else:
                            price=200
                    else:
                        if property=="bungalow" or property == "terraced":
                            price=200
                        else:
                            price=230

                elif building >=200000 and building <350000:
                    if contents < 30000:
                        if property=="bungalow" or property == "terraced":
                            price=170
                        else:
                            price=200
                    elif contents >=30000 and contents<=60000:
                        if property=="bungalow" or property == "terraced":
                            price=190
                        else:
                            price=220
                    else:
                        if property=="bungalow" or property == "terraced":
                            price=220
                        else:
                            price=230
                else:
                    if contents < 30000:
                        if property=="bungalow" or property == "terraced":
                            price=180
                        else:
                            price=210
                    elif contents >=30000 and contents<=60000:
                        if property=="bungalow" or property == "terraced":
                            price=200
                        else:
                            price=230
                    else:
                        if property=="bungalow" or property == "terraced":
                            price=230
                        else:
                            price=240

                if insurance=="full":
                    price= price * 1.3

                if county.lower()=="dublin":
                    price=price * 1.2

                if cover=="holiday" or cover=="landlord":
                    price=price * .8

                if int(occupants[9]) > 3:
                    price=price * 1.05

                cursor.execute("""INSERT INTO user_quotes (username, property, cover, occupants, insurance_type, address1, address2, county, built, building_cover, contents_cover, full_name, age, phone, email, price)
                                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)""", (username, property, cover, occupants, insurance, address1, address2, county, built, building, contents, full_name, age, phone, email, price))
                connection.commit()
                errors="<p>Your quote is: &euro;%d</p>" % price
                contactError=""
                extraError=""
            else:
                duplicate=""

                for row in fetch:
                    if row['username'] == username and row['property'] == property and row['cover'] == cover and row['occupants'] == occupants and row['address1'] == address1 and row['address2'] == address2 and row['county'] == county and row['built'] == built and row['building_cover'] == building and row['contents_cover'] == contents and row['full_name']== full_name and row['age']== age and row['phone']== phone and row['email']== email:
                        errors="<p class='error'>Error: You have already received a quote for this property.</p>"
                        duplicate="yes"

                if duplicate!="yes":
                    price=0
                    if building < 200000:
                        if contents < 30000:
                            if property=="bungalow" or property == "terraced":
                                price=150
                            else:
                                price=180
                        elif contents >=30000 and contents<=50000:
                            if property=="bungalow" or property == "terraced":
                                price=170
                            else:
                                price=200
                        else:
                            if property=="bungalow" or property == "terraced":
                                price=200
                            else:
                                price=230

                    elif building >=200000 and building <350000:
                        if contents < 30000:
                            if property=="bungalow" or property == "terraced":
                                price=170
                            else:
                                price=200
                        elif contents >=30000 and contents<=60000:
                            if property=="bungalow" or property == "terraced":
                                price=190
                            else:
                                price=220
                        else:
                            if property=="bungalow" or property == "terraced":
                                price=220
                            else:
                                price=230
                    else:
                        if contents < 30000:
                            if property=="bungalow" or property == "terraced":
                                price=180
                            else:
                                price=210
                        elif contents >=30000 and contents<=60000:
                            if property=="bungalow" or property == "terraced":
                                price=200
                            else:
                                price=230
                        else:
                            if property=="bungalow" or property == "terraced":
                                price=230
                            else:
                                price=240

                    if insurance=="full":
                        price= price * 1.3

                    if county.lower()=="dublin":
                        price=price * 1.2

                    if cover=="holiday" or cover=="landlord":
                        price=price * .8

                    if int(occupants[9]) > 3:
                        price=price * 1.05

                    cursor.execute("""INSERT INTO user_quotes (username, property, cover, occupants, insurance_type, address1, address2, county, built, building_cover, contents_cover, full_name, age, phone, email, price)
                                            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)""", (username, property, cover, occupants, insurance, address1, address2, county, built, building, contents, full_name, age, phone, email, price))
                    connection.commit()
                    errors="<p>Your quote is: &euro;%d</p>" % price
                    contactError=""
                    extraError=""

            cursor.close()
            connection.close()
    else:
        errors="<p class='error'>You must fill in all the text boxes.</p>"
except db.Error:
    errors = '<p class="error">Sorry! We are experiencing problems at the moment. Please call back later.</p>'

try:
    if http_cookie_header:
        cookie.load(http_cookie_header)
        if 'sid' in cookie:
            sid = cookie['sid'].value
            session_store = open('sess_' + sid, writeback=False)
            if session_store.get('authenticated'):
                result = """
                    <section>
                        <h1> Get A Quote</h1>
                        <form action="home_insurance.py" method="get">
                            <fieldset>
                                <legend>Property</legend>
                                <label for="property">Property Type: </label>
                                <select name="property" id="property">
                                    <option disabled selected value>-- Select An Option --</option>
                                    <option value="bungalow">Bungalow</option>
                                    <option value="detached">Detached House</option>
                                    <option value="semi">Semi-detached</option>
                                    <option value="terraced">Terraced House</option>
                                </select>
                                <label for="cover">Cover Type: </label>
                                <select name="cover" id="cover">
                                    <option disabled selected value>-- Select An Option --</option>
                                    <option value="owner">Owner Occupied</option>
                                    <option value="landlord">Landlord</option>
                                    <option value="holiday">Holiday Home</option>
                                </select>
                                <label for="occupants">Occupants: </label>
                                <select name="occupants" id="occupants">
                                    <option disabled selected value>-- Select An Option --</option>
                                    <option value="occupant_1">1</option>
                                    <option value="occupant_2">2</option>
                                    <option value="occupant_3">3</option>
                                    <option value="occupant_4">4</option>
                                    <option value="occupant_5">5</option>
                                    <option value="occupant_6">6 or more</option>
                                </select>
                                <label for="insurance">Insurance Type: </label>
                                <select name="insurance" id="insurance">
                                    <option disabled selected value>-- Select An Option --</option>
                                    <option value="partial">Partial Cover</option>
                                    <option value="full">Full Cover</option>
                                </select>
                                %s
                            </fieldset>
                            <fieldset>
                                <legend>Address</legend>
                                <label for="address1">Address Line 1: </label>
                                <input type="text" name="address1" id="address1" maxlength="50" value='%s'/>
                                <label for="address2">Address Line 2: </label>
                                <input type="text" name="address2" id="address2" maxlength="50" value='%s'/>
                                <label for="county">County: </label>
                                <input type="text" name="county" id="county" maxlength="30" value='%s'/>
                                %s
                            </fieldset>
                            <fieldset>
                                <legend>Extra Information</legend>
                                <label for="built">Year Built: </label>				<!---1950 onwards --->
                                <input type="text" name="built" id="built" maxlength="4" value='%s'/>
                                <label for="building">Building Cover: </label>		<!---100k - 500k--->
                                <input type="text" name="building" id="building" maxlength="6" value='%s'/>
                                <label for="contents">Contents Cover: </label>		<!---10k - 100k--->
                                <input type="text" name="contents" id="contents" maxlength="6" value='%s'/>
                                %s
                            </fieldset>
                            <fieldset>
                                <legend>Contact Details</legend>					<!--- VALIDATE --->
                                <label for="full_name">Full Name: </label>
                                <input type="text" name="full_name" id="full_name" maxlength="40" value='%s'/>
                                <label for="age">Insurer's Age: </label>
                                <input type="text" name="age" id="age" maxlength="3" value='%s'/>
                                <label for="phone">Phone Number: </label>
                                <input type="text" name="phone" id="phone" maxlength="10" value='%s'/>
                                <label for="email">Email: </label>
                                <input type="text" name="email" id="email" maxlength="100" value='%s'/>
                                %s
                            </fieldset>
                            <input type="submit" value="Get A Quote"/>
                        </form>
                        %s
                    <section>""" % (propertyError, address1, address2, county, addressError, built, building, contents, extraError, full_name, age, phone, email, contactError, errors)
            session_store.close()
except IOError:
    result = '<p class="error">Sorry! We are experiencing problems at the moment. Please call back later.</p>'


print('''
    <!DOCTYPE html>
    <html lang="en" id="home_insurance">
        <head>
            <meta charset="utf-8" />
            <title>Shady Insurance - Home Insurance</title>
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
                    <li><a href="">Home Insurance</a></li>
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
    </html>''' % (loginLink, result))