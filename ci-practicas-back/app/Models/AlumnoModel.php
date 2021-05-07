<?php

namespace App\Models;

use CodeIgniter\Model;

class AlumnoModel extends Model
{
    public function login(){
        echo "1";
    }

    protected $table = 'Alumno';
    protected $allowedFields = ['nombre','correo_ins','correo_per','password','matricula','cod_carrera','rut','sexo','fecha_nac','plan','via_ingreso','anho_ingreso','sit_actual','sit_actual_anho','sit_actual_periodo','regular','comuna_origen','region','nivel','porc_avance','ult_punt_prio','al_dia','nivel_99_aprobado'];
    protected $beforeInsert = ['beforeInsert'];
    protected $beforeUpdate = ['beforeUpdate'];

    protected function beforeInsert(array $data){
        $data = $this -> passwordHash($data);
        return $data;
    }

    protected function beforeUpdate(array $data){
        $data = $this -> passwordHash($data);
        return $data;
    } 

    protected function passwordHash(array $data){
        if(isset($data['data']['password']))
            $data['data']['password'] = password_hash($data['data']['password'], PASSWORD_DEFAULT,[15]);
        return $data;
    }
}
?>