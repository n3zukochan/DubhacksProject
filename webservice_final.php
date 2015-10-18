<?php
    /*
        Name: Sid Rao

        The php webservice. Backend for dubhacks.
    */

    error_reporting(E_ALL | E_STRICT);


    // Defining server information.
    // TODO: Put this information in a different file.
    $server_name = "localhost";
    $user_name = "root";
    $password = "dubhacks";
    $dbname = "dubhacks";

    // Connecting to the database
    $connection = new mysqli($server_name, $user_name, $password, $dbname);

    // Check connection
    if ($connection->connect_error) {
        die("Connection Failed");
    }

    if ($_SERVER["REQUEST_METHOD"] == 'GET') { // Clarissa and Cat
        if (isset($_GET["category"])) { // Checking if category is set.
            $category = $_GET["category"]; // The category desired

            $query =
        }
    }

?>
