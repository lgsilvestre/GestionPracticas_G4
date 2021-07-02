<?php

namespace App\Models;

use CodeIgniter\Model;

class NotificacionModel extends Model
{
    protected $table      = 'notificacion';
    protected $allowedFields = ['refUser', 'refHistoria', 'tipo', 'visto'];

    public function newNotificacion($refUser, $refHistorial, $tipo){
        $queryPracticaAlumno = 'INSERT INTO notificacion(refUser, refHistorial, tipo, visto) VALUES("'.$refUser.'","'.$refHistorial.'","'.$tipo.'", "1")';
        $query = $this->db->query($queryPracticaAlumno);
        if ($query) {
            return true;
        } else {
            return false;
        }
        return false;
    }
}
?>