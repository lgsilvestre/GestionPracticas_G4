<?php

namespace App\Models;

use CodeIgniter\Model;

class GestionaModel extends Model
{
    protected $table      = 'gestiona';
    protected $primaryKey = 'id_gestiona';
    protected $allowedFields = ['fecha', 'accion', 'refAlumno', 'refInstDoc'];
}
?>