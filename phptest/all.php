
<?php function 
    email_connect (){
    $conn_id = mysqli_connect ("cs1.ucc.ie", "cgg1", "weeS2dih", "2021_cgg1")
    or exit("Login Failed");
  if ($conn_id)
    return ($conn_id);
  return (FALSE);
}
?>
