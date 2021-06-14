<?php

namespace App\Models;

use CodeIgniter\Model;

class PracticaModel extends Model
{
    protected $table      = 'practica';
    protected $primaryKey = 'id_practica';
    protected $allowedFields = ['etapa', 'estado', 'carrera', 'numero', 'fecha_inicio', 'fecha_termino', 'empresa', 'supervisor', 'evaluacion_uni', 'evaluacion_empreesa', 'refAlumno'];

    public function getPracticaAlumno(){
        $queryPracticaAlumno = "SELECT * FROM practica INNER JOIN alumno ON practica.refAlumno = alumno.id_alumno";
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
        $queryPracticaAlumno = 'INSERT INTO practica(etapa,estado,numero,fecha_inicio, fecha_termino,empresa,supervisor,evaluacion_uni,evaluacion_empresa,refAlumno) VALUES("Solicitud","Pendiente",'.$np.',"","","","","","",'.$id.')';
        $query = $this->db->query($queryPracticaAlumno);
        if ($query) {
            return true;
        } else {
            return false;
        }
        return false;
    }

    public function getEstadoAlumno($id, $numero){
        $queryPracticaAlumno = "SELECT etapa, estado FROM practica where practica.refAlumno = ".$id." and practica.numero = ".$numero;
        $query = $this->db->query($queryPracticaAlumno);
        $result = $query->getResult();
        return $result;
    }

    // Aceptar solicitud desde SolicitarAdmin.js
    public function aceptarSolicitud($numero, $id){
        //$queryPracticaAlumno = "SELECT etapa, estado FROM practica where practica.refAlumno = ".$id." and practica.numero = ".$numero;
        $queryPracticaAlumno = "UPDATE practica SET etapa = 'Inscripción', estado = 'Por inscribir' where practica.refAlumno = ".$id." and practica.numero = ".$numero;
        $query = $this->db->query($queryPracticaAlumno);
        $result = $query->getResult();
        return $result;
    }

}
?>