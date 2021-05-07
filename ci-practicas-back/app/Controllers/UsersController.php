<?php

namespace App\Controllers;

use CodeIgniter\Controller;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;
use App\Models\AlumnoModel as AlumnoModel;
use App\Models\UserModel as UserModel;

/**
 * Class BaseController
 *
 * BaseController provides a convenient place for loading components
 * and performing functions that are needed by all your controllers.
 * Extend this class in any new controllers:
 *     class Home extends BaseController
 *
 * For security be sure to declare any new methods as protected or private.
 */

class UsersController extends Controller
{
	
	/**
	 * An array of helpers to be loaded automatically upon
	 * class instantiation. These helpers will be available
	 * to all other controllers that extend BaseController.
	 *
	 * @var array
	 */
	protected $helpers = [];

	/**
	 * Constructor.
	 *
	 * @param RequestInterface  $request
	 * @param ResponseInterface $response
	 * @param LoggerInterface   $logger
	 */
	public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger)
	{
		// Do Not Edit This Line
		parent::initController($request, $response, $logger);
		
		//--------------------------------------------------------------------
		// Preload any models, libraries, etc, here.
		//--------------------------------------------------------------------
		// E.g.: $this->session = \Config\Services::session();
		//$this->load->model("Alumno");
		$this->AlumnoModel = new AlumnoModel();
	}

	public function login(){
		$this->AlumnoModel->login();
	}
    
	public function login1(){
        echo "Usuario: ".$this->request->getVar('email')." - ";
        echo "Pass: ".$this->request->getVar('password');
        
        helper(['form']);
        /*
        if($this-> request -> getMethod() == 'post') {
            
            $rules = [
                'email' => 'required|min_length[6]|max_length[99]|valid_email',
                'password' => 'required|max_length[255]|validateUSer[email, password]',
            ];
            $errors = [
                'password' => [
                'validateUSer' => 'Email y contrase�a no coinciden'
                ]
            ];
            
            if(! $this->validate($rules, $errors)){
                $data['validation'] = $this->validator;
            } else {
                $model = new UserModel();
                $user = $model->where('email', $this->request->getVar('email'))->first();

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
        }*/
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
        helper(['form']);

        if($this-> request -> getMethod() == 'post') {
            //validation rules
                
            $rules = [
                'nombre' => 'required|min_length[3]|max_length[22]',
                'password' =>'required',
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
        //Reconstruimos la contrase�a segun la longitud que se quiera
        for($i=0;$i<$longitud;$i++) {
            //obtenemos un caracter aleatorio escogido de la cadena de caracteres
            $pass .= substr($str,rand(0,61),1);
        }
        $pass='123456';
        return $pass;
    }
    
    public function registerUser(){
        echo "entró al registro user";
        
        helper(['form']);
        
        if($this-> request -> getMethod() == 'post') {
            $rules = [
                'nombre' => 'required|min_length[2]|max_length[50]',
                'apellido' => 'required|min_length[2]|max_length[50]',
                'email' => 'required|min_length[6]|max_length[50]|valid_email|is_unique[users.username]',
                'tipo' => 'required|min_length[1]|max_length[1]|integer',
                'permisos' => 'required|max_lenght[10]|integer',  
            ];
            $errors = [
                'email' => [
                    'is_unique' => 'Email se encuentra registrado en el sistema'
                ]
            ];
            
            if(!$this->validate($rules, $errors)){
                $data['validation'] = $this->validator;
            } else {
                
                $model = new UserModel();

                $newsData =[
                    'nombre' => $this->request->getVar('nombre'),
                    'apellido' => $this->request->getVar('apellido'),
                    'email' => $this->request->getVar('email'),
                    'password' => $this->generatePass(6),
                    'tipo' => $this->request->getVar('tipo'),
                    'permisos' => $this->request->getVar('permisos'),
                    'estado' => true,
                ];
                $model ->save($newsData);
                
                //$this-> setUserSession($user); // aqui tenemos ya al usuario que corresponde

                echo "terminó el registro de user";
                /*
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
                }*/
            }
        }
        //return redirect()->to('/dashbordAlumno');          VistaRegistro
    }
    
    public function registerAlumno(){
        helper(['form']);
        if($this-> request -> getMethod() == 'post') {
            $rules = [
                'nombre' => 'required|min_length[2]|max_length[99]',
                'correo_ins' => 'required',
                'correo_per' => 'required',
                'password' => 'required',
                'matricula' => 'required',
                'cod_carrera' => 'required',
                'rut' => 'required',
                'sexo' => 'required',
                'fecha_nac' => 'required',
                'plan' => 'required',
                'via_ingreso' => 'required',
                'anho_ingreso' => 'required',
                'sit_actual' => 'required',
                'sit_actual_anho' => 'required',
                'sit_actual_periodo' => 'required',
                'regular' => 'required',
                'comuna_origen' => 'required',
                'region' => 'required',
                'nivel' => 'required',
                'porc_avance' => 'required',
                'ult_punt_prio' => 'required',
                'al_dia' => 'required',
                'nivel_99_aprobado' => 'required'
            ];
            $errors = [
            ];

            if(! $this->validate($rules, $errors)){
                $data['validation'] = $this->validator;
            } else {
                $model = new AlumnoModel();
                $newsData =[
                    'nombre' => $this->request->getVar('nombre'),
                    'correo_ins' => $this->request->getVar('correo_ins'),
                    'correo_per' => $this->request->getVar('correo_per'),
                    'password' => $this->request->getVar('password'),
                    'matricula' => $this->request->getVar('matricula'),
                    'cod_carrera' => $this->request->getVar('cod_carrera'),
                    'rut' => $this->request->getVar('rut'),
                    'sexo' => $this->request->getVar('sexo'),
                    'fecha_nac' => $this->request->getVar('fecha_nac'),
                    'plan' => $this->request->getVar('plan'),
                    'via_ingreso' => $this->request->getVar('via_ingreso'),
                    'anho_ingreso' => $this->request->getVar('anho_ingreso'),
                    'sit_actual' => $this->request->getVar('sit_actual'),
                    'sit_actual_anho' => $this->request->getVar('sit_actual_anho'),
                    'sit_actual_periodo' => $this->request->getVar('sit_actual_periodo'),
                    'regular' => $this->request->getVar('regular'),
                    'comuna_origen' => $this->request->getVar('comuna_origen'),
                    'region' => $this->request->getVar('region'),
                    'nivel' => $this->request->getVar('nivel'),
                    'porc_avance' => $this->request->getVar('porc_avance'),
                    'ult_punt_prio' => $this->request->getVar('ult_punt_prio'),
                    'al_dia' => $this->request->getVar('al_dia'),
                    'nivel_99_aprobado' => $this->request->getVar('nivel_99_aprobado'),
                    'estado' => 1,
                ];
                $model ->save($newsData);

                //$this-> setUserSession($user); // aqui tenemos ya al usuario que corresponde

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
        //return redirect()->to('/dashbordAlumno');          VistaRegistro
        }
    } 
}