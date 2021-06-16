<?php

namespace App\Controllers;

use CodeIgniter\Controller;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;
use App\Models\InstDocumentoModel as InstDocumentoModel;

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

class InstanciaDocumentoController extends BaseController
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
		$this->InstDocumentoModel = new InstDocumentoModel();
        
	}

	// Entrega las instancias de documento de un alumno
	public function getInstanciasDocumento() {
		
	}

    // public function setDocumentosAlumno(){

    //     $result = $this->DocumentoModel->getDocumentos();
    //     $arr = array();
    //     if ($result){
    //         foreach ($result as $row)
    //         {
    //             $arr['nombre'] = $row->nombre;
    //             $arr['etapa'] = $row->etapa;
    //             $arr['requerido'] = $row->requerido;
    //         }
    //     echo json_encode($result);
    //     } else {
    //         echo "error";
    //     }
        
    // }
    
	// public function getDocumento(){
	// 	echo "entró a documento";
    //     $result = $this->DocumentoModel->getDocumento();
    //     $arr = array();
    //     if ($result){
    //         foreach ($result as $row)
    //         {
    //             $arr['nombre'] = $row->nombre;
    //         }
    //         echo json_encode($arr);
    //     } else {
    //         echo "error";
    //     }
    // }
}


