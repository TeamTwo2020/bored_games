<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Success</title>


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
  <body class="body">
   
    <div class="container">
    
      <div class="row">
      <div class="col-md-12 ">
      
      </div>
   <nav class="navbar navbar-inverse col-md-12">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand star" >Star Wars</a>
    </div>
    <div>
      <ul class="nav navbar-nav">
        <li class="active"><a href="index.html">Home</a></li>
           <li class="dropdown">
          <a class="dropdown-toggle" data-toggle="dropdown" href="#">Films
          <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="ep1.html">Episode I The Phantom Mence</a></li>
            <li><a href="ep2.html">Episode II Attack of the Clones</a></li>
            <li><a href="ep3.html">Episode III Revenge of the Sith</a></li>
            <li><a href="ep4.html">Episode IV A New Hope</a></li>
            <li><a href="ep5.html">Episode V The Emipre Strikes Back</a></li>
            <li><a href="ep6.html">Episode VI Return of the Jedi</a></li>
            <li><a href="ep7.html">Episode VII The Force Awakens</a></li>
          </ul>
        </li>
        <li class="dropdown">
          <a class="dropdown-toggle" data-toggle="dropdown" href="jedi.html">Jedi
          <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="yoda.html">Yoda</a></li>
            <li><a href="obi.html">Obi wan Kenobi</a></li>
            <li><a href="luke.html">Luke Skywalker</a></li> 
          </ul>
        </li>
         <li class="dropdown">
          <a class="dropdown-toggle" data-toggle="dropdown" href="#">Sith
          <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="darth.html">Darth Vader</a></li>
            <li><a href="maul.html">Darth Maul</a></li>
            <li><a href="ren.html">Kylo Ren</a></li> 
          </ul>
        </li>
         <li class="dropdown">
          <a class="dropdown-toggle" data-toggle="dropdown" href="#">Rebels
          <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="han.html">Han Solo</a></li>
            <li><a href="leia.html">Princess Leia</a></li>
            <li><a href="chew.html">Chewbacca</a></li> 
          </ul>
        </li>
       
         <li><a href="starships.html">Starships</a></li> 
         <li><a href="droids.html">Droids</a></li>
      </ul>
    </div>
  </div>
</nav>

      <div class="col-md-12 banner">
      </div>
      
        <div class="col-md-12" align="center">
            
             <?php
//get value from html form on add.html
$email = $_POST["email"];
//Connect Info
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "emailDb";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "INSERT INTO emailsTbl (email) VALUES ('$email')";


if ($conn->query($sql) === TRUE) {
    echo "<h1 class = 'star'>Success</h1> </br>";
    echo "<h2>Registered You Are!</h2></br>";
    echo "<img class='img-center'  src='images/jedi1.jpg'  alt='Success'/>";
    echo "<h2>The Force is Strong With You</h2></br>";
    echo "<a href = 'index.html'>Back to Star Wars Home</a>";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
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