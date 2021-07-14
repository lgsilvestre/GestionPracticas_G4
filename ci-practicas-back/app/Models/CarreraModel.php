<?php

namespace App\Models;

use CodeIgniter\Model;

class CarreraModel extends Model
{
    protected $table      = 'carrera';
    protected $primaryKey = 'id_carrera';
    protected $allowedFields = ['nombre','extension'];

    public function getCarreras(){
        $query = $this->db->query("Select * from carrera");
        $result = $query->getResult();
        return $result;
    }

    public function getCarrerasTabla(){
        $query = $this->db->query("Select * from carrera");
        $result = $query->getResult();
        return $result;
    }    

}
?>