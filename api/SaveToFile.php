<?php

if(isset($_POST['json']) && isset($_POST['filename'])){
    $filename = $_POST['filename'];
    try {
        $myfile = fopen($filename, "w") or die('Unable to open file!');
        fwrite($myfile,$_POST['json']);
        fclose($myfile);
        echo "File Saved";
    } catch (\Throwable $th) {
        //throw $th;
        echo "Something not so great happened";
    }
}


?>