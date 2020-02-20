#!/usr/local/bin/python3

from cgitb import enable
enable()

from os import environ

print("""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script>
        function validateForm(){
            var x = document.forms["myForm"]

    </script>

    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Bored-Games</title>

    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/styles.css" rel="stylesheet">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>


<body class="body" background="images/theGrid4.jpg">

<main class="container">

    <main class="row">
        <main class="col-md-12 ">

        </main>
        <nav class="navbar navbar-inverse col-md-12">
            <nav class="container-fluid">
                <nav class="navbar-header">
                    <a class="navbar-brand star"><p>Bored-Games</p></a>
                </nav>
                <nav>
                    <ul class="nav navbar-nav">
                        <li class="active"><a href="index.html">Home</a></li>
                        <li class="dropdown">
                            <a class="dropdown-toggle" data-toggle="dropdown" href="#">Games
                                <span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li><a href="#">Top-Down Game</a></li>
                                <li><a href="hangman/index.html">Hangman</a></li>
                                <li><a href="#">Coming Soon</a></li>

                            </ul>
                        </li>
                        <li class="dropdown">
                            <a class="dropdown-toggle" data-toggle="dropdown" href="#">Tutorials
                                <span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li><a href="#">Top-Down Game</a></li>
                                <li><a href="hangman/index.html">Hangman</a></li>
                                <li><a href="#">Coming Soon</a></li>
                            </ul>
                        </li>


                        <span class="caret"></span></a>


                        <li><a href="contactUs.html">Contact us</a></li>
                        <li><a href="#">Login/Sign up</a></li>
                        <li><a href="#">Sign up for our News Letter</a></li>
                        <li>
                            <form action="add.php" method="Post">
                                <input type="text" name="email" placeholder="E-mail Address">
                                <input type="submit"></form>
                        </li>
                    </ul>
                </nav>
            </nav>
        </nav>

        <banner class="col-md-12 banner">
        </banner>


    </main><!--close row-->

    <div class="row">

        <div class="col-md-12">

            <h2 class="star">Contact us</h2>
            <action
            ="mailto:116706819@umail.ucc.ie">
            <P class="blocktext">
            <ul align="center">
                <li><label for="fname"><h5 class="star">First Name :</h5></label>
                    <input type="text" id="fname" name="firstname" placeholder="Your name..">
                </li>

                <li>
                    <label for="lname"><h5 class="star">Last Name :</h5></label>
                    <input type="text" id="lname" name="lastname" placeholder="Your last name..">
                </li>
                <br>
                <li>
                    <label for="email"><h5 class="star">Email Addr:</h5></label>
                    <input type="text" id="email" name="email" placeholder="name@address.xxx">
                </li>
                <br>
                <li>
                    <label for="county"><h5 class="star">County :</h5></label>
                    <select id="county" name="County">
                        <option value="Antrim">Antrim</option>
                        <option value="Armagh">Armagh</option>
                        <option value="Carlow">Carlow</option>
                        <option value="Cavan">Cavan</option>
                        <option value="Clare">Clare</option>
                        <option value="Cork">Cork</option>
                        <option value="Derry">Derry</option>
                        <option value="Donegal">Donegal</option>
                        <option value="Down">Down</option>
                        <option value="Dublin">Dublin</option>
                        <option value="Fermanagh">Fermanagh</option>
                        <option value="Galway">Galway</option>
                        <option value="Kerry">Kerry</option>
                        <option value="Kildare">Kildare</option>
                        <option value="Kilkenny">Kilkenny</option>
                        <option value="Laois">Laois</option>
                        <option value="Leitrim">Leitrim</option>
                        <option value="Limerick">Limerick</option>
                        <option value="Longford">Longford</option>
                        <option value="Louth">Louth</option>
                        <option value="Mayo">Mayo</option>
                        <option value="Meath">Meath</option>
                        <option value="Monaghan">Monaghan</option>
                        <option value="Offaly">Offaly</option>
                        <option value="Roscommon">Roscommon</option>
                        <option value="Sligo">Sligo</option>
                        <option value="Tipperary">Tipperary</option>
                        <option value="Tyrone">Tyrone</option>
                        <option value="Waterford">Waterford</option>
                        <option value="Wexford">Wexford</option>
                        <option value="Wicklow">Wicklow</option>
                    </select>
                </li>


                <li>

                    <h5 class="star">Subject</h5>
                    <textarea id="subject" name="subject" placeholder="Write something.." textarea rows="6" cols="50">
            </textarea>
                    <br>


                    <input type="submit" value="Submit"></input>
                </li>
            </ul>
            </P>

            </action="mailto:116706819@umail.ucc.ie">
</main>


<nav class="navbar navbar-inverse col-md-12">
    <nav class="container-fluid">
        <div class="navbar-header">
            <nav class="navbar-brand star"> &copy; Team 2 SoftWare Project 2020 all rights reserved</nav>
        </div>

    </nav>


    </main>
    </div>
    </div>

    </div><!--close container-->

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
</body>
</html>
""")