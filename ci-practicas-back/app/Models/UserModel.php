<?php namespace App\Models;

use CodeIgniter\Model;

class UserModel extends Model{
    protected $table = 'usuario';
    protected $primaryKey = 'id_usuario';
    protected $allowedFields = ['nombre','apellido','email','password','tipo','permisos','estado','refCarrera'];
    
    public function login($email, $password){

        $query = $this->db->query("Select nombre apellido email tipo permisos refCarrera from usuario where correo_ins = '".$email."' and password = '".$password."';");
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
    }
    */
}