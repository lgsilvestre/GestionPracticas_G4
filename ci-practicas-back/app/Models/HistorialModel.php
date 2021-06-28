<?php

namespace App\Models;

use CodeIgniter\Model;

class HistorialModel extends Model
{
    protected $table      = 'historial';
    protected $primaryKey = 'id_historial';
    protected $allowedFields = ['refAlumno', 'refAdmin', 'etapa', 'practica', 'comentario', 'fecha'];
}
?>