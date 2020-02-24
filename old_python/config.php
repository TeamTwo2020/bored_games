// config file for db set up. can be used with ' include("config.php") '

<?php
   define('DB_SERVER', 'cs1.ucc.ie');
   define('DB_USERNAME', 'cgg1');
   define('DB_PASSWORD', 'weeS2dih');
   define('DB_DATABASE', '2021_cgg1');
   $db = mysqli_connect(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE);
?>



