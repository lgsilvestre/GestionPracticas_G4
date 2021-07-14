<?php

namespace App\Models;

use CodeIgniter\Model;

class InstDocumentoModel extends Model
{
    protected $table      = 'instancia_documento';
    protected $primaryKey = 'id_instancia_documento';
    protected $allowedFields = ['nombre','requerido','comentario', 'link', 'numero_practica', 'refCarrera'];

    //Función de ejemplo con un array con objetos dentro (stdClass)
    public function crearInstanciasAlumno($numero, $id_alumno, $documentos) {
        for ($i = 0; $i < count($documentos); $i++){
            $value = get_object_vars($documentos[$i]);
            // $value['nombre'];
            // $value['id_documento'];
            // $value['requerido'];
            $query = 'INSERT INTO instancia_documento(numero_practica,nombre,requerido,refDocumento,refAlumno) VALUES("'.$numero.'","'.$value['nombre'].'","'.$value['requerido'].'","'.$value['id_documento'].'","'.$id_alumno.'")';
            $result = $this->db->query($query);
        }
    }

    public function getInstanciasDocumentos($id_alumno, $numero){
        $queryInstAlumno = 'SELECT * from instancia_documento where refAlumno = "'.$id_alumno.'" and numero_practica = "'.$numero.'"';
        $query = $this->db->query($queryInstAlumno);
        $result = $query->getResult();
        $arrayResult = array();
        if ($result){
            foreach ($result as $row){
                $id_doc = $row -> refDocumento;
                $url_doc = 'D:\xampp\htdocs\GestionPracticas_G4\ci-practicas-back\public\documentos\escuela\\'.$id_alumno.'-'.$numero.'-'.$id_doc.'-escuela.pdf';
                if (!file_exists($url_doc)){
                    $url_doc = 0;
                } 
            }
        }
        return $result;
    }

    public function getInstanciasDocumentosURL($id_alumno, $numero){
        $queryInstAlumno = 'SELECT * from instancia_documento where refAlumno = "'.$id_alumno.'" and numero_practica = "'.$numero.'"';
        $query = $this->db->query($queryInstAlumno);
        $result = $query->getResult();
        $arrayResult = array();
        if ($result){
            foreach ($result as $row){
                $id_doc = $row -> refDocumento;
                $url_doc = 'D:\xampp\htdocs\GestionPracticas_G4\ci-practicas-back\public\documentos\escuela\\'.$id_alumno.'-'.$numero.'-'.$id_doc.'-escuela.pdf';
                if (!file_exists($url_doc)){
                    $url_doc = 0;
                } 
                
                $arrayResult[]['url'] = $url_doc;
            }
        }
        return $arrayResult;
    }

    public function getInstanciasDocumentosRequeridos($id_alumno){
        $queryInstAlumno = 'SELECT * from instancia_documento where refAlumno = "'.$id_alumno.'" and requerido = "1"';
        $query = $this->db->query($queryInstAlumno);
        $result = $query->getResult();
        return $result;
    }
}

    
?>