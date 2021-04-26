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
                // lo correcto es que la regla verifique si el usuario esta activo
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
                if($user ['active']==1){
                    $this-> setUserSession($user); // aqui tenemos ya al usuario que corresponde

                    if($user['tipo']==0){//Superadmin
                        return redirect()->to('/dashbordAdmin');
                    }
                    if($user['tipo']==1){//Admin
                        return redirect()->to('/dashbordAdmin');
                    }
                    if($user['tipo']==2){//cliente
                        return redirect()->to('/dashbordAdmin');
                    }
                    if($user['tipo']==3){//cliente
                        return redirect()->to('/dashbordAdmin');
                    }
                    if($user['tipo']==4){//cliente
                        return redirect()->to('/dashbordAlumno');
                    }
                }
                else{
                    //usuario inactivo
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

    public function profile(){
        $model = new UserModel();
        helper(['form');

        if($this-> request -> getMethod() == 'post') {
            //validation rules
            $rules = [
                'nombre' => 'required|min_length[3]|max_length[22]',
               // 'email' => 'required|min_length[3]|max_length[22]',
                'password' =>'required',
               // 'permisos' =>'required'
            ];
            if($this->request->getPost('clave') != ''){
                $rules['clave'] = 'required|min_length[6]|max_length[255]';
                $rules['confirmar'] =  'matches[clave]';
            }
            $errors = [
                'email' => [
                    'is_unique' => 'Email se encuentra registrado en el sistema'
                ]
            ];

            if(! $this->validate($rules, $errors)){
                $data['validation'] = $this->validator;
            } else{
                $newsData =[
                    'id' => session()->get('id'),
                    'firstname' => $this->request->getPost('nombre'),
                ];
                if($this->request->getPost('clave') != ''){
                    $newsData['password'] = $this->request->getPost('clave');
                }
                $model -> save($newsData);

                //session()->setFlashdata('success','Informacion de usuario editada con exito');

              //  return redirect()->to('/profile');
            }
        }
    //redirigir por ruta con los datos en json
    }
    
public function generatePass($longitud){
    $str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
    $pass = "";
    //Reconstruimos la contraseña segun la longitud que se quiera
    for($i=0;$i<$longitud;$i++) {
        //obtenemos un caracter aleatorio escogido de la cadena de caracteres
        $pass .= substr($str,rand(0,61),1);
    }
    $pass='123456';
    return $pass;
}

public function register(){
    helper(['form']);
    if($this-> request -> getMethod() == 'post') {
        $rules = [
            'nombre' => 'required|min_length[2]|max_length[99]',
            'email' => 'required|min_length[6]|max_length[99]|valid_email|is_unique[users.username]',
            'tipo' => 'required|min_length[1]|max_length[1]|integer'
            'permisos' => 'required'            //parcialmente terminado
        ];
        $errors = [
        ];

        if(! $this->validate($rules, $errors)){
            $data['validation'] = $this->validator;
        } else{
            $model = new UserModel();
            $newsData =[
                'nombre' => $this->request->getVar('nombre'),
                'email' => $this->request->getVar('email'),
                'password' => $this->generatePass(6),
                'tipo' => $this->request->getVar('tipo'),
                'permisos' => $this->request->getVar('permisos'),
                'activo' => 1;
            ];
            $model ->save($newsData);

            $this-> setUserSession($user); // aqui tenemos ya al usuario que corresponde

            if($user['tipo']==0){//Superadmin
                return redirect()->to('/dashbordAdmin');
            }
            if($user['tipo']==1){//Admin
                return redirect()->to('/dashbordAdmin');
            }
            if($user['tipo']==2){//cliente
                return redirect()->to('/dashbordAdmin');
            }
            if($user['tipo']==3){//cliente
                return redirect()->to('/dashbordAdmin');
            }
            if($user['tipo']==4){//cliente
                return redirect()->to('/dashbordAlumno');
            }
        }
    }
    //return redirect()->to('/dashbordAlumno');          VistaRegistro
    }
}
