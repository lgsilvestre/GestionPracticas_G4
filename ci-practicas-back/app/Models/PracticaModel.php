<?php

namespace App\Models;

use CodeIgniter\Model;

class PracticaModel extends Model
{
    protected $table      = 'practica';
    protected $primaryKey = 'id_practica';
    protected $allowedFields = ['etapa', 'estado', 'carrera', 'numero', 'fecha_inicio', 'fecha_termino', 'empresa', 'supervisor', 'evaluacion_uni', 'evaluacion_empreesa', 'refAlumno'];

    public function getPracticaAlumno(){
        $queryPracticaAlumno = "SELECT * FROM practica INNER JOIN alumno ON practica.refAlumno = alumno.id_alumno ORDER BY CASE WHEN etapa = 'Solicitud' THEN 1 ELSE 2 END, etapa";
        $query = $this->db->query($queryPracticaAlumno);
        $result = $query->getResult();
        return $result;
    }

    public function getPracticaAlumnoId($id){
        $queryPracticaAlumno = "SELECT * FROM practica INNER JOIN alumno ON practica.refAlumno = alumno.id_alumno WHERE ".$id." = alumno.id_alumno ORDER BY CASE WHEN etapa = 'Solicitud' THEN 1 ELSE 2 END, etapa";
        $query = $this->db->query($queryPracticaAlumno);
        $result = $query->getResult();
        return $result;
    }

    public function getPracticaAlumnoFiltrada($etapa, $estado, $carrera, $anio){
        $queryPracticaAlumno = "SELECT * FROM practica INNER JOIN alumno ON practica.refAlumno = alumno.id_alumno";
        $query = $this->db->query($queryPracticaAlumno);
        $result = $query->getResult();
        return $result;
    }

    public function newPracticaAlumno($id, $np){
        $queryPracticaAlumno = 'INSERT INTO practica(etapa,estado,numero,fecha_inicio, fecha_termino,empresa,supervisor,evaluacion_uni,evaluacion_empresa,refAlumno) VALUES("Solicitud","Pendiente",'.$np.',"","","","","0","0",'.$id.')';
        $query = $this->db->query($queryPracticaAlumno);
        if ($query) {
            return true;
        } else {
            return false;
        }
        return false;
    }

    public function getEstadoAlumno($id){
        $queryPracticaAlumno = "SELECT etapa, estado FROM practica where practica.refAlumno = ".$id." and practica.etapa != 'Evaluada'";
        $query = $this->db->query($queryPracticaAlumno);
        $result = $query->getResult();
        return $result;
    }

    // Aceptar solicitud desde SolicitarAdmin.js
    public function aceptarSolicitud($numero, $id){
        //$queryPracticaAlumno = "SELECT etapa, estado FROM practica where practica.refAlumno = ".$id." and practica.numero = ".$numero;
        $queryPracticaAlumno = "UPDATE practica SET etapa = 'Inscripción', estado = 'Por inscribir' where practica.refAlumno = ".$id." and practica.numero = ".$numero;
        $this->db->query($queryPracticaAlumno)->getResult();
        $result = $this->db->affectedRows();
        return $result;
    }

    public function recahzarSolicitud($id){
        //$queryPracticaAlumno = "SELECT etapa, estado FROM practica where practica.refAlumno = ".$id." and practica.numero = ".$numero;
        $queryPracticaAlumno = "UPDATE practica SET etapa = 'Solicitud', estado = 'Rechazada', activa='0' where practica.refAlumno = ".$id." and practica.activa = '1'";
        $this->db->query($queryPracticaAlumno)->getResult();
        $result = $this->db->affectedRows();
        if ($result){
		    echo "RECHAZADA";
        }
        return $result;
    }    

    public function inscribir($id_alumno, $empresa, $supervisor, $fch_inicio, $fch_termino){
        $queryPracticaAlumno = "UPDATE practica SET fecha_inicio = '".$fch_inicio."', fecha_termino = '".$fch_termino."', empresa = '".$empresa."', supervisor = '".$supervisor."' where practica.refAlumno = '".$id_alumno."'";
        //$queryPracticaAlumno = "UPDATE practica SET fecha_inicio = '', fecha_termino = '', empresa = '".$empresa."', supervisor = '".$supervisor."' where practica.refAlumno = '".$id_alumno."'";
        $query = $this->db->query($queryPracticaAlumno);
        //print_r($query->getResult());
        //return $result;
    }

    public function getDatosInscripcionAlumno($id){
        $queryPracticaAlumno = "SELECT empresa, supervisor, fecha_inicio, fecha_termino FROM practica where practica.refAlumno = ".$id; //" and practica.numero = ".$numero;
        $query = $this->db->query($queryPracticaAlumno);
        $result = $query->getResult();
        return $result;
    }

    public function aceptarPractica($id_alumno){
        $queryPracticaAlumno = "UPDATE practica SET etapa = 'Cursando', estado = 'Cursando' WHERE practica.refAlumno = '".$id_alumno."'"; //" and practica.numero = ".$numero;
        $this->db->query($queryPracticaAlumno)->getResult();
        $result = $this->db->affectedRows();
        return $result;
    }

    public function pasarEstadoEvaluar($id_alumno){
        $queryPracticaAlumno = "UPDATE practica SET etapa = 'Evaluación', estado = 'Pendiente' WHERE practica.refAlumno = '".$id_alumno."' and practica.estado != 'Evaluada'"; 
        $this->db->query($queryPracticaAlumno)->getResult();
        $result = $this->db->affectedRows();
        return $result;
    }

    public function getEvaluacionEmpresa($id_alumno){
        $queryPracticaAlumno = "SELECT evaluacion_empresa, supervisor from practica WHERE practica.refAlumno = '".$id_alumno."' and practica.estado != 'Evaluada'"; 
        $result = $this->db->query($queryPracticaAlumno)->getResult();
        return $result;
    }

    public function evaluarPractica($id_alumno, $nota){
        $queryPracticaAlumno = "UPDATE practica SET evaluacion_uni = '".$nota."' WHERE practica.refAlumno = '".$id_alumno."' and practica.estado != 'Evaluada'"; 
        $this->db->query($queryPracticaAlumno)->getResult();
        $result = $this->db->affectedRows();
        return $result;
    }    

    public function getEvaluacionPracticaUni($id_alumno){
        $queryPracticaAlumno = "SELECT evaluacion_uni from practica WHERE practica.refAlumno = '".$id_alumno."' and practica.estado != 'Evaluada'"; 
        $result = $this->db->query($queryPracticaAlumno)->getResult();
        return $result;
    }

    public function getEstadoPracticaActiva($id){
        $queryPracticaAlumno = "SELECT etapa, estado FROM practica where practica.refAlumno = ".$id." and practica.estado != 'Evaluada'";
        $query = $this->db->query($queryPracticaAlumno);
        $result = $query->getResult();
        return $result;
    }

    public function getEvaluacion($id_alumno) {
        $query = $this->db->query("Select evaluacion_uni, numero from alumno where practica.refAlumno = '".$id_alumno."' and practica.estado = 'Evaluada'");
        $result = $query->getResult();
        return $result;
    }

}
?>