<?php

namespace App\Models;

use CodeIgniter\Model;

class DocGenModel extends Model
{
    protected $table      = 'Carrera';
    protected $primaryKey = 'idCarrera';
    protected $allowedFields = ['Nombre','Facultad'];
}
?>