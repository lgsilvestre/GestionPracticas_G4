<?php

namespace App\Controllers;
use App\Models\PracticaModel as PracticaModel;
use App\Models\AlumnoModel as AlumnoModel;
use App\Models\HistorialModel as HistorialModel;
use App\Models\InstDocumentoModel as InstDocumentoModel;

class PracticaController extends BaseController
{
	public function index()
	{
		$model = new PracticaModel();
		$practicas = $model->findAll();
		echo json_encode($practicas);
	}

	public function solicitarPractica()
	{
		if($this-> request -> getMethod() == 'post') {
			$Estudiante = $this->request->getVar('estudiante');
			$Nropractica = $this->request->getVar('nropractica');
			$Estado = $this->request->getVar('estado');
			echo $Estudiante." ".$Nropractica." ".$Estado; 
            $rules = [
                'estudiante' => 'required',
				'nropractica' => 'required',
				'estado' => 'required',		//faltan reglass por agregar
				// 'numero' => 'required|integer'
            ];
            $errors = [			// faltan errores por definir

            ];
            if(!$this->validate($rules, $errors)){
				echo " no valido";
                $data['validation'] = $this->validator;
            } else {

				//Primero hay que validar que no
				$Estudiante = $this->request->getVar('estudiante');
				$Nropractica = $this->request->getVar('nropractica');
				$Estado = $this->request->getVar('estado');

				$resutaldo = $this->validarPractica($Estudiante, $Nropractica, $Estado);
				echo " retornando resultado";
				echo $resutaldo;
            }
        }
	}

	private function validarPractica($Estudiante, $Nropractica, $Estado)
	{
		echo "validando...";
		$model = new PracticaModel();
		$practicas = $model->where('refAlumno',$Estudiante)->findAll();
		// if($model->where('estado',2).count==2)
		// {
		// 	echo "no se puede 2";
		// 	return false;
		// }
		// if($model->where('estado',0).count==1)
		// {
		// 	echo "no se puede 1";
		// 	return false;
		// }
		$newsData =[
			'refAlumno' => $Estudiante,
			'etapa' => $Estado,
			'estado' => 0,
		];
		$model ->save($newsData);
		echo "retornando true";
		return true;
	}

	public function solicitarDocumento()
	{
		if($this-> request -> getMethod() == 'post') {
            $rules = [
                'estudiante' => 'required|min_length[2]|max_length[99]',
				'nropractica' => 'required',

            ];
            $errors = [			// faltan errores por definir
				'estudiante' => [
                    'required' => 'No se ha definido un estudiante'
                ],
            ];
            if(!$this->validate($rules, $errors)){
                $data['validation'] = $this->validator;
            } else {
				$Estudiante = $this->request->getVar('estudiante');
				$Nropractica = $this->request->getVar('nropractica');

				$resutaldo = $this->buscarDocumento($Estudiante);
				echo json_encode($resutaldo);
            }
        }
	}

	private function buscarDocumento($Estudiante)
	{
		$model = new PracticaModel();
		$practicas = $model->where('refAlumno',$Estudiante)->findAll();
		if($practicas->where('estado',2).count==2)
		{
			return false;
		}
		if($practicas->where('estado',0).count==1)
		{
			return false;
		}
		return true;
	}

    public function filtros(){
        helper(['form']);
				// echo "Filtros: ".$Etapa." ".$Estado." ".$Carrera." ".$anio;
        if($this-> request -> getMethod() == 'post') {
            $rules = [
                'etapa_filtro' => 'max_length[20]',
                'estado_filtro' => 'max_length[20]',
                'carrera_filtro' => 'max_length[20]',
                'anio_filtro' => 'max_length[20]',
            ];
            $errors = [
            ];
            if(!$this->validate($rules, $errors)){
                $data['validation'] = $this->validator;
            } else {
				//echo "POST: ".$this->request->getVar('etapa_filtro')." ".$this->request->getVar('estado_filtro')." ".$this->request->getVar('carrera_filtro')." ".$this->request->getVar('anio_filtro');
				$Etapa = $this->request->getVar('etapa_filtro');
				$Estado =$this->request->getVar('estado_filtro');
				$Carrera = $this->request->getVar('carrera_filtro');
				$anio = $this->request->getVar('anio_filtro');
				//echo "Filtros: ".$Etapa." ".$Estado." ".$Carrera." ".$anio;
				$resutaldo = $this->resultadoFiltros($Etapa, $Estado, $Carrera, $anio);
				echo json_encode($resutaldo);
            }
        }
    }

	public function resultadoFiltros($Etapa, $Estado, $Carrera, $anio)
	{
		// echo "RESULTADOS: ".$Etapa." ".$Estado." ".$Carrera." ".$anio;
		$model = new PracticaModel();
		if($Etapa =='' && $Estado =='' && $Carrera=='' && $anio =='')
		{
			return $model->findAll();
		}
		if($Etapa !='' && $Estado =='' && $Carrera=='' && $anio =='')
		{
			return $model->where('etapa',$Etapa)->findAll();
		}
		if($Etapa =='' && $Estado !='' && $Carrera=='' && $anio =='')
		{
			return $model->where('estado',$Estado)->findAll();
		}
		if($Etapa =='' && $Estado =='' && $Carrera!='' && $anio =='')
		{
			return $model->where('carrera',$Carrera)->findAll();
		}
		if($Etapa =='' && $Estado =='' && $Carrera=='' && $anio !='')
		{
			return $model->where('anio',$anio)->findAll();
		}

		if($Etapa !='' && $Estado !='' && $Carrera=='' && $anio =='')
		{
			return $model->where('etapa',$Etapa)->where('estado',$Estado)->findAll();
		}
		if($Etapa !='' && $Estado =='' && $Carrera!='' && $anio =='')
		{
			return $model->where('etapa',$Etapa)->where('carrera',$Carrera)->findAll();
		}
		if($Etapa !='' && $Estado =='' && $Carrera=='' && $anio !='')
		{
			return $model->where('etapa',$Etapa)->where('anio',$anio)->findAll();
		}

		if($Etapa =='' && $Estado !='' && $Carrera!='' && $anio =='')
		{
			return $model->where('carrera',$Carrera)->where('estado',$Estado)->findAll();
		}

		if($Etapa =='' && $Estado !='' && $Carrera=='' && $anio !='')
		{
			return $model->where('carrera',$Carrera)->where('anio',$anio)->findAll();
		}

		if($Etapa =='' && $Estado =='' && $Carrera!='' && $anio !='')
		{
			return $model->where('carrera',$Carrera)->where('anio',$anio)->findAll();
		}

		if($Etapa !='' && $Estado !='' && $Carrera!='' && $anio =='')
		{
			return $model->where('etapa',$Etapa)->where('estado',$Estado)->where('carrera',$Carrera)->findAll();
		}

		if($Etapa !='' && $Estado !='' && $Carrera=='' && $anio !='')
		{
			return $model->where('etapa',$Etapa)->where('estado',$Estado)->where('anio',$anio)->findAll();
		}

		if($Etapa !='' && $Estado =='' && $Carrera !='' && $anio !='')
		{
			return $model->where('etapa',$Etapa)->where('carrera',$Carrera)->where('anio',$anio)->findAll();
		}

		if($Etapa =='' && $Estado !='' && $Carrera !='' && $anio !='')
		{
			return $model->where('estado',$Estado)->where('carrera',$Carrera)->where('anio',$anio)->findAll();
		}

		if($Etapa !='' && $Estado !='' && $Carrera!='' && $anio =='')
		{
			return $model->where('etapa',$Etapa)->where('estado',$Estado)->where('carrera',$Carrera)->where('anio',$anio)->findAll();
		}
	}

	public function guardarInscripcion()
	{
		if($this-> request -> getMethod() == 'post') {
            $rules = [
                'alumno' => 'required|min_length[2]|max_length[99]',
				'nombreEmpresa' => 'required|min_length[2]|max_length[99]',
				'nombreSupervisor' => 'required|min_length[2]|max_length[99]',
				'fechaInicio' => 'required',
				'fechaTermino' => 'required'
            ];
            $errors = [			// faltan errores por definir
				'alumno' => [
                    'required' => 'No se ha definido un estudiante'
                ],
            ];
            if(!$this->validate($rules, $errors)){
            } else {
				$model = new PracticaModel();
				$newsData =[
					'empresa' => $this->request->getVar('nombreEmpresa'),
					'supervisor' => $this->request->getVar('nombreSupervisor'),
					'fecha_inicio' => $this->request->getVar('fechaInicio'),
					'fecha_termino' => $this->request->getVar('fechaTermino'),
					'etapa' => '2',				// 2 = viendo datos empresa
				];
				$Estudiante = $this->request->getVar('alumno');
				$id = buscarPractica($Estudiante);
				$Model -> update($id, $newsData);
				echo true;
            }
        }
		echo false;
	}

	private function buscarPractica($Estudiante)
	{
		$model = new PracticaModel();
		$practica = $model->where('refAlumno',$Estudiante)->where('etapa', 1)->first();		// 1 = etapa envio de documentos
		$aux = $practica['id_practica'];
		return $aux;
	}

	public function getPracticas()
    {
        $model = new PracticaModel();
        $practica = $model->findAll();
		$arr = array();
        echo json_encode($practica);
    }

	public function servePracticaAlumno () {

		$this->PracticaModel = new PracticaModel();
		$result = $this->PracticaModel->getPracticaAlumno();

        if ($result){

            echo json_encode($result, JSON_UNESCAPED_UNICODE);

        } else {
            echo "error";
        }
	}

	public function servePracticaFiltrada () {
		$filtrosJson = $this->request->getVar('filtros');
		// $estado = $this->request->getVar('estadi');
		// $carrera = $this->request->getVar('carrera');
		// $anio = $this->request->getVar('anio');

		// echo $etapa."-".$estado."-".$carrera."-".$anio;

		echo $filtrosJson;

		// $this->PracticaModel = new PracticaModel();
		// $result = $this->PracticaModel->getPracticaAlumno();

        // if ($result){

        //     echo json_encode($result, JSON_UNESCAPED_UNICODE);

        // } else {
        //     echo "error";
        // }

	}

	public function ingresarPractica() {
		$id = $this->request->getVar('id_alumno');
		$np = $this->request->getVar('nropractica');
		$this->PracticaModel = new PracticaModel();
		if($this->PracticaModel->newPracticaAlumno($id, $np)) {
			echo true;
		} else {
			echo false;
		}
	}

	public function getEstadoPracticaAlumno() {
		$id = $this->request->getVar('id_alumno');
		$numero = $this->request->getVar('numero');
		$this->PracticaModel = new PracticaModel();
		$result = $this->PracticaModel->getEstadoAlumno($id, $numero);
		if($result) {
			echo json_encode($result);
		} else {
			echo "0";
		}
	}

	public function aceptarSolicitud() {
		// Update de etapa y estado práctica
		$id_alumno = $this->request->getVar('idalumno');
		$numero = $this->request->getVar('numero');
		$this->PracticaModel = new PracticaModel();
		$result = $this->PracticaModel->aceptarSolicitud($numero, $id_alumno);
		echo "id_alumno: ".$id_alumno;
		echo "numero: ".$numero."\n";
		if($result) {
			// Geneneración historial
			$practica = $this->PracticaModel->getPracticaAlumnoId($id_alumno);
			foreach ($practica as $row)
			{
				$etapa = $row->etapa;
				$numPractica = $row->numero;
			}
			$comentario = 'Etapa 1 (Solicitud) del alumno aceptada, pasa a etapa 2 (inscripción)';
			$this->generarHistorial($id_alumno, -1, $etapa, $numPractica, $comentario);
			//$refAlumno, $refAdmin, $etapa, $practica, $comentario

			// Creación de instancia documento práctica de alumno
			$this->InstDocumentoModel = new InstDocumentoModel();
			$result_Inst = $this->InstDocumentoModel->crearInstanciasAlumno($numero, $id_alumno, $this->request->getVar('documentos'));

			// Envio correo
			$this -> AlumnoModel = new AlumnoModel();
			$resultAlumno = $this->AlumnoModel->getCorreoNombreApellido($id_alumno);
			$correo = "";
			$nombre = "";
			foreach ($resultAlumno as $row)
			{
				$nombre = $row->nombre;
				$correo = $row->correo_ins;
			}
			$date = date('d/m/Y');
			$this->sendEmailSolicitudAceptada($correo, $nombre, $date);

		} else {
			// AQUÍ ENTRA SI NO SE ESCRIBIÓ CORRECTAMENTE LA BD
		}
	}

	public function rechazarSolicitud() {
		// Update de etapa y estado práctica
		$id_alumno = $this->request->getVar('idalumno');
		$numero = $this->request->getVar('numero');
		$this->PracticaModel = new PracticaModel();
		$result = $this->PracticaModel->recahzarSolicitud($id_alumno);

		if($result) {
			//Generación historial
			$practica = $this->PracticaModel->getPracticaAlumnoId($id_alumno);
			foreach ($practica as $row)
			{
				$etapa = $row->etapa;
				$numPractica = $row->numero;
			}
			$comentario = 'Etapa 1 (Solicitud) rechazada';
			$this->generarHistorial($id_alumno, -1, $etapa, $numPractica, $comentario);
			//$refAlumno, $refAdmin, $etapa, $practica, $comentario

			// Envio correo
			$this -> AlumnoModel = new AlumnoModel();
			$resultAlumno = $this->AlumnoModel->getCorreoNombreApellido($id_alumno);
			$correo = "";
			$nombre = "";
			foreach ($resultAlumno as $row)
			{
				$nombre = $row->nombre;
				$correo = $row->correo_ins;
			}
			$date = date('d/m/Y');
			$this->sendEmailSolicitudRechazada($correo, $nombre, $date);
		} else {
			echo 0;
		}


	}

	public function inscribirInfo() {
		// echo "ENTRO INSCRIBIR";
		$id_alumno = $this->request->getVar('id_alumno');
		$nro_practica = $this->request->getVar('nropractica');
		$empresa = $this->request->getVar('empresa');
		$supervisor = $this->request->getVar('supervisor');
		$fch_inicio = $this->request->getVar('fch_inicio');
		$fch_termino = $this->request->getVar('fch_termino');
		$rut_empresa = $this->request->getVar('rut_empresa');
		$email_supervisor = $this->request->getVar('correo_supervisor');
		$tel_supervisor = $this->request->getVar('tel_supervisor');
		$region_empresa = $this->request->getVar('region_empresa');
		$zona_empresa = $this->request->getVar('zona_empresa');
		$tel_emer = $this->request->getVar('tel_emer');
		$nombre_emer = $this->request->getVar('nombre_emer');
		$this -> PracticaModel = new PracticaModel();
		$result = $this->PracticaModel->inscribir($nro_practica,$id_alumno, $empresa, $supervisor, $fch_inicio, $fch_termino,$rut_empresa, $email_supervisor, $tel_supervisor,$region_empresa,$zona_empresa,$tel_emer,$nombre_emer);
    if($result) {
			echo 1;
		} else {
			echo 0;
		}
	}

	public function getDatosInscripcionAlumno() {
		$id = $this->request->getVar('id_alumno');
		//$numero = $this->request->getVar('numero');
		$this->PracticaModel = new PracticaModel();
		$result = $this->PracticaModel->getDatosInscripcionAlumno($id);
		if($result) {
			echo json_encode($result);
		} else {
			echo false;
		}
	}

	public function aceptarInscripcion() {
		$id_alumno = $this->request->getVar('id_alumno');
		$numero = $this->request->getVar('numero');
		$this->PracticaModel = new PracticaModel();
		$result = $this->PracticaModel->aceptarPractica($id_alumno);
		if($result) {
			//Generación historial
			$practica = $this->PracticaModel->getPracticaAlumnoId($id_alumno);
			foreach ($practica as $row)
			{
				$etapa = $row->etapa;
				$numPractica = $row->numero;
			}
			$comentario = 'Etapa 2 (Incripción) del alumno aceptada, pasa a etapa 3 (Cursando)';
			$this->generarHistorial($id_alumno, -1, $etapa, $numPractica, $comentario);
			//$refAlumno, $refAdmin, $etapa, $practica, $comentario
			// Envio correo
			$this -> AlumnoModel = new AlumnoModel();
			$resultAlumno = $this->AlumnoModel->getCorreoNombreApellido($id_alumno);
			$correo = "";
			$nombre = "";
			foreach ($resultAlumno as $row)
			{
				$nombre = $row->nombre;
				$correo = $row->correo_ins;
			}
			$date = date('d/m/Y');
			$this->sendEmailInscripcionAceptada($correo, $nombre, $date);
		} else {
			echo 0;
		}
	}

	public function pasarCursando() {
		$id_alumno = $this->request->getVar('id_alumno');
		//$numero = $this->request->getVar('numero');
		$this->PracticaModel = new PracticaModel();
		$result = $this->PracticaModel->pasarCursando($id_alumno);
		if($result) {
			echo 1;
		} else {
			echo 0;
		}
	}

	public function pasarEstadoEvaluar() {
		$id_alumno = $this->request->getVar('id_alumno');
		//$numero = $this->request->getVar('numero');
		$this->PracticaModel = new PracticaModel();
		$result = $this->PracticaModel->pasarEstadoEvaluar($id_alumno);
		if($result) {
			echo 1;
		} else {
			echo 0;
		}
	}

	public function getEvaluacionEmpresa() {
		$id_alumno = $this->request->getVar('id_alumno');
		$numero = $this->request->getVar('numero');
		$this->PracticaModel = new PracticaModel();
		$result = $this->PracticaModel->getEvaluacionEmpresa($id_alumno, $numero);
		if($result) {
			echo json_encode($result);
		} else {
			echo 0;
		}
	}

	public function evaluarPractica() {
		$id_alumno = $this->request->getVar('id_alumno');
		$nota = $this->request->getVar('nota');
		$this->PracticaModel = new PracticaModel();
		$result = $this->PracticaModel->evaluarPractica($id_alumno, $nota);
		if($result) {
			echo 1;
		} else {
			echo 0;
		}
	}
	public function practicaInactiva() {
		$id_alumno = $this->request->getVar('id_alumno');
		$this->PracticaModel = new PracticaModel();
		$result = $this->PracticaModel->practicaInactiva($id_alumno);
		if($result) {
			echo 1;
		} else {
			echo 0;
		}
	}
	public function getNumeroSiguientePractica() {
		$id_alumno = $this->request->getVar('id_alumno');
		$this->PracticaModel = new PracticaModel();
		$result = $this->PracticaModel->getNumeroSiguientePractica($id_alumno);
		if($result) {
			echo json_encode($result);
		} else {
			echo 0;
		}
	}

	public function getEvaluacionPracticaUni() {
		$id_alumno = $this->request->getVar('id_alumno');
		$numero = $this->request->getVar('numero');
		$this->PracticaModel = new PracticaModel();
		$result = $this->PracticaModel->getEvaluacionPracticaUni($id_alumno, $numero);
		if($result) {
			echo json_encode($result);
		} else {
			echo 0;
		}
	}

	public function getEstadoPracticaActiva() {
		$id = $this->request->getVar('id_alumno');
		$this->PracticaModel = new PracticaModel();
		$result = $this->PracticaModel->getEstadoPracticaActiva($id);
		if($result) {
			echo json_encode($result);
		} else {
			echo "0";
		}
	}
	public function getSolicitud() {
		$id = $this->request->getVar('id_alumno');
		$numero = $this->request->getVar('nropractica');
		$this->PracticaModel = new PracticaModel();
		$result = $this->PracticaModel->getSolicitud($id,$numero);
    // echo json_encode($result);
		if($result) {
			echo 1;
		} else {
			echo 0;
		}
	}

	/*
	Función por implement
	public function getEvaluacion() {
		$id = $this->request->getVar('id_alumno');
		$this->PracticaModel = new PracticaModel();
		$result = $this->PracticaModel->getEstadoPracticaActiva($id);
		if($result) {
			echo json_encode($result);
		} else {
			echo "0";
		}
	}
	*/

	public function getFechas(){
		$id = $this->request->getVar('id_alumno');
		$this->PracticaModel = new PracticaModel();
		$result = $this->PracticaModel->getFechas($id);
		if($result) {
			echo json_encode($result);
		} else {
			echo 0;
		}
	}

	private function sendEmailSolicitudAlumno($correo, $nombre, $fecha){
        $email = \Config\Services::email();

        $email->setFrom('soportecentrodepractica@gmail.com', 'Equipo de centro de práctica');
        $email->setTo($correo);
        $email->setSubject('Estado solicitud de práctica');
        $email->setMessage('
                <p>¡Estimad@ <b>'.$nombre.'!</b>, su solicitud de práctica ha sido enviada y esta proxima a ser evaluada :).</p>
                <p>Estado solicitud: Enviada el '.$fecha.'</p>
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

	private function sendEmailSolicitudUser($correo, $nombre, $matricula, $fecha){
        $email = \Config\Services::email();

        $email->setFrom('soportecentrodepractica@gmail.com', 'Equipo de centro de práctica');
        $email->setTo($correo);
        $email->setSubject('Nueva solicitud de práctica');
        $email->setMessage('
                <p>Hay una nueva solicitud de práctica de.</p>
				<p>Nombre: '.$nombre.'</p>
				<p>Matrícula: '.$matricula.'</p>
                <p>Estado solicitud: Enviada el '.$fecha.'</p>
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

	private function sendEmailSolicitudAceptada($correo, $nombre, $fecha){
        $email = \Config\Services::email();

        $email->setFrom('soportecentrodepractica@gmail.com', 'Equipo de centro de práctica');
        $email->setTo($correo);
        $email->setSubject('Solicitud aceptada');
        $email->setMessage('
                <p>¡Estimad@ <b>'.$nombre.'!</b>, tu solicitud de práctica ha sido aceptada.</p>
				<p>Para continuar con el proceso debes ingresar al portal de centro de practicas y completar la documentacón necesaria.</p>
                <p>Estado solicitud: Aceptada el '.$fecha.'</p>
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

	private function sendEmailInscripcionAceptada($correo, $nombre, $fecha){
        $email = \Config\Services::email();

        $email->setFrom('soportecentrodepractica@gmail.com', 'Equipo de centro de práctica');
        $email->setTo($correo);
        $email->setSubject('Inscripción aceptada');
        $email->setMessage('
                <p>¡Estimad@ <b>'.$nombre.'!</b>, tu inscripción de práctica ha sido aceptada.</p>
				<p>Ya puedes comenzar tu práctica!.</p>
                <p>Estado inscripción: Aceptada el '.$fecha.'</p>
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

	private function sendEmailSolicitudRechazada($correo, $nombre, $fecha){
        $email = \Config\Services::email();

        $email->setFrom('soportecentrodepractica@gmail.com', 'Equipo de centro de práctica');
        $email->setTo($correo);
        $email->setSubject('Solicitud rechazada');
        $email->setMessage('
                <p>¡Estimad@ <b>'.$nombre.'!</b>, tu solicitud de práctica ha sido rechazada.</p>
				<p>Para saber el motivo debes ingresar al portal de centro de practicas.</p>
                <p>Estado solicitud: Rechazada el '.$fecha.'</p>
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

	public function getCantidadPracticasCarreras() {
		$arr = array();
		$arr[] = 4;
		$arr[] = 2;
		$arr[] = 3;
		$arr[] = 4;
		$arr[] = 4;
		$arr[] = 5;
		echo json_encode($arr);
	}

	public function generarHistorial($refAlumno, $refAdmin, $etapa, $practica, $comentario){
		$model = new HistorialModel();

		$newsData =[
			'comentario' => $comentario
		];
		if($etapa != -1){
			$newsData +=[
				'etapa' => $etapa
			];
		}
		if($refAlumno != -1){
			$newsData +=[
				'refAlumno' => $refAlumno
			];
		}
		if($refAdmin != -1)
		{
			$newsData +=[
				'refAdmin' => $refAdmin
			];
		}
		if($practica != -1)
		{
			$newsData +=[
				'practica' => $practica,
			];
		}
		$model ->save($newsData);

	}

}

