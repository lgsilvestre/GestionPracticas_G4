<?php

namespace App\Models;

use CodeIgniter\Model;

class HistorialModel extends Model
{
    protected $table      = 'historial';
    protected $primaryKey = 'id_historial';
    protected $allowedFields = ['refAlumno', 'refAdmin', 'etapa', 'practica', 'comentario', 'fecha', 'retroalimentacion'];

    public function getRetroalimentacion($refAlumno, $practica) {
        $query = $this->db->query("SELECT max(retroalimentacion) FROM historial WHERE refAlumno = '".$refAlumno."' AND practica = '".$practica."'");
        $result = $query->getResult();
        return $result;
    }
}


?>