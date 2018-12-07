<?php
if(isset($_POST['input'])){
// Fetching variables of the form which travels in URL
$input = $_POST['input'];

if($input !='')
{
//  To redirect form on a particular page
header("Location:https://en.wikipedia.org/w/index.php?search={$input}");
}
}
?>
