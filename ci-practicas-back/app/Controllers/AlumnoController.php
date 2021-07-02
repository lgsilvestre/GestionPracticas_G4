<?php

namespace App\Controllers;

use CodeIgniter\Controller;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;
use App\Models\AlumnoModel as AlumnoModel;

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

class AlumnoController extends BaseController
{
	
	/**
		* An array of helpers to be loaded automatically upon
		* class instantiation. These helpers will be available
		* to all other controllers that extend BaseController.
		*
		* @var array
		*/
	protected $helpers = [];
	private $route = 'C:\Users\Windows 10\xampp\htdocs\GestionPracticas_G4\documentos\\';

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

    public function showData(){
        echo "hola desde alumno";
    }

	public function getAlumnoMatricula(){
		$matricula = $this->request->getVar('matricula');
        $model = new AlumnoModel();
        $user = $model->where('matricula', $matricula)->first();   
        echo json_encode($user);
    }

	public function getAlumnoIdMatricula(){
		$matricula = $this->request->getVar('matricula');
		$model = new AlumnoModel();
		$result = $model->getIdMatricula($matricula);   
		echo json_encode($result);
	}

	public function getAlumnoId(){
		$id_alumno = $this->request->getVar('id_alumno');
		$model = new AlumnoModel();
		$result = $model->getAlumno($id_alumno);   
		echo json_encode($result);
	}

	// public function recibirArchivo(){
    // $PATH="C:\Users\Windows 10\xampp\htdocs\GestionPracticas_G4\documentos";
    // // $PATH_="documentos/";
	// 	if (move_uploaded_file($_FILES["file"]["tmp_name"], $PATH.$_FILES['file']['name'])) {
	// 		echo "done";
	// 	}

	// 	// file_put_contents( "documentos\\", $_FILES["file"]["tmp_name"] );

	// 	// $data = $this->request->getVar('file');
	// 	// echo $_FILES[0];
	// 	// move_uploaded_file(
	// 	// 	$data,
	// 	// 	'C:\xampp\htdocs\GestionPracticas_G4\documentos',
	// 	// );
    //     // echo $data;
	// }
	
	public function getAlumnosAdmin(){
		$model = new AlumnoModel();
		$result = $model->getAlumnosAdmin();   
        echo json_encode($result);
	}
   
	public function getAlumnosEscuela(){
		$carrera = $this->request->getVar('carrera');
		$model = new AlumnoModel();
		$result = $model->getAlumnosEscuela($carrera);   
        echo $result;
	}

	public function getCarreraAlumno($id){
		$id = $this->request->getVar('id_alumno');
		$model = new AlumnoModel();
		$result = $model->getAlumnosEscuela($carrera);   
        echo $result;
	}

	public function recibirArchivo(){

		$idAlumno = $this->request->getVar('id_alumno');
		$numeroPractica = $this->request->getVar('numero');
		$documento = $this->request->getVar('documento');

		move_uploaded_file($_FILES['file']['tmp_name'], $this->route.$idAlumno.'-'.$numeroPractica.'-'.$documento.'.pdf');
        echo "REVISAR ARCHIVO";

	}

	public function recibirSeguro(){

		$idAlumno = $this->request->getVar('id_alumno');
		$numeroPractica = $this->request->getVar('$numero');

		move_uploaded_file($_FILES['file']['tmp_name'], $this->route.$idAlumno.'-'.$numeroPractica.'-'.'seguro.pdf');
		//move_uploaded_file($_FILES['file']['tmp_name'], 'C:\Users\Windows 10\xampp\htdocs\GestionPracticas_G4\documentos\logo.pdf');
        echo "REVISAR ARCHIVO";
		
	}

}


