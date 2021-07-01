<?php

namespace App\Models;

use CodeIgniter\Model;

class AlumnoModel extends Model
{
    protected $table = 'alumno';
    protected $primarykey = 'id_alumno';
    protected $allowedFields = ['nombre','correo_ins','correo_per','password','matricula',
    'nbe_carrera','cod_carrera','rut','sexo','fecha_nac','plan','via_ingreso','anho_ingreso','sit_actual',
    'sit_actual_anho','sit_actual_periodo','regular','comuna_origen','region','nivel','porc_avance',
    'ult_punt_prio','al_dia','nivel_99_aprobado','estado_alumno','refCarrera'];
    
    public function login($email, $password){
        
        $query = $this->db->query("Select id_alumno, nombre, correo_ins, matricula, nbe_carrera, refCarrera from alumno where correo_ins = '".$email."' and password = '".$password."';");
        $result = $query->getResult();
        return $result;
        
    }

    public function getIdMatricula($matricula) {
        $query = $this->db->query("Select id_alumno from alumno where matricula = '".$matricula."'");
        $result = $query->getResult();
        return $result;
    }
    public function getAlumno($id_alumno) {
        $query = $this->db->query("Select * from alumno where id_alumno = '".$id_alumno."'");
        $result = $query->getResult();
        return $result;
    }

    public function getIdAlumno($matricula) {
        $query = $this->db->query("Select * from alumno where matricula = '".$matricula."'");
        $result = $query->getResult();
        return $result;
    }

    public function getAlumnosAdmin(){
        $query = $this->db->query("Select * from alumno");
        $result = $query->getResult();
        return $result;
    }

    public function getAlumnosEscuela($carrera){
        $query = $this->db->query("Select * from alumno where carrera = '".$carrera."'");
        $result = $query->getResult();
        return $result;
    }

    public function getCarreraAlumno($id){
        $query = $this->db->query("Select carrera from alumno where id_alumno = '".$id."'");
        $result = $query->getResult();
        return $result;
    }

    public function getCorreoNombreApellido($id){
        $query = $this->db->query("Select nombre, correo_ins, matricula, refCarrera from alumno where id_alumno = '".$id."'");
        $result = $query->getResult();
        return $result;
    }

    /*
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
    }*/
    
}
?>