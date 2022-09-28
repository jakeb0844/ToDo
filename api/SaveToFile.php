<?php

if(isset($_POST['json'])){
    try {
        $myfile = fopen("save.json", "w") or die('Unable to open file!');
        fwrite($myfile,$_POST['json']);
        fclose($myfile);
        echo "File Saved";
    } catch (\Throwable $th) {
        //throw $th;
        echo "Something not so great happened";
    }
}


?>