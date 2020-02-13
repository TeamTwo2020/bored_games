#!/usr/local/bin/python3

from cgitb import enable
enable()

from ins_functions import get_comments, loginLink

print('Content-Type: text/html')
print()

get_comments = get_comments()
loginLink = loginLink()

print("""
    <!DOCTYPE html>
    <html lang="en" id="about_us">
        <head>
            <meta charset="utf-8" />
            <title>Shady Insurance - About Us</title>
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
                <article>
                    <h1>About Us</h1>
                    <section>
                        <p>
                            Shady Insurance is a home insurance company dedicated to providing cheap, reliable insurance to all households. Founded in 2011, we currently represent over 20 people and have represented thousands in the past (all of which have decided to leave us for unknown reasons). We are currently located in Western Rd, Mardyke, Cork and have been here for over two years, having been previously located in the shed in my garden.
                        </p>
                    </section>
                    <section>
                        <p>
                            We currently employ 5 people, all of which are well paid and are happy with their current occupation. Here is a short list of some our our employees:
                        </p>
                        <table>
                            <caption><h1>Workforce</h1></caption>
                            <tr>
                                <th scope="col">Position</th>
                                <th scope="col">Name</th>
                                <th scope="col">Age</th>
                                <th scope="col">Education</th>
                            </tr>
                            <tr>
                                <th scope="col">CEO</th>
                                <td scope="col">Jimmy Dowd</th>
                                <td scope="col">33</th>
                                <td scope="col">N/A</th>
                            </tr>
                            <tr>
                                <th scope="col">Insurance Stuff</th>
                                <td scope="col">Rajeet Cyprien</th>
                                <td scope="col">31</th>
                                <td scope="col">BComm Commerce</th>
                            </tr>
                            <tr>
                                <th scope="col">Insurance Stuff</th>
                                <td scope="col">Dr. Niamh O'Keefe</th>
                                <td scope="col">50</th>
                                <td scope="col">PhD Medicine</th>
                            </tr>
                            <tr>
                                <th scope="col">Secretary</th>
                                <td scope="col">Richard Abernathy</th>
                                <td scope="col">27</th>
                                <td scope="col">BSc Business Information Systems</th>
                            </tr>
                            <tr>
                                <th scope="col">Janitor &amp; I.T.</th>
                                <td scope="col">Michael Johnson</th>
                                <td scope="col">62</th>
                                <td scope="col">BA Arts</th>
                            </tr>
                        </table>
                    </section>
                    <section>
                        <h1>Statistics</h1>
                        <ul>
                            <li>12%% Satisfation Rate.</li>
                            <li>Voted Ireland's second worst insurance company 4 years in a row.</li>
                            <li>Expected to file for bankruptcy by January 2019.</li>
                            <li>Low Prices.</li>
                        </ul>
                    </section>
                </article>
                <section>
                    %s
                </section>
            </main>
            <aside>
                <section>
                    <h1>Contact Us</h1>
                    <a href="contact_us.py">Send us a message here.</p></a>
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
					<li><a href="my_account.py">My Account</a></li>
                    <li><a href="">About Us</a></li>
                </ul>
            </nav>
            <footer>
                <small>
                    &copy;Cristian Gaudino, All Rights Reserved. This website was created as part of an assignment, it is <em>NOT</em> intended to function as a legitimate insurance company.
                </small>
            </footer>
        </body>
    </html>""" % (loginLink, get_comments))