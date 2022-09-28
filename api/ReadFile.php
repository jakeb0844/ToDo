<?php


try {
    $myfile = fopen("save.json", "r") or die('Unable to open file!');

    $filesize = filesize('save.json');

    if($filesize > 0){
        echo fread($myfile, $filesize);
    }

    fclose($myfile);
    //echo "File Saved";
} catch (\Throwable $th) {
    //throw $th;
    echo "Error";
}
