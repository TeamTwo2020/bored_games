#!/usr/local/bin/python3

from cgitb import enable
enable()



from ins_functions import contactUs, loginLink





print('Content-Type: text/html')
print()

contactUs = contactUs()
loginLink = loginLink()

print("""
    <!DOCTYPE html>
    <html lang="en" id="home">
        <head>
            <meta charset="utf-8" />
            <title>Shady Insurance - Home</title>
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
                <section>
                    <section>
                        <h1>Home Insurance</h1>
                        <figure>
                            <a href="home_insurance.py"><img src="images/shady_building.jpg" title="Shady Insurance Building" alt="An image of the shady insurance company building, which is made up if brown brick and a yellow upper section. The image is of the front of the building which has lavender flowers on a patch of grass and a small stairway up to the front door which is glass with a brown outline."/></a>
                            <figcaption>
                                <small>
                                    (Credit to user Jaydec, <a href="https://creativecommons.org/licenses/by-sa/3.0/">Licensed Under CC3.0</a>)
                                </small>
                            </figcaption>
                        </figure>
                        <p>Looking for affordable building insurance or contents cover? Well here at Shady Insurance we provide a lowest price guarantee at the time of purchase for all who chose Shady Insurance so you can be sure you are getting the most for your money.</p>
                        <p>
                            <strong><a href="home_insurance.py">Click here to view more</a></strong>
                        </p>
                    </section>
                    <section>
                        <h1>My Account</h1>
                        <figure>
                            <a href="my_account.py"><img src="images/user_default.png" title="User Image" alt="An image of a grey outline of a person made out of round shapes. The background is a lighter shade of grey while the person is a darker shade."/></a>
                            <figcaption>
                                <small>
                                    (Credit to user Greasemann, <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.en">Licensed Under CC4.0</a>)
                                </small>
                            </figcaption>
                        </figure>
                        <p>View your account information and any previous quotes you have received from us.
                        <p>
                            <strong><a href="my_account.py">Click here to view more</a></strong>
                        </p>
                    </section>
                    <section>
                        <h1>About Us</h1>
                        <figure>
                            <a href="about_us.py"><img src="images/house1.png" title="Company Logo" alt="An image of the company logo, which is a black outline of a basic house with a crack going through the middle of the roof. There is also the letters S and I representing the company name."/></a>
                        </figure>
                        <p>Learn all about our company and leave us a comment.</p>
                        <p>
                            <strong><a href="about_us.py">Click here to view more</a></strong>
                        </p>
                    </section>
                <section>
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
                    <p>(021) 1234567 - 24/7 Call Team On Hand</p>
                    <h1>Opening Hours</h1>
                    <p>Monday-Saturday: 9am - 6pm</p>
                    <h1>Address</h1>
                    <p>Shady Insurance, Western Rd, Mardyke, Cork</p>
                </section>
            </aside>
            <nav>
                <ul>
                    <li><a href="">Home</a></li>
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
    </html>""" % (loginLink, contactUs))