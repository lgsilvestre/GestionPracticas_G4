<?php namespace App\Controllers;

use App\Models\UserModel;
class Users extends BaseController
{
    public function login(){
        helper(['form']);
        if($this-> request -> getMethod() == 'post') {
            $rules = [
                'email' => 'required|min_length[6]|max_length[99]|valid_email',
                'password' => 'required|max_length[255]|validateUSer[email, password]',
            ];
            $errors = [
                'password' => [
                'validateUSer' => 'Email y contraseña no coinciden'
                ]
            ];

            if(! $this->validate($rules, $errors)){
                $data['validation'] = $this->validator;
            } else{
                $model = new UserModel();
                $user = $model->where('email', $this->request->getVar('email'))
                             ->first();

                $this-> setUserSession($user); // aqui tenemos ya al usuario que corresponde

                if($user['tipo']==0){//Superadmin
                    //return redirect()->to('/dashbordSuperAdmin');
                }
                if($user['tipo']==1){//Admin
                    //return redirect()->to('/dashbordAdmin');
                }
                if($user['tipo']==2){//cliente
                    //return redirect()->to('/dashbordJefeCarrera');
                }
                if($user['tipo']==3){//cliente
                    //return redirect()->to('/dashbordEncarcadoCarrera');
                }
                if($user['tipo']==4){//cliente
                    //return redirect()->to('/dashbordAlumno');
                }
            }
        }

        //echo view('template/header',$data);
        //echo view('template/landing/login');
        //echo view('template/footer');
    }
private function setUserSession($user){
        $data =[
            'id' => $user['id'],
            'nombre' => $user['firstname'],
            'email' => $user['email'],
            'tipo' => $user['tipo'],
            'permisos' => $user['permisos'],
            'isLoggedIn' => true,
        ];
        session()->set($data);
        return true;
    }
}
