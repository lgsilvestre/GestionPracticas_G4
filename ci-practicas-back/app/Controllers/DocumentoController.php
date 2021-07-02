<?php

namespace App\Controllers;

use CodeIgniter\Controller;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;
use App\Models\DocumentoModel as DocumentoModel;

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

class DocumentoController extends  BaseController
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
		$this->DocumentoModel = new DocumentoModel();
        
	}

    public function getDocumentos(){

        $result = $this->DocumentoModel->getDocumentos();
        $arr = array();
        if ($result){
            foreach ($result as $row)
            {
                $arr['nombre'] = $row->nombre;
                $arr['etapa'] = $row->etapa;
                $arr['requerido'] = $row->requerido;
            }
        echo json_encode($result);
        } else {
            echo "error";
        }
        
    }
    
	public function getDocumento(){
		echo "entró a documento";
        $result = $this->DocumentoModel->getDocumento();
        $arr = array();
        if ($result){
            foreach ($result as $row)
            {
                $arr['nombre'] = $row->nombre;
            }
            echo json_encode($arr);
        } else {
            echo "error";
        }
    }

	private function sendEmailDocumentosCargadosAlumno($correo, $nombre, $fecha){
        $email = \Config\Services::email();

        $email->setFrom('soportecentrodepractica@gmail.com', 'Equipo de centro de práctica');
        $email->setTo($correo);
        $email->setSubject('Documentos cargados');
        $email->setMessage('
                <p>¡Estimad@ <b>'.$nombre.'!</b>, sus documentos han sido cargados correctamente.</p>
				<p>Nuestros encargados de practicas están revisando su documentación.</p>
                <p>Estado solicitud: En evaluación desde el '.$fecha.'</p>
                <br>
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


	private function sendEmailDocumentosCargadosUser($correo, $nombre, $matricula, $fecha){
        $email = \Config\Services::email();

        $email->setFrom('soportecentrodepractica@gmail.com', 'Equipo de centro de práctica');
        $email->setTo($correo);
        $email->setSubject('Documentos cargados');
        $email->setMessage('
                <p>Hay nuevos documentos cargados a la plataforma.</p>
				<p>Por favor evaluar documentación lo antes posible.</p>
                <p>Estado solicitud:</p>
				<p>Nombre: '.$nombre.'</p>
				<p>Matrícula: '.$matricula.'</p>
				<p>En evaluación desde el '.$fecha.'</p>
                <br>
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

	private function sendEmailRetroalimentacionAlumno($correo, $nombre, $fecha){
        $email = \Config\Services::email();

        $email->setFrom('soportecentrodepractica@gmail.com', 'Equipo de centro de práctica');
        $email->setTo($correo);
        $email->setSubject('Retroalimentación documentación');
        $email->setMessage('
                <p>¡Estimad@ <b>'.$nombre.'!</b>, hay retroalimentación de tus documentos previamente cargados a la pagina.</p>
				<p>Dirígete al portal del centro de prácticas para ver la retroalimentación.</p>
                <p>Estado solicitud:</p>
				<p>Retroalimentación hecha el '.$fecha.'</p>
                <br>
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
}


