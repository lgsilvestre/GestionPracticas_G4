<?php namespace App\Models;
<<<<<<< HEAD
 
use CodeIgniter\Model;
 
=======

use CodeIgniter\Model;

>>>>>>> Luciano-Back
class UserModel extends Model{
    protected $table = 'Users';
    protected $allowedFields = ['nombre','email','password','tipo','permisos'];
    protected $beforeInsert = ['beforeInsert'];
    protected $beforeUpdate = ['beforeUpdate'];
<<<<<<< HEAD
 
=======

>>>>>>> Luciano-Back
    protected function beforeInsert(array $data){
        $data = $this -> passwordHash($data);
        return $data;
    }
    protected function beforeUpdate(array $data){
        $data = $this -> passwordHash($data);
        return $data;
<<<<<<< HEAD
    } 
=======
    }
>>>>>>> Luciano-Back
    protected function passwordHash(array $data){
        if(isset($data['data']['password']))
            $data['data']['password'] = password_hash($data['data']['password'], PASSWORD_DEFAULT,[15]);
        return $data;
<<<<<<< HEAD
=======

>>>>>>> Luciano-Back
    }
}
