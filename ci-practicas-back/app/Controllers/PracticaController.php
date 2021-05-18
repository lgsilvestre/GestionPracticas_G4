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
				'nropractica' => 'required',
				'estado' => 'required'		//faltan reglass por agregar


            ];
            $errors = [			// faltan errores por definir
				'estudiante' => [
                    'required' => 'No se a definido un estudiante'
                ],
            ];
            if(!$this->validate($rules, $errors)){
                $data['validation'] = $this->validator;
            } else {
				$Estudiante => $this->request->getVar('estudiante');
				$Nropractica => $this->request->getVar('nropractica');
				$Estado => $this->request->getVar('estado');

				$resutaldo = $this->resultadoFiltros($Etapa, $Estado, $Carrera, $anio);
				echo json_encode($resutaldo);
            }
        }
	}

	private function validarPractica($Estudiante)
	{
		$model = new PracticaModel();
		$practicas = $model->where('refAlumno',$Estudiante)->findAll();
		if($practicas->where('estado',2).count==2)
		{
			return false;
		}
		if($practicas->where('estado',0).count==1 )
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
}
