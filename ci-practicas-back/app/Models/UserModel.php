<?php namespace App\Models;

use CodeIgniter\Model;

class UserModel extends Model{
    protected $table = 'usuario';
    protected $primaryKey = 'id_usuario';
    protected $allowedFields = ['nombre','apellido','email','password','tipo','permisos','estado','refCarrera'];
    
    public function login($email, $password){

        $string_query = "Select nombre, apellido, email, tipo, permisos, estado, refCarrera from usuario where email = '".$email."' and password = '".$password."';";
        $query = $this->db->query($string_query);
        $result = $query->getResult();
        return $result;
        
    }
    
    public function insertUser($nombre, $apellido, $email, $tipo, $password){
        echo $nombre." - ".$apellido." - ".$email." - ".$tipo." - ".$password;
        /*
        $string_query = "insert into 'usuario' ('nombre', 'apellido', 'email', 'password', 'tipo', 'permisos', 'estado', 'refCarrera') VALUES ('".$nombre."', 'Apellido', '".$email."', '".$password."', '".$tipo."', '0', '1', '1');";
        $query = $this->db->query($string_query);
        $result = $query->getResult();
        return $result;
        */
    }
    
    public function getUsers(){

        $string_query = "Select * from usuario";
        $query = $this->db->query($string_query);
        $result = $query->getResult();
        return $result;
    }

    public function getUsersCarrera($idCarrera){

        $string_query = "SELECT email FROM usuario WHERE refCarrera = '".$idCarrera."' AND tipo = '1' OR tipo = '2'";
        $query = $this->db->query($string_query);
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