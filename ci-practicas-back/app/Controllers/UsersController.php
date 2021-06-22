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

class UsersController extends  BaseController
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
        $this->UserModel = new UserModel();
	}

    public function insertUser(){
        helper(['form']);
        $nombre = $this->request->getVar('nombre');
        $apellido = $this->request->getVar('apellido');
        $email = $this->request->getVar('email');
        $tipo = $this->request->getVar('tipo');
        $password = $this->request->getVar('password');
        $this->UserModel->insertUser($nombre, $apellido, $email, $tipo, $password);
    }

	public function login(){
		helper(['form']);

        $email = $this->request->getVar('email');
        $password = $this->request->getVar('password');

        // $nombre = 'pepe';
        // $correo = 'lnicolas15@alumnos.utalca.cl';
        // $contraseña = 'c0nt4s3ñ4';
        // $this->sendEmail($nombre, $correo, $contraseña);

        $usermodel = new UserModel();
        $alumnomodel = new AlumnoModel();

        $responseuser = $usermodel->where('email', $email)->first();
        $responsealumno = $alumnomodel->where('correo_ins', $email)->first();

        // Checkeamos si usuario es alumno, admin o no existe
        // Si es admin entra en el if

        if (str_ends_with($email, '@alumnos.utalca.cl')) {

            $result = $alumnomodel->login($email, $password);
            $arr = array();

            if ($result){

                foreach ($result as $row)
                {
                    $arr['id_alumno'] = $row->id_alumno;
                    $arr['nombre'] = $row->nombre;
                    $arr['correo_ins'] = $row->correo_ins;
                    $arr['matricula'] = $row->matricula;
                    $arr['nbe_carrera'] = $row->nbe_carrera;
                    $arr['refCarrera'] = $row->refCarrera;
                    $arr['tipo'] = 3;
                }
                echo json_encode($arr);

            } else {
                echo "error";
            }

        } elseif (str_ends_with($email, '@utalca.cl')) {
            $result = $usermodel->login($email, $password);
            $arr = array();
            if ($result){

                foreach ($result as $row)
                {
                    $arr['nombre'] = $row->nombre;
                    $arr['apellido'] = $row->apellido;
                    $arr['email'] = $row->email;
                    $arr['tipo'] = $row->tipo;
                    $arr['permisos'] = $row->permisos;
                    $arr['estado'] = $row->estado;
                    $arr['refCarrera'] = $row->refCarrera;
                }
                echo json_encode($arr);

            } else {
                echo "error";
            }

        } else {
            echo "no pertenece";
        }

	}

    public function showData(){
        /*
        echo $_SESSION['correo_ins'];
        echo $_SESSION['matricula'];
        echo $_SESSION['nbe_carrera'];
        echo $_SESSION['refCarrera'];
        */
    }

    public function getFuncionarios(){

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

                echo "terminó el registro de user";

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
                'nbe_carrera' => 'required',
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
                    'nbe_carrera' => $this->request->getVar('nbe_carrera'),
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
                    'refCarrera' => $this->request->getVar('refCarrera'),
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


    public function adminEdit(){
        helper(['form']);
        if($this-> request -> getMethod() == 'post') {
            $rules = [
                'nombre' => 'required|min_length[2]|max_length[99]',
                'email' => 'required|min_length[6]|max_length[99]|valid_email|is_unique[users.email]',
                'tipo' => 'required|min_length[1]|max_length[1]|integer',
                'permisos' => 'required',            //parcialmente terminado
                'password' => 'required|max_length[255]|validateUSer[email, password]',
            ];
            $errors = [
            ];
            if(! $this->validate($rules, $errors)){
                $data['validation'] = $this->validator;
            } else{
                $model = new UserModel();
                $newsData =[
                    'nombre' => $this->request->getVar('nombre'),
                    'password' => $this->generatePass(6),
                    'tipo' => $this->request->getVar('tipo'),
                    'permisos' => $this->request->getVar('permisos'),
                ];
                $model->where('email', $this->request->getVar('email')) ->save($newsData);
                return redirect()->to('/');     //Modificable, en caso de vista de usuario modificado
            }
        }
        return redirect()->to('/');
    }

    public function changePassword(){
        helper(['form']);
        if($this-> request -> getMethod() == 'post') {
            $rules = [
                'user' => 'required|min_length[2]|max_length[99]',
                'newpass' => 'required|max_length[255]|validateUSer[email, password]',
            ];
            $errors = [
            ];
            if(! $this->validate($rules, $errors)){
                $data['validation'] = $this->validator;
            } else{
                $model = new UserModel();
                $newsData =[
                    'password' => $this->request->getvar('newpass'),
                ];
                $model->where('email', $this->request->getVar('email')) ->save($newsData);
    //            return redirect()->to('/');     //Modificable, en caso de vista de usuario modificado
            }
        }
 //       return redirect()->to('/');
    }

    public function deleteUserEmail(){  //Puede un usuario eliminar su propia cuenta?
        helper(['form']);
        if($this-> request -> getMethod() == 'post') {
            $rules = [
                'email' => 'required|min_length[6]|max_length[99]|valid_email|is_unique[users.email]',
            ];
            $errors = [
            ];
            if(! $this->validate($rules, $errors)){
                $data['validation'] = $this->validator;
            } else{
                $model = new UserModel();
                $newsData =[
                    'email' => $this->request->getVar('email'),
                    'activo' => 0,
                ];
                $model->where('email', $this->request->getVar('email')) ->save($newsData);
                return redirect()->to('/');     //Modificable, en caso de vista de usuario eliminado
            }
        }
        return redirect()->to('/');
    }

    public function deleteUserID(){  //Puede un usuario eliminar su propia cuenta?
        helper(['form']);
        if($this-> request -> getMethod() == 'post') {
            $rules = [
                'id_alumno' => 'required',      //falta definir rules
            ];
            $errors = [             //falta definir errors
            ];
            if(! $this->validate($rules, $errors)){
                $data['validation'] = $this->validator;
            } else{
                $model = new UserModel();
                $newsData =[
                    'id_alumno' => $this->request->getVar('id_alumno'),
                    'activo' => 0,
                ];
                $model->where('id_alumno', $this->request->getVar('id_alumno')) ->save($newsData);
                return redirect()->to('/');     //Modificable, en caso de vista de usuario eliminado
            }
        }
        return redirect()->to('/');
    }

    public function getUsers()                   //Siguientes funciones seran probablemente modificadas
    {
        $model = new UserModel();
        $users = $model->findAll();

        echo json_encode($users);
    }

    public function getUserEmail()
    {
        helper(['form']);
        if($this-> request -> getMethod() == 'post') {
            $rules = [
                'email' => 'required|min_length[6]|max_length[99]|valid_email|is_unique[users.email]',
            ];
            $errors = [             //falta errors
            ];
            if(! $this->validate($rules, $errors)){
                $data['validation'] = $this->validator;
            } else{
                $model = new UserModel();
                $user = $model->where('email', $this->request->getVar('email'));
                echo json_encode($user);
                return redirect()->to('/');
            }
        }
        return redirect()->to('/');
    }

    public function getUserId()
    {
        helper(['form']);
        if($this-> request -> getMethod() == 'post') {
            $rules = [
                'id' => 'required',
            ];
            $errors = [             //falta errors
            ];
            if(! $this->validate($rules, $errors)){
                $data['validation'] = $this->validator;
            } else{
                $id = $this->request->getVar('id');
                $model = new AlumnoModel();
                $user = $model->where('id_alumno', $id)->first();
                echo json_encode($user);
            }
        }
    }

    public function getUsersActive()
    {
        $model = new UserModel();
        $users = $model->where('estado', 1);
        echo json_encode($users);
    }

    public function getUsersAlumnos()
    {
        $model = new AlumnoModel();
        $users = $model->where('estado', 1);
        echo json_encode($users);
    }

    public function getUserAlumno()
    {

        if($this-> request -> getMethod() == 'post') {
            $rules = [
                'id_alumno' => 'required|integer',
            ];
            $errors = [             //falta errors
            ];
            if(! $this->validate($rules, $errors)){
                $data['validation'] = $this->validator;
            } else{
                $model = new UserModel();
                $user = $model->where('id_alumno', $this->request->getVar('id_alumno'));
                echo json_encode($user);
            }
        }
    }

    private function sendEmailRegisterAlumno($nombre, $correo, $contraseña){
        $email = \Config\Services::email();

        $email->setFrom('soportecentrodepractica@gmail.com', 'Equipo de centro de práctica');
        $email->setTo($correo);
        $email->setSubject('Se ha registrado su usuario con éxito');
        $email->setMessage('
                <p>¡Estimad@ <b>'.$nombre.'!</b>, su cuenta ha sido registrada con éxito :).</p>
                <p>Sus credenciales de ingreso son: </p>
                <p style="color: blue"><b>Usuario:</b> '.$correo.'</p>
                <p style="color: blue"><b>Contraseña:</b> '.$contraseña.'</p>
                <br>
                <p>Ya estas habilitado para acceder al centro de practica y solicitar tu practica</p>
                <p>Atentamente: Equipo de centro de práctica</p>
                <div  align="center"><img  src="http://www.ingenieria.utalca.cl/Repositorio/llsz8xzfzftCIDmwxeKyDQM3GunwAf/centroPractica.png" heigth="500" width="500" class="mx-auto d-block"></div>
        ');

        if($email->send()){
            echo 'Correo enviado';
            return true;
        }
        else{
            echo 'Correo no enviado';
            return false;
        }

    }

    private function sendEmailPassword($nombre, $correo, $contraseña){
        $email = \Config\Services::email();

        $email->setFrom('soportecentrodepractica@gmail.com', 'Equipo de centro de práctica');
        $email->setTo($correo);
        $email->setSubject('Su contraseña ha sido reiniciada');
        $email->setMessage('
                <p>¡Estimad@ <b>'.$nombre.'!</b>, su contraseña ha sido reiniciada con éxito :).</p>
                <p>Sus credenciales de ingreso son: </p>
                <p style="color: blue"><b>Usuario:</b> '.$correo.'</p>
                <p style="color: blue"><b>Contraseña:</b> '.$contraseña.'</p>
                <br>
                <p>Atentamente: Equipo de centro de práctica</p>
                <div  align="center"><img  src="http://www.ingenieria.utalca.cl/Repositorio/llsz8xzfzftCIDmwxeKyDQM3GunwAf/centroPractica.png" heigth="500" width="500" class="mx-auto d-block"></div>
        ');

        if($email->send()){
            echo 'Correo enviado';
            return true;
        }
        else{
            echo 'Correo no enviado';
            return false;
        }
    }



    
    private function sendEmailRegisterUser($nombre, $correo, $contraseña){
        $email = \Config\Services::email();

        $email->setFrom('soportecentrodepractica@gmail.com', 'Equipo de centro de práctica');
        $email->setTo($correo);
        $email->setSubject('Se ha registrado su usuario con éxito');
        $email->setMessage('
                <p>¡Estimad@ <b>'.$nombre.'!</b>, su cuenta ha sido registrada con éxito :).</p>
                <p>Sus credenciales de ingreso son: </p>
                <p style="color: blue"><b>Usuario:</b> '.$correo.'</p>
                <p style="color: blue"><b>Contraseña:</b> '.$contraseña.'</p>
                <br>
                <p>Ya está habilitado para utilizar la plataforma de centro de práctica</p>
                <p>Por favor no responder a este correo</p>
                <p>Atentamente: Equipo de centro de práctica</p>
                <div  align="center"><img  src="http://www.ingenieria.utalca.cl/Repositorio/llsz8xzfzftCIDmwxeKyDQM3GunwAf/centroPractica.png" heigth="500" width="500" class="mx-auto d-block"></div>
        ');

        if($email->send()){
            echo 'Correo enviado';
            return true;
        }
        else{
            echo 'Correo no enviado';
            return false;
        }

    }

    public function registerAlumnoExcel(){
        helper(['form']);
        if($this-> request -> getMethod() == 'post') {
            $rules = [
                'nombre' => 'required|min_length[2]|max_length[99]',
                'correo_ins' => 'required',
                'correo_per' => 'required',
                'matricula' => 'required',
                'nbe_carrera' => 'required',
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

            if(!$this->validate($rules, $errors)){
                echo "error";
                $data['validation'] = $this->validator;
            } else {
                echo "ta weno";
                $model = new AlumnoModel();
                if($this-request->getVar('nombre')=='INGENIERÍA CIVIL EN MINAS'){
                    $refCarrera = 1;
                }
                elseif($this-request->getVar('nombre')=='INGENIERÍA CIVIL EN COMPUTACIÓN'){
                    $refCarrera = 2;
                }
                elseif($this-request->getVar('nombre')=='INGENIERÍA CIVIL INDUSTRIAL'){
                    $refCarrera = 3;
                }
                elseif($this-request->getVar('nombre')=='INGENIERÍA CIVIL EN OBRAS CIVILES'){
                    $refCarrera = 4;
                }
                $newsData =[
                    'nombre' => $this->request->getVar('nombre'),
                    'correo_ins' => $this->request->getVar('correo_ins'),
                    'correo_per' => $this->request->getVar('correo_per'),
                    'password' => $this->request->getVar('password'),
                    'matricula' => $this->request->getVar('matricula'),
                    'nbe_carrera' => $this->request->getVar('nbe_carrera'),
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
                    'refCarrera' =>$refCarrera,
                    'estado' => 1
                ];
                $model ->save($newsData);

                //$this-> setUserSession($user); // aqui tenemos ya al usuario que corresponde
            }
        //return redirect()->to('/dashbordAlumno');          VistaRegistro
        }
    }

    public function registerAlumnoExcelData(){
        helper(['form']);
        $data = $this->request->getVar('data');
        //print_r($data);
        $model = new AlumnoModel();
        if($this-> request -> getMethod() == 'post') {
            for ($i = 0; $i < count($data); $i++){
                $value = get_object_vars($data[$i]);
                if($value['Nombre carrera']=='INGENIERÍA CIVIL EN MINAS'){
                    $refCarrera = 1;
                }
                elseif($value['Nombre carrera']=='INGENIERÍA CIVIL EN COMPUTACIÓN'){
                    $refCarrera = 2;
                }
                elseif($value['Nombre carrera']=='INGENIERÍA CIVIL INDUSTRIAL'){
                    $refCarrera = 3;
                }
                elseif($value['Nombre carrera']=='INGENIERÍA CIVIL EN OBRAS CIVILES'){
                    $refCarrera = 4;
                }
                $newsData =[
                    'nombre' => $value['Nombre Alumno'],
                    'correo_ins' => $value['Correo Institucional'],
                    'correo_per' => $value['Correo Personal'],
                    'password' => $this->generatePass(6),
                    'matricula' => $value['Matricula'],
                    'nbe_carrera' => $value['Nombre carrera'],
                    'cod_carrera' => $value['Codigo Carrera'],
                    'rut' => $value['RUT'],
                    'sexo' => $value['Sexo'],
                    'fecha_nac' => $value['Fecha Nacimiento'],
                    'plan' => $value['Plan'],
                    'via_ingreso' => $value['Via Ingreso'],
                    'anho_ingreso' => $value['Año Ingreso'],
                    'sit_actual' => $value['Situcacion Actual'],
                    'sit_actual_anho' => $value['Situacion Actual Año'],
                    'sit_actual_periodo' => $value['Situacion Actual Periodo'],
                    'regular' => $value['Regular'],
                    'comuna_origen' => $value['Comuna Origen'],
                    'region' => $value['Region'],
                    'nivel' => $value['Nivel'],
                    'porc_avance' => $value['Porcentaje Avance'],
                    'ult_punt_prio' => $value['Ultima Puntuacion Prioridad'],
                    'al_dia' => $value['Al Día'],
                    'nivel_99_aprobado' => $value['Nivel 99 Aprobado'],
                    'refCarrera' =>$refCarrera,
                    'estado_alumno' => '1'
                ];
                $model ->save($newsData);
                // $value['nombre'];
                // $value['id_documento'];
                // $value['requerido'];
            }
        }
        // if($this-> request -> getMethod() == 'post') {
        //     $rules = [
        //    //     'nivel_99_aprobado' => 'required'
        //     ];
        //     $errors = [
        //     ];

        //     if(!$this->validate($rules, $errors)){
        //         $data['validation'] = $this->validator;
        //     } else {
        //         $model = new AlumnoModel();
        //         $newsData =[
        //         //    'nivel_99_aprobado' => $this->request->getVar('nivel_99_aprobado')
        //         ];
        //         $model ->save($newsData);

        //         //$this-> setUserSession($user); // aqui tenemos ya al usuario que corresponde
        //     }
        // //return redirect()->to('/dashbordAlumno');          VistaRegistro
        // }
    }
}


