<?php

namespace App\Controllers;
use App\Models\PracticaModel as PracticaModel;
use App\Models\AlumnoModel as AlumnoModel;
use App\Models\UserModel as UserModel;
use App\Models\HistorialModel as HistorialModel;
use App\Models\NotificacionModel as NotificacionModel;
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
  public function getInfoAlumnoPractica(){
    $id = $this->request->getVar('id_alumno');
		$np = $this->request->getVar('nropractica');
    $this->PracticaModel = new PracticaModel();
		$result = $this->PracticaModel->getInfoAlumnoPractica($id,$np);
    if ($result){
      echo json_encode($result, JSON_UNESCAPED_UNICODE);
    } else {
        echo 0;
    }
  }  
  public function getInfoPracticaById(){
    $id = $this->request->getVar('id_practica');
    $this->PracticaModel = new PracticaModel();
		$result = $this->PracticaModel->getInfoPracticaById($id);
    if ($result){
      echo json_encode($result, JSON_UNESCAPED_UNICODE);
    } else {
        echo 0;
    }
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

	public function servePracticaAlumnoInactiva() {
		$this->PracticaModel = new PracticaModel();
		$result = $this->PracticaModel->servePracticaAlumnoInactiva();

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

	public function rechazarPractica() {
		$id = $this->request->getVar('id_alumno');
		$np = $this->request->getVar('nropractica');
		$this->PracticaModel = new PracticaModel();
		if($this->PracticaModel->recahzarSolicitud($id)) {
			echo true;

			//Generar historial
			$practica = $this->PracticaModel->getPracticaActivaAlumnoId($id);
			foreach ($practica as $row)
			{
				$etapa = $row->etapa;
				$numPractica = $row->numero;
				$idPractica = $row->id_practica;
			}
			$comentario = 'Practica rechazada';
			$this->generarHistorial($id, -1, $etapa, $numPractica, $comentario, "", $idPractica);
			//$refAlumno, $refAdmin, $etapa, $practica, $comentario
			$id_historial = $this->HistorialModel->getHistorialId($idPractica);

		} else {
			echo false;
		}
	}

	public function rechazarPracticaCorreo(){
		// Envio correo
		$id_alumno = $this->request->getVar('id_alumno');
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
		$this->sendEmailRechazarPractica($correo, $nombre, $date);
  }
  public function denegarPractica(){
    $id_alumno = $this->request->getVar('id_alumno');
    $this->PracticaModel = new PracticaModel();
    $result = $this->PracticaModel->denegarPractica($id_alumno);
    if($result){
      echo 1;
    }
    else{
      echo 0;
    }
    
  }
	public function ingresarPractica() {
		$id = $this->request->getVar('id_alumno');
		$np = $this->request->getVar('nropractica');
		$this->PracticaModel = new PracticaModel();
		if($this->PracticaModel->newPracticaAlumno($id, $np)) {
			

			//Generar historial
			$practica = $this->PracticaModel->getPracticaActivaAlumnoId($id);
			foreach ($practica as $row)
			{
				$etapa = $row->etapa;
				$numPractica = $row->numero;
				$idPractica = $row->id_practica;
			}
			$comentario = 'Alumno manda solicitud (etapa 1)';
			$this->generarHistorial($id, -1, $etapa, $numPractica, $comentario, "", $idPractica);
			//$refAlumno, $refAdmin, $etapa, $practica, $comentario
			$this->HistorialModel = new HistorialModel();
			$historial = $this->HistorialModel->getHistorialId($idPractica);
			foreach ($historial as $row)
			{
				$id_historial = $row->id_historial;
			}
			echo $id_historial;

		} else {
			echo false;
		}
	}

	public function ingresarPracticaCorreo(){
		//Generar correo alumno
		$id = $this->request->getVar('id_alumno');
		$id_historial = $this->request->getVar('dato');
		$this -> AlumnoModel = new AlumnoModel();
		$resultAlumno = $this->AlumnoModel->getCorreoNombreApellido($id);
		$correo = "";
		$nombre = "";
		foreach ($resultAlumno as $row)
		{
			$nombre = $row->nombre;
			$correo = $row->correo_ins;
			$carrera = $row->refCarrera;
			$matricula = $row->matricula;
		}
		$date = date('d/m/Y');
		$this->sendEmailSolicitudAlumno($correo, $nombre, $date);
		//$correo, $nombre, $fecha

		//Generar correo admin
		$this -> UserModel = new UserModel();
		$this -> NotificacionModel = new NotificacionModel();
		$resultUser = $this->UserModel->getUsersCarrera($carrera);
		$correoUser = "";
		foreach ($resultUser as $row)
		{
			$correoUser = $row->email;
			$idUser = $row->id_usuario;
			$tipo = $row->tipo;
			$this->sendEmailSolicitudUser($correoUser, $nombre, $matricula, $date);
			//$correo, $nombre, $matricula, $fecha
			//Generar notificación admin
			$this->NotificacionModel->newNotificacion($idUser, $id_historial, $tipo);
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
			$practica = $this->PracticaModel->getPracticaActivaAlumnoId($id_alumno);
			foreach ($practica as $row)
			{
				$etapa = $row->etapa;
				$numPractica = $row->numero;
				$idPractica = $row->id_practica;
			}
			$comentario = 'Etapa 1 (Solicitud) del alumno aceptada, pasa a etapa 2 (inscripción)';
			$this->generarHistorial($id_alumno, -1, $etapa, $numPractica, $comentario, "", $idPractica);
			//$refAlumno, $refAdmin, $etapa, $practica, $comentario

			// Creación de instancia documento práctica de alumno
			$this->InstDocumentoModel = new InstDocumentoModel();
			$result_Inst = $this->InstDocumentoModel->crearInstanciasAlumno($numero, $id_alumno, $this->request->getVar('documentos'));

		} else {
			// AQUÍ ENTRA SI NO SE ESCRIBIÓ CORRECTAMENTE LA BD
		}
	}

	public function aceptarSolicitudCorreo(){
			// Envio correo
			$id_alumno = $this->request->getVar('idalumno');
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
	}

	public function handleRechazo(){
		
		$id_alumno = $this->request->getVar('idalumno');
		$numero = $this->request->getVar('numero');
		$etapa = $this->request->getVar('etapa');
		$retroalimentacion = $this->request->getVar('retroalimentacion');
		$this->PracticaModel = new PracticaModel();
		$practica = $this->PracticaModel->getPracticaActivaAlumnoId($id_alumno);
		foreach ($practica as $row)
		{
			$idPractica = $row->id_practica;
		}
		
		if ($etapa=='Solicitud'){			
			$result = $this->PracticaModel->recahzarSolicitud($id_alumno);
			if($result) {
				echo 1;
				//Generación historial
				$comentario = 'Etapa de Solicitud rechazada';
				$this->generarHistorial($id_alumno, -1, $etapa, $numero, $comentario, $retroalimentacion, $idPractica);
				//$refAlumno, $refAdmin, $etapa, $practica, $comentario
			} else {
				echo 0;
			}
		}
		else {
			$result = $this->PracticaModel->RechazarEtapa($id_alumno,$etapa);
			if($result) {
				echo 1;
				$comentario = "Etapa de ".$etapa." rechazada";
		    $this->generarHistorial($id_alumno, -1, $etapa, $numero, $comentario, $retroalimentacion, $idPractica);
			} else {
				echo 0;
			}

		}
    
	}

	public function handlerRechazarCorreo(){
		$id_alumno = $this->request->getVar('idalumno');
		$etapa = $this->request->getVar('etapa');
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

		if($etapa == 'Solicitud'){
			$comentario = 'tu solicitud de práctica ha sido rechazada';
			$encabezado = 'Solicitud de practica rechazada';
			$this->sendEmailRechazada($correo, $nombre, $date,$encabezado ,$comentario);
		}
		else if($etapa == 'Inscripción'){
			$comentario = 'tu inscripción de práctica ha sido rechazada';
			$encabezado = 'Inscripción de practica rechazada';
			$this->sendEmailRechazada($correo, $nombre, $date,$encabezado ,$comentario);
		}
		else if($etapa == 'Evaluación'){
			$comentario = 'tu evaluación de práctica ha sido rechazada';
			$encabezado = 'Evaluación de practica rechazada';
			$this->sendEmailRechazada($correo, $nombre, $date,$encabezado ,$comentario);
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
			// Geneneración historial
			$practica = $this->PracticaModel->getPracticaActivaAlumnoId($id_alumno);
			foreach ($practica as $row)
			{
				$etapa = $row->etapa;
				$numPractica = $row->numero;
				$idPractica = $row->id_practica;
			}
			$comentario = 'Alumno registra información etapa inscripción (etapa 2)';
			$this->generarHistorial($id_alumno, -1, $etapa, $numPractica, $comentario, "", $idPractica);
			//$refAlumno, $refAdmin, $etapa, $practica, $comentario
			
		} else {
			echo 0;
		}
	}

	public function inscribirInfoCorreo(){
		//Generar correo alumno
		$id = $this->request->getVar('id_alumno');
		$this -> AlumnoModel = new AlumnoModel();
		$resultAlumno = $this->AlumnoModel->getCorreoNombreApellido($id);
		$correo = "";
		$nombre = "";
		foreach ($resultAlumno as $row)
		{
			$nombre = $row->nombre;
			$correo = $row->correo_ins;
			$carrera = $row->refCarrera;
			$matricula = $row->matricula;
		}
		$date = date('d/m/Y');
		$this->sendEmailInscripcionAlumno($correo, $nombre, $date);
		//$correo, $nombre, $fecha

		//Generar correo admin
		$this -> UserModel = new UserModel();
		$resultUser = $this->UserModel->getUsersCarrera($carrera);
		$correoUser = "";
		foreach ($resultUser as $row)
		{
			$correoUser = $row->email;
			$this->sendEmailInscripcionUser($correoUser, $nombre, $matricula, $date);
			//$correo, $nombre, $matricula, $fecha
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
			echo 1;
			//Generación historial
			$practica = $this->PracticaModel->getPracticaActivaAlumnoId($id_alumno);
			foreach ($practica as $row)
			{
				$etapa = $row->etapa;
				$numPractica = $row->numero;
				$idPractica = $row->id_practica;
			}
			$comentario = 'Etapa 2 (Incripción) del alumno aceptada, pasa a etapa 3 (Cursando)';
			$this->generarHistorial($id_alumno, -1, $etapa, $numPractica, $comentario, "", $idPractica);
			//$refAlumno, $refAdmin, $etapa, $practica, $comentario

		} else {
			echo 0;
		}
	}

	public function aceptarInscripcionCorreo(){
			// Envio correo
			$id_alumno = $this->request->getVar('idAlumno');
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
		$this->PracticaModel = new PracticaModel();
		$this->AlumnoModel = new AlumnoModel();	
		$alumno = $this->AlumnoModel->getNombreAlumno($id_alumno);
		foreach ($alumno as $row)
		{
			$nombreAlumno = $row->nombre;
		}
		$practica = $this->PracticaModel->getPracticaActivaAlumnoId($id_alumno);
		foreach ($practica as $row)
		{
			$empresa = $row->empresa;
			$nombreSup = $row->supervisor;
			$idPractica = $row->id_practica;
			$correoSup = $row->email_supervisor;
		}
		//$numero = $this->request->getVar('numero');
		$result = $this->PracticaModel->pasarEstadoEvaluar($id_alumno);
		/* Enviar el correo al supervisor */
		$ruta = "http://localhost:3000/evaluar"."/".$nombreAlumno."/".$empresa."/".$idPractica;
		

		/* Fin correo supervisor */
		if($result) {
			$this->sendEmailEvaluacionSupervisor($correoSup, $nombreSup, $ruta);
			echo 1;
			//Generación historial
			$practica = $this->PracticaModel->getPracticaActivaAlumnoId($id_alumno);
			foreach ($practica as $row)
			{
				$etapa = $row->etapa;
				$numPractica = $row->numero;
				$idPractica = $row->id_practica;
			}
			$comentario = 'Etapa 3 (Cursando) del alumno aceptada, pasa a etapa 4 (Evaluación)';
			$this->generarHistorial($id_alumno, -1, $etapa, $numPractica, $comentario, "", $idPractica);
			//$refAlumno, $refAdmin, $etapa, $practica, $comentario
		} else {
			echo 0;
		}
	}

	public function pasarEstadoEvaluarCorreo(){
		$id_alumno = $this->request->getVar('idAlumno');
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
		$this->sendEmailEvaluacionAlumno($correo, $nombre, $date);
	}

	public function getEvaluacionEmpresa() {
		$id_alumno = $this->request->getVar('id_alumno');
		$numero = $this->request->getVar('numero');
    // echo "numero recibido empresa: ".$numero. " ";
		$this->PracticaModel = new PracticaModel();
		$result = $this->PracticaModel->getEvaluacionEmpresa($id_alumno, $numero);
		if($result) {
			echo json_encode($result);
		} else {
			echo -1;
		}
	}

  public function getEvaluacionPracticaUni() {
		$id_alumno = $this->request->getVar('id_alumno');
		$numero = $this->request->getVar('numero');
    // echo "numero recibido empresa: ".$numero. " ";
    
		$this->PracticaModel = new PracticaModel();
		$result = $this->PracticaModel->getEvaluacionPracticaUni($id_alumno, $numero);
		if($result) {
			echo json_encode($result);
		} else {
			echo -1;
		}
	}


	public function evaluarPractica() {
		$id_alumno = $this->request->getVar('id_alumno');
		$nota = $this->request->getVar('nota');
		$this->PracticaModel = new PracticaModel();
		$result = $this->PracticaModel->evaluarPractica($id_alumno, $nota);
		if($result) {
			echo 0;
			//Generación historial
			$practica = $this->PracticaModel->getPracticaActivaAlumnoId($id_alumno);
			foreach ($practica as $row)
			{
				$etapa = $row->etapa;
				$numPractica = $row->numero;
				$idPractica = $row->id_practica;
			}
			$comentario = 'Etapa 3 (Cursando) del alumno aceptada, pasa a etapa 4 (Evaluación)';
			$this->generarHistorial($id_alumno, -1, $etapa, $numPractica, $comentario, "", $idPractica);
			//$refAlumno, $refAdmin, $etapa, $practica, $comentario
		} else {
			echo 1;
		}
	}

	public function evaluarPracticaCorreo(){
		// Envio correo
		$id_alumno = $this->request->getVar('id_alumno');
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
		$this->sendEvaluarPracticaCorreo($correo, $nombre, $date);
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
		if($result) {
			echo json_encode($result);
		} else {
			echo 0;
		}
	}

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

	public function getPracticasCursando(){
		$this->PracticaModel = new PracticaModel();
		$result = $this->PracticaModel->getPracticasCursando();
		if($result) {
			echo json_encode($result);
		} else {
			echo 0;
		}
	}

	public function getRetroalimentacion(){
		$refAlumno = $this->request->getVar('id_alumno');
		$practica = $this->request->getVar('nropractica');
    $this->HistorialModel = new HistorialModel();
		$result = $this->HistorialModel->getRetroalimentacion($refAlumno, $practica);
		if($result) {
			echo json_encode($result);
		} else {
			echo 0;
		}
	}
	public function getHistorialPractica(){
		$id_alumno = $this->request->getVar('id_alumno');
		$numero = $this->request->getVar('nropractica');
    // echo "recibido: ".$id_alumno. " ".$numero;
    $this->HistorialModel = new HistorialModel();
		$result = $this->HistorialModel->getHistorialPractica($id_alumno, $numero);
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

	private function sendEmailInscripcionAlumno($correo, $nombre, $date){
        $email = \Config\Services::email();

        $email->setFrom('soportecentrodepractica@gmail.com', 'Equipo de centro de práctica');
        $email->setTo($correo);
        $email->setSubject('Estado inscripción de práctica');
        $email->setMessage('
                <p>¡Estimad@ <b>'.$nombre.'!</b>, su inscrpción de práctica ha sido enviada y esta proxima a ser evaluada :).</p>
                <p>Estado inscrición: Enviada el '.$fecha.'</p>
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

	private function sendEmailInscripcionUser($correo, $nombre, $matricula, $fecha){
        $email = \Config\Services::email();

        $email->setFrom('soportecentrodepractica@gmail.com', 'Equipo de centro de práctica');
        $email->setTo($correo);
        $email->setSubject('Nueva inscripción de práctica');
        $email->setMessage('
                <p>Hay una nueva inscripción de práctica de.</p>
				<p>Nombre: '.$nombre.'</p>
				<p>Matrícula: '.$matricula.'</p>
                <p>Estado inscripción: Enviada el '.$fecha.'</p>
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

	private function sendEmailRechazada($correo, $nombre, $fecha, $etapa, $comentario){
        $email = \Config\Services::email();
		echo "Corre: [".$correo."]";
        $email->setFrom('soportecentrodepractica@gmail.com', 'Equipo de centro de práctica');
        $email->setTo($correo);
        $email->setSubject(''.$etapa.'');
        $email->setMessage('
                <p>¡Estimad@ <b>'.$nombre.'</b>, '.$comentario.'.</p>
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

	private function sendEmailEvaluacionAlumno($correo, $nombre, $fecha){
		$email = \Config\Services::email();

        $email->setFrom('soportecentrodepractica@gmail.com', 'Equipo de centro de práctica');
        $email->setTo($correo);
        $email->setSubject('Tu práctica está siendo evaluada');
        $email->setMessage('
                <p>¡Estimad@ <b>'.$nombre.'!</b>, tu práctica paso a la etapa de evaluación.</p>
				<p>Serás notificado cuando la evualuación este completa.</p>
                <p>Estado evaluación: en evaluación desde '.$fecha.'</p>
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

	private function sendEvaluarPracticaCorreo($correo, $nombre, $fecha){
		$email = \Config\Services::email();

        $email->setFrom('soportecentrodepractica@gmail.com', 'Equipo de centro de práctica');
        $email->setTo($correo);
        $email->setSubject('Tu práctica ha sido evaluada');
        $email->setMessage('
                <p>¡Estimad@ <b>'.$nombre.'!</b>, tu práctica ha sido evaluada.</p>
				<p>Dirigete al portal de centro de practicas para revisar tu evaluación.</p>
                <p>Estado evaluación: evaluada el '.$fecha.'</p>
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

	private function sendEmailRechazarPractica($correo, $nombre, $date){
		$email = \Config\Services::email();

        $email->setFrom('soportecentrodepractica@gmail.com', 'Equipo de centro de práctica');
        $email->setTo($correo);
        $email->setSubject('Tu práctica ha sido rechazada');
        $email->setMessage('
                <p>¡Estimad@ <b>'.$nombre.'!</b>, tu práctica ha sido rechazada.</p>
				<p>Dirigete al portal de centro de practicas para ver la razón.</p>
                <p>Estado evaluación: evaluada el '.$fecha.'</p>
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

	public function crearUrl(){
		// console.log('Texto: ', 'Juanito Perez/JamaicaSap/152');
		// var ciphertext = CryptoJS.AES.encrypt('Juanito Perez/JamaicaSap/152', 'secret key 123').toString();
		// console.log('Encriptado: ', ciphertext); 
	}

	private function sendEmailEvaluacionSupervisor($correo, $nombre, $fecha){
		$email = \Config\Services::email();

        $email->setFrom('soportecentrodepractica@gmail.com', 'Equipo de centro de práctica');
        $email->setTo($correo);
        $email->setSubject('Evaluación práctica');
        $email->setMessage('
                <p>¡Estimad@ <b>'.$nombre.'!</b>, le solicitamos por favor evaluar a nuestro practicante.</p>
				<p>Dirigete al portal de centro de practicas para ver la razón.</p>
                <p>Estado evaluación: evaluada el '.$fecha.'</p>
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

	public function generarHistorial($refAlumno, $refAdmin, $etapa, $practica, $comentario, $retroalimentacion, $idPractica){
		$model = new HistorialModel();

		$newsData =[
			'comentario' => $comentario,
			'retroalimentacion' => $retroalimentacion
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
		if($idPractica != -1)
		{
			$newsData +=[
				'refPractica' => $idPractica,
			];
		}

		$model ->save($newsData);

	}

	public function setNotaSupervisor(){
		$idPractica = $this->request->getVar('idPractica');
		$nota = $this->request->getVar('nota');
		$model = new PracticaModel();
		if($model->setEvaluacionEmpresa($idPractica, $nota)){
			echo 1;
		}
		else{
			echo 0;
		}
		
		//agregar para que envie los correos a admin y alumno 
	}

}