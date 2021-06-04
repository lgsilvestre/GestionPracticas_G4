<?php

namespace App\Controllers;
use App\Models\PracticaModel as PracticanModel;

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
            $rules = [
                'estudiante' => 'required|min_length[2]|max_length[99]',
				'nropractica' => 'required|integer',
				'estado' => 'required',		//faltan reglass por agregar
				'numero' => 'required|integer'


            ];
            $errors = [			// faltan errores por definir
				'estudiante' => [
                    'required' => 'No se ha definido un estudiante'
                ],
            ];
            if(!$this->validate($rules, $errors)){
                $data['validation'] = $this->validator;
            } else {
				//Primero hay que validar que no 
				$Estudiante => $this->request->getVar('estudiante');
				$Nropractica => $this->request->getVar('nropractica');
				$Estado => $this->request->getVar('estado');

				$resutaldo = $this->validarPractica($Estudiante, $Nropractica, $Estado, $Numero);

				echo json_encode($resutaldo);
            }
        }
	}

	private function validarPractica($Estudiante, $Nropractica, $Estado, $Numero)
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
		$newsData =[
			'refAlumno' => $Estudiante,
			'etapa' => $Estado,
			'estado' => 0,
			'numero' => $Numero,
		];
		$model ->save($newsData);
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
				$Estudiante => $this->request->getVar('estudiante');
				$Nropractica => $this->request->getVar('nropractica');

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

    public function filtos(){
        helper(['form']);

        if($this-> request -> getMethod() == 'post') {
            $rules = [
                'EtapaFilter' => 'min_length[2]|max_length[20]',
                'EstadoFilter' => 'min_length[2]|max_length[20]',
                'CarreraFilter' => 'min_length[2]|max_length[20]',
				'anioFilter' => 'min_length[2]|max_length[20]',
            ];
            $errors = [
            ];
            if(!$this->validate($rules, $errors)){
                $data['validation'] = $this->validator;
            } else {
				$Etapa => $this->request->getVar('EtapaFilter');
				$Estado => $this->request->getVar('EstadoFilter');
				$Carrera => $this->request->getVar('CarreraFilter');
				$anio => $this->request->getVar('anioFilter');

				$resutaldo = $this->resultadoFiltros($Etapa, $Estado, $Carrera, $anio);
				echo json_encode($resutaldo);
            }
        }
    }

	private function resultadoFiltros($Etapa, $Estado, $Carrera, $anio)
	{
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
			return $model->where('etapa',$Etapa)->where->('estado',$Estado)->findAll();
		}
		if($Etapa !='' && $Estado =='' && $Carrera!='' && $anio =='')
		{
			return $model->where('etapa',$Etapa)->where->('carrera',$Carrera)->findAll();
		}
		if($Etapa !='' && $Estado =='' && $Carrera=='' && $anio !='')
		{
			return $model->where('etapa',$Etapa)->where->('anio',$anio)->findAll();
		}

		if($Etapa =='' && $Estado !='' && $Carrera!='' && $anio =='')
		{
			return $model->where('carrera',$Carrera)->where->('estado',$Estado)->findAll();
		}

		if($Etapa =='' && $Estado !='' && $Carrera=='' && $anio !='')
		{
			return $model->where('carrera',$Carrera)->where->('anio',$anio)->findAll();
		}

		if($Etapa =='' && $Estado =='' && $Carrera!='' && $anio !='')
		{
			return $model->where('carrera',$Carrera)->where->('anio',$anio)->findAll();
		}

		if($Etapa !='' && $Estado !='' && $Carrera!='' && $anio =='')
		{
			return $model->where('etapa',$Etapa)->where->('estado',$Estado)->where('carrera',$Carrera)->findAll();
		}

		if($Etapa !='' && $Estado !='' && $Carrera=='' && $anio !='')
		{
			return $model->where('etapa',$Etapa)->where->('estado',$Estado)->where('anio',$anio)->findAll();
		}

		if($Etapa !='' && $Estado =='' && $Carrera !='' && $anio !='')
		{
			return $model->where('etapa',$Etapa)->where->('carrera',$Carrera)->where('anio',$anio)->findAll();
		}

		if($Etapa =='' && $Estado !='' && $Carrera !='' && $anio !='')
		{
			return $model->where('estado',$Estado)->where->('carrera',$Carrera)->where('anio',$anio)->findAll();
		}

		if($Etapa !='' && $Estado !='' && $Carrera!='' && $anio =='')
		{
			return $model->where('etapa',$Etapa)->where->('estado',$Estado)->where('carrera',$Carrera)->where('anio',$anio)->findAll();
		}
	}

	public function guardarInscripcion()
	{
		if($this-> request -> getMethod() == 'post') {
            $rules = [
                'alumno' => 'required|min_length[2]|max_length[99]',
				'nombreEmpresa' => 'required|min_length[2]|max_length[99]',
				'nombreSupervisor' => 'required|min_length[2]|max_length[99]',
				'fechaInicio' => 'required'
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
				$Estudiante => $this->request->getVar('alumno');
				$id = buscarPractica($Estudiante);
				$Model->update($id, $newsData);
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


}