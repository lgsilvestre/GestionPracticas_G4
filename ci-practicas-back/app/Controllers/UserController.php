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
	private $route = 'D:\xampp\htdocs\GestionPracticas_G4\ci-practicas-back\public\documentos\escuela\\';
// 

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

    public function getFuncionarios()
    {
        $model = new UserModel();
        $users = $model->getUsers();
        echo json_encode($users);
    }

	public function deleteUser(){
		
	}

	public function subirArchivoAdmin(){

		$idAlumno = $this->request->getVar('id_alumno');
		$numeroPractica = $this->request->getVar('numero');
		$documento = $this->request->getVar('documento');

		move_uploaded_file($_FILES['file']['tmp_name'], $this->route.$idAlumno.'-'.$numeroPractica.'-'.$documento.'-escuela.pdf');
        echo "REVISAR ARCHIVO";

	}

}