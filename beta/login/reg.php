<?php
$servername = "localhost";
$database = "VPN";
$username = "Nephilim";
$password = "singh@IISER";
// Create connection
$conn = mysqli_connect($servername, $username, $password, $database);
// Check connection
if (!$conn) {
      die("Connection failed: " . mysqli_connect_error());
}
echo "Connected successfully";
$name = $_POST['user'];
$phone = $_POST['phone'];
$pass = $_POST['password'];
$email = $_POST['email'];


$result = mysqli_query($conn,"SELECT * FROM users WHERE user ='$name'");
$data = mysqli_num_rows($result);
if(($data)==0){
      $sql = "INSERT INTO `users` (`user`, `password`, `email`, `phone`, `plan`, `date`, `data`, `SERVER`) VALUES ('$name', '$pass', '$email', '$phone', NULL, NULL, NULL, NULL)";
      if (mysqli_query($conn, $sql)) {
            echo "New record created successfully";
      }else
      {
            echo "Error: " . $sql . "<br>" . mysqli_error($conn);
      }
}else{
echo "This username is already registered, Please try another username...";
}

mysqli_close($conn);
// echo "<script> location.href='index.html'; </script>";
// exit;
?>