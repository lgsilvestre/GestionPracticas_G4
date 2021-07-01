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

    public function getEstadoAlumno($id,$numero){
        $queryPracticaAlumno = "SELECT etapa, estado FROM practica where practica.refAlumno = ".$id." and practica.etapa != 'Evaluada' and practica.numero = ".$numero." ";
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
        return $result;
    }    
    public function RechazarEtapa($id,$etapa){
        //$queryPracticaAlumno = "SELECT etapa, estado FROM practica where practica.refAlumno = ".$id." and practica.numero = ".$numero;
        $queryPracticaAlumno = "UPDATE practica SET etapa = ".$etapa.", estado = 'Rechazada' where practica.refAlumno = ".$id." and practica.activa = '1'";
        $this->db->query($queryPracticaAlumno)->getResult();
        $result = $this->db->affectedRows();     
        return $result;
    }    

    public function inscribir($nro_practica, $id_alumno, $empresa, $supervisor, $fch_inicio, $fch_termino,$rut_empresa,$email_supervisor, $tel_supervisor,$region_empresa,$zona_empresa,$tel_emer,$nombre_emer){
        $queryPracticaAlumno = "UPDATE practica SET fecha_inicio = '".$fch_inicio."', fecha_termino = '".$fch_termino."', empresa = '".$empresa."', supervisor = '".$supervisor."', rut_empresa = '".$rut_empresa."', email_supervisor = '".$email_supervisor."', telefono_supervisor = '".$tel_supervisor."', region = '".$region_empresa."', comuna = '".$zona_empresa."', nombre_contacto = '".$nombre_emer."', telefono_contacto = '".$tel_emer."' where practica.refAlumno = '".$id_alumno."' and practica.numero='".$nro_practica."'";
        //$queryPracticaAlumno = "UPDATE practica SET fecha_inicio = '', fecha_termino = '', empresa = '".$empresa."', supervisor = '".$supervisor."' where practica.refAlumno = '".$id_alumno."'";
        // $query = $this->db->query($queryPracticaAlumno);
        // $result = $query->getResult();
        $this->db->query($queryPracticaAlumno)->getResult();
        $result = $this->db->affectedRows();
        //print_r($query->getResult());
        return $result;
    }

    public function getDatosInscripcionAlumno($id){
        $queryPracticaAlumno = "SELECT empresa, supervisor, fecha_inicio, fecha_termino,rut_empresa, email_supervisor,telefono_supervisor,region,comuna,nombre_contacto,telefono_contacto FROM practica where practica.refAlumno = ".$id." and practica.activa = 1";
        $query = $this->db->query($queryPracticaAlumno);
        $result = $query->getResult();
        return $result;
    }

    public function aceptarPractica($id_alumno){
        // $queryPracticaAlumno = "UPDATE practica SET etapa = 'Cursando', estado = 'Cursando' WHERE practica.refAlumno = '".$id_alumno."'"; //" and practica.numero = ".$numero;
        $queryPracticaAlumno = "UPDATE practica SET estado = 'Aprobada' WHERE practica.refAlumno = '".$id_alumno."' and activa=1"; //" and practica.numero = ".$numero;
        $this->db->query($queryPracticaAlumno)->getResult();
        $result = $this->db->affectedRows();
        return $result;
    }

    public function pasarCursando($id_alumno){
        $queryPracticaAlumno = "UPDATE practica SET etapa = 'Cursando', estado = 'Cursando' WHERE practica.refAlumno = '".$id_alumno."' and activa=1"; //" and practica.numero = ".$numero;
        // $queryPracticaAlumno = "UPDATE practica SET estado = 'Aprobada' WHERE practica.refAlumno = '".$id_alumno."'"; //" and practica.numero = ".$numero;
        $this->db->query($queryPracticaAlumno)->getResult();
        $result = $this->db->affectedRows();
        return $result;
    }

    public function pasarEstadoEvaluar($id_alumno){
        $queryPracticaAlumno = "UPDATE practica SET etapa = 'Evaluación', estado = 'Pendiente' WHERE practica.refAlumno = '".$id_alumno."' and practica.estado != 'Evaluada' and practica.activa = 1"; 
        $this->db->query($queryPracticaAlumno)->getResult();
        $result = $this->db->affectedRows();
        return $result;
    }

    public function getEvaluacionEmpresa($id_alumno, $numero){
        $queryPracticaAlumno = "SELECT evaluacion_empresa, supervisor from practica WHERE refAlumno = '".$id_alumno."' and numero = '".$numero."' and etapa = 'Evaluación'"; 
        $result = $this->db->query($queryPracticaAlumno)->getResult();
        return $result;
    }

    public function evaluarPractica($id_alumno, $nota){
        $queryPracticaAlumno = "UPDATE practica SET evaluacion_uni = '".$nota."', estado='Evaluada' WHERE practica.refAlumno = '".$id_alumno."' and practica.activa = 1"; 
        $this->db->query($queryPracticaAlumno)->getResult();
        $result = $this->db->affectedRows();
        return $result;
    }    
    public function practicaInactiva($id_alumno){
        $queryPracticaAlumno = "UPDATE practica SET activa = 0 WHERE practica.refAlumno = '".$id_alumno."' "; 
        $this->db->query($queryPracticaAlumno)->getResult();
        $result = $this->db->affectedRows();
        return $result;
    }    
    public function getNumeroSiguientePractica($id_alumno){
        $queryPracticaAlumno = "SELECT numero FROM practica WHERE practica.refAlumno = '".$id_alumno."' and practica.activa = 0 and practica.estado = 'Evaluada'"; 
        // $this->db->query($queryPracticaAlumno)->getResult();
        $result = $this->db->query($queryPracticaAlumno)->getResult();
        // $result = $this->db->affectedRows();
        return $result;
    }    

    public function getEvaluacionPracticaUni($id_alumno, $numero){
        $queryPracticaAlumno = "SELECT evaluacion_uni from practica WHERE practica.refAlumno = '".$id_alumno."' and practica.numero = '".$numero."' and etapa = 'Evaluación' "; 
        $result = $this->db->query($queryPracticaAlumno)->getResult();
        return $result;
    }

    public function getEstadoPracticaActiva($id){
        $queryPracticaAlumno = "SELECT etapa, estado,id_practica,numero FROM practica where practica.refAlumno = ".$id."  and practica.activa = 1" ;
        $query = $this->db->query($queryPracticaAlumno);
        $result = $query->getResult();
        return $result;
    }
    
    public function getSolicitud($id, $numero){
        $queryPracticaAlumno = "SELECT estado FROM practica where practica.refAlumno = '".$id."' and practica.etapa = 'Solicitud' and practica.numero = '".$numero."' ORDER BY id_practica DESC LIMIT 1" ;
        $query = $this->db->query($queryPracticaAlumno);
        $result = $query->getResult();
        // $this->db->query($queryPracticaAlumno)->getResult();
        // $result = $this->db->affectedRows();
        return $result;
    }

    public function getEvaluacion($id_alumno) {
        $query = $this->db->query("Select evaluacion_uni, numero from practica where practica.refAlumno = '".$id_alumno."' and practica.estado = 'Evaluada'");
        $result = $query->getResult();
        return $result;
    }

    public function getFechas($id_alumno) {
      $query = $this->db->query("Select fecha_inicio , fecha_termino from practica where practica.refAlumno = '".$id_alumno."' and practica.activa = 1");
      $result = $query->getResult();
      return $result;
  }
}
?>