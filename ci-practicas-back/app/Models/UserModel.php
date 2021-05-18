<?php namespace App\Models;

use CodeIgniter\Model;

class UserModel extends Model{
    protected $table = 'user';
    protected $primaryKey = 'id_user';
    protected $allowedFields = ['nombre','apellido','email','password','tipo','permisos','estado', `fch_acutalizacion`];
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