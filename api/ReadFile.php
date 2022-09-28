<?php

$filename = $_GET['filename'];

try {
    $myfile = fopen($filename, "r") or die('Unable to open file!');

    $filesize = filesize($filename);

    if($filesize > 0){
        echo fread($myfile, $filesize);
    }

    fclose($myfile);
    //echo "File Saved";
} catch (\Throwable $th) {
    //throw $th;
    echo "Error";
}
