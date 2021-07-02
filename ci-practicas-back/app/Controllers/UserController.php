<?php 

namespace App\Controllers;

use CodeIgniter\Controller;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;

use App\Models\UserModel;

class UserController extends BaseController
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
	}

//     public function login(){
//         helper(['form']);
//         if($this-> request -> getMethod() == 'post') {
//             $rules = [
//                 'email' => 'required|min_length[6]|max_length[99]|valid_email',
//                 'password' => 'required|max_length[255]|validateUSer[email, password]',
//                 // lo correcto es que la regla verifique si el usuario esta activo
//             ];
//             $errors = [
//                 'password' => [
//                 'validateUSer' => 'Email y contraseña no coinciden'
//                 ]
//             ];

//             if(! $this->validate($rules, $errors)){
//                 $data['validation'] = $this->validator;
//             } else{
//                 $model = new UserModel();
//                 $user = $model->where('email', $this->request->getVar('email'))
//                              ->first();
//                 if($user ['active']==1){
//                     $this-> setUserSession($user); // aqui tenemos ya al usuario que corresponde

//                     if($user['tipo']==0){//Superadmin
//                      //   return redirect()->to('/dashbordAdmin');
//                     }
//                     if($user['tipo']==1){//Admin
//                      //   return redirect()->to('/dashbordAdmin');
//                     }
//                     if($user['tipo']==2){//cliente
//                     //    return redirect()->to('/dashbordAdmin');
//                     }
//                     if($user['tipo']==3){//cliente
//                     //    return redirect()->to('/dashbordAdmin');
//                     }
//                     if($user['tipo']==4){//cliente
//                     //    return redirect()->to('/dashbordAlumno');
//                     }
//                 }
//                 else{
//                     //usuario inactivo
//                 }
//             }
//         }

//         //echo view('template/header',$data);
//         //echo view('template/landing/login');
//         //echo view('template/footer');
//     }
// private function setUserSession($user){
//         $data =[
//             'id' => $user['id'],
//             'nombre' => $user['firstname'],
//             'email' => $user['email'],
//             'tipo' => $user['tipo'],
//             'permisos' => $user['permisos'],
//             'isLoggedIn' => true,
//         ];
//         session()->set($data);
//         return true;
//     }

// public function generatePass($longitud){
//     $str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
//     $pass = "";
//     //Reconstruimos la contraseña segun la longitud que se quiera
//     for($i=0;$i<$longitud;$i++) {
//         //obtenemos un caracter aleatorio escogido de la cadena de caracteres
//         $pass .= substr($str,rand(0,61),1);
//     }
//     $pass='123456';
//     return $pass;
// }

// public function register(){
//     helper(['form']);
//     if($this-> request -> getMethod() == 'post') {
//         $rules = [
//             'nombre' => 'required|min_length[2]|max_length[99]',
//             'email' => 'required|min_length[6]|max_length[99]|valid_email|is_unique[users.email]',
//             'tipo' => 'required|min_length[1]|max_length[1]|integer',
//             'permisos' => 'required',          //parcialmente terminado
//         ];
//         $errors = [
//         ];

//         if(! $this->validate($rules, $errors)){
//             $data['validation'] = $this->validator;
//         } else{
//             $model = new UserModel();
//             $newsData =[
//                 'nombre' => $this->request->getVar('nombre'),
//                 'email' => $this->request->getVar('email'),
//                 'password' => $this->generatePass(6),
//                 'tipo' => $this->request->getVar('tipo'),
//                 'permisos' => $this->request->getVar('permisos'),
//                 'activo' => 1,
//             ];
//             $model ->save($newsData);

//             $this-> setUserSession($user); // aqui tenemos ya al usuario que corresponde

//             if($user['tipo']==0){
//                 return redirect()->to('/');
//                 }
//             }
//         }
//     //return redirect()->to('/dashbordAlumno');          VistaRegistro
//     }


//     public function adminEdit(){
//         helper(['form']);
//         if($this-> request -> getMethod() == 'post') {
//             $rules = [
//                 'nombre' => 'required|min_length[2]|max_length[99]',
//                 'email' => 'required|min_length[6]|max_length[99]|valid_email|is_unique[users.email]',
//                 'tipo' => 'required|min_length[1]|max_length[1]|integer',
//                 'permisos' => 'required',            //parcialmente terminado
//                 'password' => 'required|max_length[255]|validateUSer[email, password]',
//             ];
//             $errors = [
//             ];
//             if(! $this->validate($rules, $errors)){
//                 $data['validation'] = $this->validator;
//             } else{
//                 $model = new UserModel();
//                 $newsData =[
//                     'nombre' => $this->request->getVar('nombre'),
//                     'password' => $this->generatePass(6),
//                     'tipo' => $this->request->getVar('tipo'),
//                     'permisos' => $this->request->getVar('permisos'),
//                 ];
//                 $model->where('email', this->request-getVar('email')) ->save($newsData);
//                 return redirect()->to('/');     //Modificable, en caso de vista de usuario modificado
//             }
//         }
//         return redirect()->to('/');
//     }

//     public function eliminar(){  //Puede un usuario eliminar su propia cuenta?
//         helper(['form']);
//         if($this-> request -> getMethod() == 'post') {
//             $rules = [
//                 'email' => 'required|min_length[6]|max_length[99]|valid_email|is_unique[users.email]',
//             ];
//             $errors = [
//             ];
//             if(! $this->validate($rules, $errors)){
//                 $data['validation'] = $this->validator;
//             } else{
//                 $model = new UserModel();
//                 $newsData =[
//                     'email' => $this->request->getVar('email'),
//                     'activo' => 0,
//                 ];
//                 $model->where('email', this->request-getVar('email')) ->save($newsData);
//                 return redirect()->to('/');     //Modificable, en caso de vista de usuario eliminado
//             }
//         }
//         return redirect()->to('/');
//     }

//     public function obtenerUsuarios()                   //Siguientes funciones seran probablemente modificadas
//     {
//         $model = new UserModel();
//         $users = $model->findAll();
//         echo json_encode($users);
//     }

//     public function obtenerUsuariosActivos()
//     {
//         $model = new UserModel();
//         $users = $model->where('activo', 1);
//         echo json_encode($users);
//     }

//     public function obtenerAlumnos()
//     {
//         $model = new UserModel();
//         $users = $model->where('tipo', 'alumno');       //Muy modificable, no recuerdo el nombre del tipo de usuario 
//         echo json_encode($users);
//     }

    public function getFuncionarios()
    {
        $model = new UserModel();
        $users = $model->getUsers();
        echo json_encode($users);
    }

	public function deleteUser(){
		
	}

}