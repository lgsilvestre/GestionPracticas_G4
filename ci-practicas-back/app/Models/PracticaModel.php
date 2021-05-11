<?php

namespace App\Models;

use CodeIgniter\Model;

class PracticaModel extends Model
{
    protected $table      = 'practica';
    protected $primaryKey = 'idPractica';
    protected $allowedFields = ['CodigoPlan','Nombre','Duracion','Descripcion','Fecha', 'Estado'];
}
?>