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
			return $model->where('Etapa',$Etapa)->findAll();
		}
		if($Etapa =='' && $Estado !='' && $Carrera=='' && $anio =='')
		{
			return $model->where('Estado',$Estado)->findAll();
		}
		if($Etapa =='' && $Estado =='' && $Carrera!='' && $anio =='')
		{
			return $model->where('Carrera',$Carrera)->findAll();
		}
		if($Etapa =='' && $Estado =='' && $Carrera=='' && $anio !='')
		{
			return $model->where('anio',$anio)->findAll();
		}

		if($Etapa !='' && $Estado !='' && $Carrera=='' && $anio =='')
		{
			return $model->where('Etapa',$Etapa)->where->('Estado',$Estado)->findAll();
		}
		if($Etapa !='' && $Estado =='' && $Carrera!='' && $anio =='')
		{
			return $model->where('Etapa',$Etapa)->where->('Carrera',$Carrera)->findAll();
		}
		if($Etapa !='' && $Estado =='' && $Carrera=='' && $anio !='')
		{
			return $model->where('Etapa',$Etapa)->where->('anio',$anio)->findAll();
		}

		if($Etapa =='' && $Estado !='' && $Carrera!='' && $anio =='')
		{
			return $model->where('Carrera',$Carrera)->where->('Estado',$Estado)->findAll();
		}

		if($Etapa =='' && $Estado !='' && $Carrera=='' && $anio !='')
		{
			return $model->where('Carrera',$Carrera)->where->('anio',$anio)->findAll();
		}

		if($Etapa =='' && $Estado =='' && $Carrera!='' && $anio !='')
		{
			return $model->where('Carrera',$Carrera)->where->('anio',$anio)->findAll();
		}

		if($Etapa !='' && $Estado !='' && $Carrera!='' && $anio =='')
		{
			return $model->where('Etapa',$Etapa)->where->('Estado',$Estado)->where('Carrera',$Carrera)->findAll();
		}

		if($Etapa !='' && $Estado !='' && $Carrera=='' && $anio !='')
		{
			return $model->where('Etapa',$Etapa)->where->('Estado',$Estado)->where('anio',$anio)->findAll();
		}

		if($Etapa !='' && $Estado =='' && $Carrera !='' && $anio !='')
		{
			return $model->where('Etapa',$Etapa)->where->('Carrera',$Carrera)->where('anio',$anio)->findAll();
		}

		if($Etapa =='' && $Estado !='' && $Carrera !='' && $anio !='')
		{
			return $model->where('Estado',$Estado)->where->('Carrera',$Carrera)->where('anio',$anio)->findAll();
		}

		if($Etapa !='' && $Estado !='' && $Carrera!='' && $anio =='')
		{
			return $model->where('Etapa',$Etapa)->where->('Estado',$Estado)->where('Carrera',$Carrera)->where('anio',$anio)->findAll();
		}
	}
}
