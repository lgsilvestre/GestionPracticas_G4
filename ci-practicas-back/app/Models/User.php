<?php

namespace App\Models;

use CodeIgniter\Model;

class User extends Model
{
    public function login(){
        
        echo "modelo usuario";
        /*$db = db_connect();
        $query = $db->query('SELECT * from alumno');
        $results = $query->getResult();
        $json = json_encode($results);
        echo $json;*/

        //$query = "select * from alumnos";
        //echo $db->query($query)->result("json");
    }
}
?>