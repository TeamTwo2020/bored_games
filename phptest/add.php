<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
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
      <a class="navbar-brand star" ><p>Bored-Games</p></a>
    </nav>
    <nav>
      <ul class="nav navbar-nav">
        <li class="active"><a href="index.html">Home</a></li>
           <li class="dropdown">
          <a class="dropdown-toggle" data-toggle="dropdown" href="#">Games
          <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="topdown/topdown.html">Top-Down Game</a></li>
            <li><a href="hangman/index.html">Hangman</a></li>
            <li><a href="#">Coming Soon</a></li>
            
          </ul>
        </li>
        <li class="dropdown">
          <a class="dropdown-toggle" data-toggle="dropdown" href="#">Tutorials
          <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="tutorial.html">Top-Down Game</a></li>
            <li><a href="tutorial.html">Hangman</a></li>
            <li><a href="tutorial.html">Coming Soon</a></li> 
          </ul>
        </li>
         
         
          <span class="caret"></span></a>
          
       
         <li><a href="contactUs.html">Contact us</a></li> 
         <li><a href="login.html">Login/Sign up</a></li>
         <li><a href ="#">Sign up for our News Letter</a></li>
         <li><form action = "add.php" method = "Post">
          <input type = "text" name = "email" placeholder = "E-mail Address">
          <input type = "submit"></form></li>
      </ul>
    </nav>
  </nav>
</nav>

      <banner class="col-md-12 banner">
      </banner>
      
        <div class="col-md-12" align="center">
            
             <?php

//Connect Info
		include "all.php";
// Create connection
		$conn = email_connect() or exit();
// Check connection
		if ($_POST) {
		    $email = $_POST['email'];
		
    




if ($email) {
	$insert = "INSERT INTO emailsTbl  VALUES ('$email')";
	$result = mysqli_query($conn, $insert)
		or exit ("Cannot execute insert");
	if ($result){
    		echo "<h1 class = 'star'>Success</h1> </br>";
    		echo "<h2 class = 'star'>Registered You Are!</h2></br>";
    		
    		echo "<h2 class = 'star'>The Force is Strong With You</h2></br>";
    		echo "<a href = 'index.html'><h2 class = 'star'>Home</h2></a>";
		} else {
    			echo ("Error: ");
	}
    }
}


?>

  </div>
</nav>


         
          

         
          
             
            
        
    </div><!--close container-->

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
  </body>
</html>
