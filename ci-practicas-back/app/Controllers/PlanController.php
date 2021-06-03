<?php

namespace App\Controllers;
use App\Models\PlanModel as PlanModel;
use App\Models\PracticaModel as PracticanModel;

class PlanController extends BaseController
{
    public function registerPlan(){
        echo "entró al registro plan";

        helper(['form']);

        if($this-> request -> getMethod() == 'post') {
            $rules = [
                'CodigoPlan' => 'required',
                'CodigoCarrera' => 'required',
                'Estado' => 'required',
            ];
            $errors = [
                'CodigoPlan' => [
                    'required' => 'El codigo del plan es requerido'
                ]
            ];
            if(!$this->validate($rules, $errors)){
                $data['validation'] = $this->validator;
            } else {
                $model = new PlanModel();

                $newsData =[
                    'CodigoPlan' => $this->request->getVar('CodigoPlan'),
                    'CodigoCarrera' => $this->request->getVar('CodigoCarrera'),
                 //   'Fecha' => $this->request->getVar('Fecha'),
                    'Estado' => true,
                ];
                $model ->save($newsData);

                echo "Plan registrado";

            }
        }
    }



    public function informacionPlan(){
        if($this-> request -> getMethod() == 'post') {
            $rules = [
                'CodigoPlan' => 'required',
            ];
            $errors = [
                'CodigoPlan' => [
                    'required' => 'El codigo del plan es requerido'
                ]
            ];

            if(!$this->validate($rules, $errors)){
                $data['validation'] = $this->validator;
            } else {
                $model = new PlanModel();
                $arr = $model->where('CodigoPlan',$this->request->getVar('CodigoPlan'));
                echo json_encode($arr);
                echo "Plan entregado";
            }
        }
    }

    public function informacionPlanes(){
        $model = new PlanModel();
        $arr = $model -> findall();
        echo json_encode($arr);
        echo "Planes entregados";
    }

    public function informacionPractica(){
        if($this-> request -> getMethod() == 'post') {
            $rules = [
                'idPractica' => 'required',
            ];
            $errors = [
                'idPractica' => [
                    'required' => 'El ID de practica es requerido'
                ]
            ];

            if(!$this->validate($rules, $errors)){
                $data['validation'] = $this->validator;
            } else {
                $model = new PracticaModel();
                $arr = $model->where('idPractica',$this->request->getVar('idPractica'));
                echo json_encode($arr);
                echo "Practica entregada";
            }
        }
    }

    public function informacionPracticas(){
        $model = new PracticaModel();
        $arr = $model -> findall();
        echo json_encode($arr);
        echo "Practicas entregadas";
    }

    public function registerPractica(){
        echo "entró al registro Practica";

        helper(['form']);

        if($this-> request -> getMethod() == 'post') {
            $rules = [
                'CodigoPlan' => 'required',
                'Nombre' => 'required',
                'Duracion' => 'required',
                'Descripcion' => 'required',
                'Estado' => 'Estado'
            ];
            $errors = [
                'CodigoPlan' => [
                    'required' => 'El codigo del plan es requerido'
                ]
            ];

            if(!$this->validate($rules, $errors)){
                $data['validation'] = $this->validator;
            } else {

                $model = new PracticaModel();

                $newsData =[
                    'CodigoPlan' => $this->request->getVar('CodigoPlan'),
                    'Nombre' => $this->request->getVar('CodigoCarrera'),
                    'Duracion' => $this->request->getVar('Duracion'),
                    'Descripcion' => $this->request->getVar('Descripcion'),
                    'Estado' => true,
                ];
                $model ->save($newsData);
                echo "Practica registrado";

            }
        }
    }
}
